import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, MessageSquare } from "lucide-react";

export const DevelopmentChart = () => {
  const data = [
    { name: 'Landing Page', value: 7, days: '1 semana', color: '#8b5cf6' },
    { name: 'E-commerce', value: 21, days: '3 semanas', color: '#3b82f6' },
    { name: 'Sistema Web', value: 35, days: '4-6 semanas', color: '#10b981' },
    { name: 'App Mobile', value: 49, days: '6-8 semanas', color: '#f59e0b' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-xl">
          <p className="font-semibold text-slate-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tempo: {data.days}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
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
          <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">
            <div 
              className="w-4 h-4 rounded-full shadow-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <div className="text-sm">
              <div className="font-medium text-slate-900 dark:text-white">{entry.payload.name}</div>
              <div className="text-slate-600 dark:text-slate-400 text-xs">{entry.payload.days}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16" data-animation="fade-in-smooth">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6" data-animation="slide-left-smooth">
            <Clock className="w-4 h-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tempo de Desenvolvimento</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8" data-animation="fade-in-smooth">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Prazos
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparentes
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed" data-animation="fade-in-smooth">
            Veja os tempos médios de desenvolvimento para cada tipo de projeto. 
            Trabalhamos com cronogramas claros e entregas pontuais.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 p-8" data-animation="slide-up-smooth">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Chart */}
              <div className="h-80" data-animation="scale-in-smooth">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={50}
                      paddingAngle={3}
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
              <div className="space-y-8" data-animation="fade-in-smooth">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Tempos de Entrega</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Nossos prazos são calculados com base na complexidade 
                    e escopo de cada projeto. Garantimos entregas dentro do cronograma.
                  </p>
                </div>

                <CustomLegend payload={data.map(item => ({ 
                  color: item.color, 
                  payload: item 
                }))} />

                <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl text-white shadow-lg" data-animation="scale-in-smooth">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm opacity-90">No Prazo</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl text-white shadow-lg" data-animation="scale-in-smooth">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">24h</div>
                      <div className="text-sm opacity-90">Resposta</div>
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