# Design Review: Belle Salute – Landing Page

**Data:** 31 de março de 2026  
**Rota:** `/` (index.html)  
**Foco:** Design Visual, UX/Usabilidade, Responsivo/Mobile, Acessibilidade, Micro-interações, Consistência

---

## Resumo

O site tem uma estética sofisticada e uma paleta coerente. No entanto, foram encontrados **3 bugs críticos** que quebram funcionalidades (animações invisíveis, formulário com erro de JS, select sem label), além de **13 violações de contraste WCAG AA**, ausência de landmarks semânticos e inconsistências visuais nos cards de serviços. A estrutura HTML é boa, mas carece de atributos ARIA e otimização de performance.

---

## Problemas Encontrados

| # | Problema | Criticidade | Categoria | Localização |
|---|----------|-------------|-----------|-------------|
| 1 | **CSS das animações de reveal ausente**: as classes `.reveal`, `.reveal-left`, `.reveal-right`, `.visible` são adicionadas pelo JS mas não existem no CSS — o conteúdo fica invisível ao navegar via links âncora | 🔴 Crítico | Micro-interações | `style.css` (classes ausentes) / `script.js:36-68` |
| 2 | **Bug JS no formulário**: `form.mensagem.value` é referenciado mas o campo `mensagem` não existe no HTML — TypeError no envio | 🔴 Crítico | UX/Usabilidade | `script.js:133` / `index.html:286-305` |
| 3 | **`<select>` sem label acessível** (WCAG 4.1.2 – violação crítica confirmada por auditoria): o `#servico` não tem `<label>`, `aria-label` nem `title` | 🔴 Crítico | Acessibilidade | `index.html:295-300` |
| 4 | **`.btn-whatsapp` contraste insuficiente**: branco (#fff) sobre verde (#25D366) = 1.98:1 (mínimo: 4.5:1) | 🟠 Alto | Acessibilidade | `style.css:71-76` |
| 5 | **`.nav-cta.active` contraste insuficiente**: cor ativa #c8b89a sobre fundo branco (#fff) = 1.94:1 | 🟠 Alto | Acessibilidade | `script.js:177` / `style.css:105-106` |
| 6 | **`.servico-link` contraste insuficiente**: #9d4edd sobre #1b0a24 = 4.09:1 (mínimo: 4.5:1) – 6 ocorrências | 🟠 Alto | Acessibilidade | `style.css:157` |
| 7 | **`.section-tag` contraste insuficiente**: #9d4edd em múltiplos fundos escuros com 4.09–4.44:1 (abaixo de 4.5:1) | 🟠 Alto | Acessibilidade | `style.css:80-83` |
| 8 | **Rodapé copyright com contraste insuficiente**: `var(--mid)` (#784b96) sobre #07030a = 3.16:1 | 🟠 Alto | Acessibilidade | `style.css:208` |
| 9 | **Nenhum landmark `<main>`**: todo o conteúdo da página está fora de landmarks semânticos (violação confirmada por auditoria) | 🟠 Alto | Acessibilidade | `index.html` (estrutura global) |
| 10 | **CSS do `.scroll-down` ausente**: elemento HTML existe mas sem estilo — indicador de scroll invisível | 🟠 Alto | Design Visual | `style.css` / `index.html:57-59` |
| 11 | **CSS do `.navbar.scrolled` ausente**: a classe é adicionada via JS no scroll mas sem definição CSS — nenhum efeito visual | 🟡 Médio | Micro-interações | `style.css` / `script.js:7-10` |
| 12 | **Cursor glow usando `left/top` em vez de `transform: translate()`**: causa layout repaints em cada `mousemove`, prejudicando performance | 🟡 Médio | Performance / Micro-interações | `script.js:162-173` |
| 13 | **Cor ativa do nav injetada por `<style>` dinâmico em runtime**: #c8b89a deveria estar no CSS estático | 🟡 Médio | Consistência | `script.js:175-178` |
| 14 | **Cards de serviços inconsistentes**: cards com imagem usam `.servico-info`, sem imagem usam `.servico-info-full` — alturas e alinhamentos diferentes quebram a grade | 🟡 Médio | Design Visual | `index.html:97-153` / `style.css:152-153` |
| 15 | **`.sobre-badge` transborda o container**: `bottom: -20px; right: -20px` pode ser cortado em viewports menores | 🟡 Médio | Responsivo/Mobile | `style.css:136` |
| 16 | **Hierarquia de headings incorreta**: seção "Diferenciais" usa `<h4>` diretamente após `<h2>` sem `<h3>` intermediário | 🟡 Médio | Acessibilidade | `index.html:171-200` |
| 17 | **Links externos sem `rel="noopener noreferrer"`**: todos os `target="_blank"` estão sem proteção | 🟡 Médio | Segurança/UX | `index.html:269, 280, 323` |
| 18 | **Botão hamburger sem `aria-expanded`**: estado aberto/fechado não é anunciado por leitores de tela | 🟡 Médio | Acessibilidade | `index.html:21-23` / `script.js:13-20` |
| 19 | **`--gray: #4a2c5e`** – variável CSS nomeada "gray" mas contém cor roxa — nomenclatura enganosa | 🔵 Baixo | Consistência | `style.css:10` |
| 20 | **Favicon ausente** – erro 404 no console para `/favicon.ico` | 🔵 Baixo | UX | `index.html` (sem `<link rel="icon">`) |
| 21 | **Tamanho de página ~3.3MB**: imagens não otimizadas (sem `loading="lazy"`, sem `srcset`, sem WebP) | 🔵 Baixo | Performance | `index.html:38, 66, 100, 128` |
| 22 | **Formulário sem `<label>` visíveis**: apenas placeholders — problema de UX e acessibilidade leve (inputs de texto passaram, mas é má prática) | 🔵 Baixo | Acessibilidade/UX | `index.html:288-303` |

---

## Legenda de Criticidade

- 🔴 **Crítico**: Quebra funcionalidade ou viola padrões de acessibilidade WCAG
- 🟠 **Alto**: Impacta significativamente a experiência ou qualidade de design
- 🟡 **Médio**: Problema perceptível que deve ser corrigido
- 🔵 **Baixo**: Melhoria nice-to-have

---

## Próximos Passos (Priorização Sugerida)

### Imediato (Críticos)
1. Adicionar CSS das classes de animação ao `style.css` (`.reveal`, `.reveal-left`, `.reveal-right`, `.visible`)
2. Remover referência a `form.mensagem` no `script.js` ou adicionar o campo ao formulário
3. Adicionar `<label>` ou `aria-label` ao `<select id="servico">`

### Curto Prazo (Altos)
4. Ajustar contraste de `.section-tag` para `#b06ef0` ou superior
5. Substituir `color: white` no `.btn-whatsapp` por `#065f33` (escuro sobre verde)
6. Envolver todo o conteúdo principal em `<main>`
7. Adicionar CSS do `.scroll-down` e `.navbar.scrolled`

### Médio Prazo (Médios)
8. Usar `transform: translate()` no cursor glow em vez de `left/top`
9. Mover estilo `.nav-links a.active` para `style.css`
10. Padronizar todos os cards de serviço (todos com ou sem imagem)
11. Corrigir `rel="noopener noreferrer"` em links externos
12. Adicionar `aria-expanded` ao botão hamburger
13. Corrigir hierarquia: substituir `<h4>` por `<h3>` em Diferenciais

### Quando Possível (Baixos)
14. Renomear `--gray` para `--purple-dark` ou similar
15. Adicionar favicon
16. Otimizar imagens com `loading="lazy"` e `srcset` / WebP
17. Adicionar `<label>` visíveis ao formulário
