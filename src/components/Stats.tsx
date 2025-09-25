const Stats = () => {
  return <section className="bg-background py-[38px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Success Stories Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-card-gradient p-6 rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">АК</span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">Автокомпания "Корея"</div>
                <div className="text-sm text-muted-foreground">Москва, Россия</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              "За 6 месяцев работы с платформой увеличили продажи на 340%. 
              Особенно ценим качество покупателей и скорость сделок."
            </p>
          </div>

          <div className="bg-card-gradient p-6 rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">КА</span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">KazAuto Trade</div>
                <div className="text-sm text-muted-foreground">Алматы, Казахстан</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              "Интуитивно понятная система управления заказами и отличная 
              поддержка логистики. Рекомендуем всем коллегам."
            </p>
          </div>

          <div className="bg-card-gradient p-6 rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">УА</span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">UkrAuto Export</div>
                <div className="text-sm text-muted-foreground">Киев, Украина</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              "Безопасные платежи через эскроу и прозрачность всех процессов - 
              это именно то, что нужно для международной торговли."
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Stats;