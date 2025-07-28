# Paleta de Cores do Modo Escuro - SoftwarePro

## Visão Geral

Implementamos uma paleta de cores moderna e sofisticada para o modo escuro, focando em harmonia visual, excelente contraste e legibilidade. A paleta utiliza tons de azul profundo, cinzas elegantes e acentos em roxo azulado para criar uma experiência visual sofisticada e confortável.

## Paleta Principal

### Cores de Fundo
- **Background Principal**: `hsl(220, 25%, 8%)` - Azul muito escuro com tom elegante
- **Card**: `hsl(220, 25%, 10%)` - Ligeiramente mais claro que o background
- **Sidebar**: `hsl(220, 25%, 6%)` - Mais escuro para destaque

### Cores de Texto
- **Foreground Principal**: `hsl(220, 15%, 95%)` - Branco suave para excelente legibilidade
- **Muted Foreground**: `hsl(220, 15%, 70%)` - Cinza claro para texto secundário

### Cores Primárias
- **Primary**: `hsl(225, 85%, 60%)` - Azul vibrante mas elegante
- **Primary Glow**: `hsl(225, 85%, 70%)` - Versão mais clara para efeitos
- **Primary Hover**: `hsl(225, 85%, 50%)` - Versão mais escura para hover

### Cores Secundárias
- **Secondary**: `hsl(220, 25%, 15%)` - Cinza azulado médio
- **Secondary Dark**: `hsl(220, 30%, 12%)` - Versão mais escura

### Cores de Destaque
- **Accent**: `hsl(235, 75%, 55%)` - Roxo azulado elegante
- **Muted**: `hsl(220, 25%, 12%)` - Cinza azulado escuro para elementos sutis

### Cores de Estado
- **Destructive**: `hsl(0, 70%, 45%)` - Vermelho escuro elegante
- **Border**: `hsl(220, 25%, 18%)` - Borda sutil
- **Input**: `hsl(220, 25%, 12%)` - Input escuro

## Gradientes Modernos

### Gradiente Primário
```css
linear-gradient(135deg, hsl(225, 85%, 60%), hsl(235, 75%, 55%))
```

### Gradiente Hero
```css
linear-gradient(180deg, hsl(220, 25%, 8%), hsl(220, 30%, 6%))
```

### Gradiente Card
```css
linear-gradient(145deg, hsl(220, 25%, 10%), hsl(220, 25%, 12%))
```

## Sombras Suaves

- **Shadow Primary**: `0 10px 30px -10px hsl(225, 85%, 60%, 0.25)`
- **Shadow Card**: `0 4px 12px -2px hsl(0, 0%, 0%, 0.3)`
- **Shadow Glow**: `0 0 40px hsl(225, 85%, 60%, 0.2)`

## Características da Paleta

### Harmonia Visual
- Todos os tons baseiam-se em azuis e cinzas azulados
- Transições suaves entre tons relacionados
- Consistência na saturação e luminosidade

### Contraste e Legibilidade
- Alto contraste entre texto e fundo
- Hierarquia visual clara através de diferentes tons
- Cores de destaque bem definidas

### Sofisticação
- Tons profundos e elegantes
- Gradientes sutis e modernos
- Sombras suaves para profundidade

### Acessibilidade
- Contraste WCAG AA/AAA compliant
- Cores de estado claramente diferenciadas
- Texto legível em todos os tamanhos

## Implementação

A paleta está implementada através de variáveis CSS customizadas no arquivo `src/index.css`, permitindo fácil manutenção e consistência em todo o projeto.

### Uso no Tailwind
As cores são automaticamente disponíveis através das classes do Tailwind:
- `bg-background` - Fundo principal
- `text-foreground` - Texto principal
- `bg-primary` - Cor primária
- `text-muted-foreground` - Texto secundário
- `border-border` - Bordas

## Benefícios

1. **Conforto Visual**: Reduz fadiga ocular em ambientes com pouca luz
2. **Modernidade**: Paleta atual e sofisticada
3. **Profissionalismo**: Transmite confiança e expertise
4. **Acessibilidade**: Excelente contraste e legibilidade
5. **Consistência**: Harmonia visual em todos os elementos 