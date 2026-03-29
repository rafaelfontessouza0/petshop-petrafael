================================================================================
AJUDA — SISTEMA WEB PETRAFAEL (FASE COM BOOTSTRAP, JAVASCRIPT E FORMULÁRIOS)
================================================================================

Visão geral
-----------
O site do PetRafael é um conjunto de páginas HTML estáticas, com aparência e
layout usando Bootstrap 5 (CSS responsivo), imagens com texto alternativo,
e comportamento dinâmico em JavaScript (relogio, saudação, validação de
formulários). Não há servidor de aplicação: cadastro, agendamento e contato
apenas simulam o envio no navegador (adequado à disciplina de Fundamentos de
Sistemas Web).

Estrutura de arquivos
---------------------
  index.html          — Página inicial com carrossel de imagens e destaques.
  produtos.html       — Catálogo ilustrativo por categorias (cards).
  servicos.html       — Banho e tosa, valores e link para agendamento.
  cadastro.html       — Formulário de cliente (nome, endereço, CPF, sexo, etc.)
                        e do pet (nome, raça, idade, espécie, vacinas).
  agendamento.html    — Escolha de banho ou tosa, tele-busca ou loja, data/hora.
  contato.html        — Dados do petshop e formulário de mensagem.
  css/estilo.css      — Ajustes complementares (foco, legendas).
  js/app.js           — Relógio em tempo real, saudação por horário, ano no rodapé.
  js/formularios.js   — Máscaras (CPF, telefone), validação de CPF e de horário
                        comercial, feedback dos formulários.
  README-ajuda.txt    — Este arquivo de ajuda.
  objetivos-metas.txt — Documentação de apoio ao projeto (objetivos).
  .nojekyll          — Arquivo vazio para GitHub Pages publicar sem processamento
                        Jekyll (evita conflitos em sites só HTML).

Funcionalidades por página
--------------------------

1) index.html (Início)
   - Menu responsivo (navbar Bootstrap) com links para todas as seções.
   - Carrossel com três slides (imagens do Unsplash) e textos de destaque.
   - Saudação dinâmica (Bom dia / Boa tarde / Boa noite) e data/hora local
     atualizadas a cada segundo (js/app.js).
   - Resumo de categorias de produtos e chamadas para produtos e agendamento.
   - Rodapé com copyright (ano atualizado por script).

2) produtos.html (Produtos)
   - Listagem em cards: acessórios, rações e higiene, com imagens e preços.
   - Imagens com atributo "alt" descritivo (acessibilidade para leitores de tela).
   - Link para agendamento de serviços.

3) servicos.html (Serviços)
   - Descrição dos serviços de banho e tosa, com e sem tele-busca, e valores.
   - Explicação dos dois modos: tele-busca ou atendimento levando o pet à loja.
   - Botão para a página de agendamento.

4) cadastro.html (Cadastro cliente e pet)
   - Dados do cliente: nome, CPF (com máscara e validação de dígitos), endereço,
     sexo (opções em radio), telefone (máscara), e-mail, opção de newsletter
     (checkbox). Campos obrigatórios marcados e validados pelo HTML5.
   - Dados do pet: nome, raça, idade (número), espécie (cão/gato), declaração de
     vacinas em dia (checkbox).
   - Ao enviar, mensagem de sucesso simulada (sem backend).

5) agendamento.html (Agendamento)
   - Serviço: banho ou tosa (radio).
   - Modo: tele-busca ou levar pet à loja (radio).
   - Data e horário: campo nativo tipo calendário + hora (datetime-local).
   - Validação em JavaScript: horário futuro e dentro do expediente (segunda a
     sábado, 9h–19h; domingo não permitido).
   - Campo opcional de observações (textarea).

6) contato.html (Contato)
   - Endereço, e-mail e telefone clicáveis; horário de funcionamento.
   - Formulário com nome, e-mail, tipo de interesse (select) e mensagem.
   - Envio simulado com mensagem de confirmação (sem servidor).

Acessibilidade
--------------
   - Idioma da página: lang="pt-BR".
   - Link "Ir para o conteúdo principal" no topo (teclado e leitores de tela).
   - Textos alternativos (alt) em imagens do carrossel e dos produtos.
   - Navegação e regiões com rótulos ARIA onde aplicável (aria-label, aria-current,
     aria-live em mensagens de status dos formulários).
   - Contraste e foco visível reforçados em css/estilo.css.

Publicação no GitHub Pages
--------------------------
1. Envie todos os arquivos deste repositório para o GitHub (por exemplo o repositório
   petshop-petrafael do usuário rafaelfontessouza0).
2. No repositório: Settings → Pages → Source: Deploy from a branch → Branch
   "main" (ou "master") e pasta "/ (root)".
3. Após o build, o site ficará em uma URL do tipo:
   https://rafaelfontessouza0.github.io/petshop-petrafael/
   (o nome do repositório entra no caminho da URL).
4. Documentação oficial:
   https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site

Observações
-----------
   - Dependências externas: Bootstrap e imagens Unsplash via CDN/HTTPS; é preciso
     conexão com a internet para estilos, scripts e figuras.
   - Para reduzir dependência de redes externas no futuro, pode-se baixar o
     Bootstrap localmente ou usar imagens na própria pasta do projeto.

================================================================================
