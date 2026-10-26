# Empire — Credenciamento

## Executar no computador

1. Extraia o arquivo ZIP para uma pasta.
2. Instale o Node.js, se ainda não estiver instalado.
3. Abra um terminal dentro da pasta `empire platform`.
4. Execute:

   ```bash
   npm install
   npm run dev
   ```

5. Abra no navegador o endereço local mostrado pelo Vite, normalmente `http://localhost:5173/`.

Não abra `index.html` diretamente pelo Explorador de Arquivos. O projeto precisa do servidor local do Vite.

Para abrir a versão compilada localmente, execute `npm run build` e depois `npm run preview`. O Vite mostrará o endereço local da prévia.

## Observação sobre dados

O credenciamento é uma prévia. Os registros ficam somente na memória da página, não são persistidos nem protegidos por um backend. Não use dados pessoais reais até a integração do backend protegido.
