export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      dealer_onboarding: {
        Row: {
          account_holder_name: string | null
          bank_account_number: string | null
          bank_account_uploaded: boolean | null
          bank_name: string | null
          business_license_uploaded: boolean | null
          business_registration_uploaded: boolean | null
          completed_at: string | null
          corporate_seal_uploaded: boolean | null
          created_at: string | null
          dealer_license_uploaded: boolean | null
          id: string
          is_completed: boolean | null
          representative_id_uploaded: boolean | null
          tax_certificate_uploaded: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_holder_name?: string | null
          bank_account_number?: string | null
          bank_account_uploaded?: boolean | null
          bank_name?: string | null
          business_license_uploaded?: boolean | null
          business_registration_uploaded?: boolean | null
          completed_at?: string | null
          corporate_seal_uploaded?: boolean | null
          created_at?: string | null
          dealer_license_uploaded?: boolean | null
          id?: string
          is_completed?: boolean | null
          representative_id_uploaded?: boolean | null
          tax_certificate_uploaded?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_holder_name?: string | null
          bank_account_number?: string | null
          bank_account_uploaded?: boolean | null
          bank_name?: string | null
          business_license_uploaded?: boolean | null
          business_registration_uploaded?: boolean | null
          completed_at?: string | null
          corporate_seal_uploaded?: boolean | null
          created_at?: string | null
          dealer_license_uploaded?: boolean | null
          id?: string
          is_completed?: boolean | null
          representative_id_uploaded?: boolean | null
          tax_certificate_uploaded?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      order_messages: {
        Row: {
          created_at: string
          id: string
          message_text: string
          order_id: string
          sender_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_text: string
          order_id: string
          sender_type: string
        }
        Update: {
          created_at?: string
          id?: string
          message_text?: string
          order_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_location: string
          customer_name: string
          customer_phone: string
          dealer_id: string
          delivery_from: string | null
          delivery_method: string | null
          delivery_to: string | null
          estimated_delivery: string | null
          id: string
          order_number: string
          prepayment: number | null
          remaining_payment: number | null
          status: string
          status_text: string
          total_price: number
          updated_at: string
          vehicle_color: string | null
          vehicle_make: string
          vehicle_mileage: string | null
          vehicle_model: string
          vehicle_price: number
          vehicle_vin: string | null
          vehicle_year: number
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_location: string
          customer_name: string
          customer_phone: string
          dealer_id: string
          delivery_from?: string | null
          delivery_method?: string | null
          delivery_to?: string | null
          estimated_delivery?: string | null
          id?: string
          order_number: string
          prepayment?: number | null
          remaining_payment?: number | null
          status?: string
          status_text: string
          total_price: number
          updated_at?: string
          vehicle_color?: string | null
          vehicle_make: string
          vehicle_mileage?: string | null
          vehicle_model: string
          vehicle_price: number
          vehicle_vin?: string | null
          vehicle_year: number
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_location?: string
          customer_name?: string
          customer_phone?: string
          dealer_id?: string
          delivery_from?: string | null
          delivery_method?: string | null
          delivery_to?: string | null
          estimated_delivery?: string | null
          id?: string
          order_number?: string
          prepayment?: number | null
          remaining_payment?: number | null
          status?: string
          status_text?: string
          total_price?: number
          updated_at?: string
          vehicle_color?: string | null
          vehicle_make?: string
          vehicle_mileage?: string | null
          vehicle_model?: string
          vehicle_price?: number
          vehicle_vin?: string | null
          vehicle_year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
