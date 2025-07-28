import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from "@/components/ui/card";

export const DevelopmentChart = () => {
  const data = [
    { name: 'Landing Page', value: 7, days: '1 semana', color: 'hsl(var(--chart-color-1))' },
    { name: 'E-commerce', value: 21, days: '3 semanas', color: 'hsl(var(--chart-color-2))' },
    { name: 'Sistema Web', value: 35, days: '4-6 semanas', color: 'hsl(var(--chart-color-3))' },
    { name: 'App Mobile', value: 49, days: '6-8 semanas', color: 'hsl(var(--chart-color-4))' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Tempo: {data.days}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.value} dias em média
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-2 gap-4 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <div className="text-sm">
              <div className="font-medium">{entry.payload.name}</div>
              <div className="text-muted-foreground text-xs">{entry.payload.days}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full mb-4 hover-smooth" data-animation="slide-left-smooth">
            <span className="text-sm font-medium text-primary">📊 Tempo de Desenvolvimento</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" data-animation="fade-in-smooth">
            Prazos{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent gradient-shift">
              Transparentes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-animation="fade-in-smooth">
            Veja os tempos médios de desenvolvimento para cada tipo de projeto. 
            Trabalhamos com cronogramas claros e entregas pontuais.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-gradient p-8 hover-smooth" data-animation="slide-up-smooth">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Chart */}
              <div className="h-80" data-animation="scale-in-smooth">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend and Info */}
              <div className="space-y-6" data-animation="fade-in-smooth">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Tempos de Entrega</h3>
                  <p className="text-muted-foreground mb-6">
                    Nossos prazos são calculados com base na complexidade 
                    e escopo de cada projeto. Garantimos entregas dentro do cronograma.
                  </p>
                </div>

                <CustomLegend payload={data.map(item => ({ 
                  color: item.color, 
                  payload: item 
                }))} />

                <div className="pt-6 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-4 text-center stagger-children">
                    <div data-animation="scale-in-smooth">
                      <div className="text-2xl font-bold text-primary-highlight">100%</div>
                      <div className="text-sm text-muted-foreground">No Prazo</div>
                    </div>
                    <div data-animation="scale-in-smooth">
                      <div className="text-2xl font-bold text-primary-stats">24h</div>
                      <div className="text-sm text-muted-foreground">Resposta</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};