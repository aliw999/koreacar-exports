import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ImportRequest {
  type: 'single' | 'bulk';
  url: string;
  autoPublish?: boolean;
}

interface CarData {
  encar_id: string;
  encar_url: string;
  make: string;
  model: string;
  year: number;
  price_krw: number;
  price_usd: number;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  displacement?: number;
  engine_type?: string;
  drive_type?: string;
  body_type?: string;
  color_exterior?: string;
  color_interior?: string;
  seating_capacity?: number;
  vin?: string;
  chassis_number?: string;
  title?: string;
  description?: string;
  features?: string[];
  seller_name?: string;
  seller_phone?: string;
  location_city?: string;
  location_region?: string;
  images?: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const { type, url, autoPublish = false }: ImportRequest = await req.json();

    if (!url || !type) {
      throw new Error("Missing required parameters");
    }

    const importJobId = crypto.randomUUID();
    
    await supabaseClient.from("import_jobs").insert({
      id: importJobId,
      user_id: user.id,
      import_type: type,
      source_url: url,
      status: "processing",
    });

    let carData: CarData[];

    if (type === 'single') {
      carData = await parseSingleListing(url);
    } else {
      carData = await parseSellerListings(url);
    }

    const importedCarIds: string[] = [];
    const errors: any[] = [];

    for (const car of carData) {
      try {
        const { data: existingCar } = await supabaseClient
          .from("car_listings")
          .select("id")
          .eq("encar_id", car.encar_id)
          .eq("user_id", user.id)
          .maybeSingle();

        if (existingCar) {
          errors.push({
            car_id: car.encar_id,
            error: "Duplicate listing - already imported",
          });
          continue;
        }

        const { data: newCar, error: insertError } = await supabaseClient
          .from("car_listings")
          .insert({
            user_id: user.id,
            ...car,
            status: autoPublish ? "active" : "draft",
            imported_at: new Date().toISOString(),
            published_at: autoPublish ? new Date().toISOString() : null,
          })
          .select("id")
          .single();

        if (insertError) throw insertError;

        if (car.images && car.images.length > 0) {
          const imageRecords = car.images.map((imageUrl, index) => ({
            car_id: newCar.id,
            image_url: imageUrl,
            order_index: index,
            image_type: index === 0 ? "main" : "gallery",
          }));

          await supabaseClient.from("car_images").insert(imageRecords);
        }

        importedCarIds.push(newCar.id);
      } catch (error) {
        errors.push({
          car_id: car.encar_id,
          error: error.message,
        });
      }
    }

    await supabaseClient
      .from("import_jobs")
      .update({
        status: errors.length === carData.length ? "failed" : "completed",
        progress: 100,
        total_items: carData.length,
        processed_items: importedCarIds.length,
        failed_items: errors.length,
        imported_car_ids: importedCarIds,
        error_log: errors.length > 0 ? errors : null,
        completed_at: new Date().toISOString(),
      })
      .eq("id", importJobId);

    return new Response(
      JSON.stringify({
        success: true,
        importJobId,
        imported: importedCarIds.length,
        failed: errors.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

async function parseSingleListing(url: string): Promise<CarData[]> {
  const carIdMatch = url.match(/\/cars\/detail\/(\d+)/);
  if (!carIdMatch) {
    throw new Error("Invalid Encar listing URL");
  }

  const carId = carIdMatch[1];
  const exchangeRate = await getKRWtoUSDRate();

  const mockData: CarData = {
    encar_id: carId,
    encar_url: url,
    make: "Hyundai",
    model: "Sonata",
    year: 2021,
    price_krw: 25000000,
    price_usd: Math.round((25000000 / exchangeRate) * 100) / 100,
    mileage: 45000,
    fuel_type: "Gasoline",
    transmission: "Automatic",
    displacement: 2000,
    engine_type: "Gasoline",
    drive_type: "FWD",
    body_type: "Sedan",
    color_exterior: "White",
    color_interior: "Black",
    seating_capacity: 5,
    title: "2021 Hyundai Sonata",
    description: "Well-maintained vehicle with full service history",
    features: ["Leather seats", "Navigation", "Sunroof"],
    seller_name: "Premium Auto",
    location_city: "Seoul",
    location_region: "Gangnam",
    images: [
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      "https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg",
    ],
  };

  return [mockData];
}

async function parseSellerListings(url: string): Promise<CarData[]> {
  const exchangeRate = await getKRWtoUSDRate();

  const mockData: CarData[] = [
    {
      encar_id: "10001",
      encar_url: "https://fem.encar.com/cars/detail/10001",
      make: "Kia",
      model: "K5",
      year: 2022,
      price_krw: 28000000,
      price_usd: Math.round((28000000 / exchangeRate) * 100) / 100,
      mileage: 30000,
      fuel_type: "Gasoline",
      transmission: "Automatic",
      body_type: "Sedan",
      title: "2022 Kia K5",
      images: ["https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"],
    },
    {
      encar_id: "10002",
      encar_url: "https://fem.encar.com/cars/detail/10002",
      make: "Hyundai",
      model: "Tucson",
      year: 2021,
      price_krw: 32000000,
      price_usd: Math.round((32000000 / exchangeRate) * 100) / 100,
      mileage: 25000,
      fuel_type: "Diesel",
      transmission: "Automatic",
      body_type: "SUV",
      title: "2021 Hyundai Tucson",
      images: ["https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg"],
    },
  ];

  return mockData;
}

async function getKRWtoUSDRate(): Promise<number> {
  return 1300;
}
