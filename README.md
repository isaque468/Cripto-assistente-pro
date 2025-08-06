# 🚀 Cripto Assistente PRO

Um sistema inteligente de análise de criptomoedas usando IA multi-agente para pesquisa, análise e estratégias de trading automáticas.

## 📋 Sobre o Projeto

O Cripto Assistente PRO utiliza **CrewAI** e **Google Gemini** para criar um time de agentes especializados que trabalham em conjunto para:

- 🔍 **Pesquisar** dados essenciais de criptomoedas
- 📊 **Analisar** tendências e oportunidades
- 💡 **Gerar** estratégias de trading personalizadas

## ✨ Funcionalidades

- **Análise Automatizada**: Sistema multi-agente para análise completa
- **Múltiplas Categorias**: DeFi, AI Tokens, Memecoins, GameFi, NFT, Web3, etc.
- **Estratégias Personalizadas**: Recomendações para perfis Conservador, Moderado e Arrojado
- **Relatórios Exportáveis**: Análises salvas em formato Markdown
- **Dados em Tempo Real**: Integração com APIs de mercado via Serper

## 🛠️ Tecnologias Utilizadas

- **Python 3.8+**
- **CrewAI** - Framework para agentes de IA colaborativos
- **Google Gemini** - Modelo de linguagem avançado
- **SerperDev** - API para pesquisas em tempo real
- **Pydantic** - Validação de dados
- **python-dotenv** - Gerenciamento de variáveis de ambiente

## 🚀 Como Usar

### 1. Pré-requisitos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cripto-assistente-pro.git
cd cripto-assistente-pro

# Instale as dependências
pip install -r requirements.txt
```

### 2. Configuração das APIs

Crie um arquivo `.env` na raiz do projeto:

```env
GOOGLE_API_KEY=sua_google_api_key_aqui
SERPER_API_KEY=sua_serper_api_key_aqui
```

**Como obter as chaves:**
- **Google API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Serper API Key**: [Serper.dev](https://serper.dev/api-key)

### 3. Executar o Sistema

```bash
python main.py
```

### 4. Opções de Análise

O sistema oferece várias opções:

1. **Análise Geral de Criptomoedas**
2. **Categorias Específicas**: DeFi, AI Tokens, Memecoins, etc.
3. **Criptomoedas Específicas**: Bitcoin, Ethereum, Solana, etc.

## 📊 Exemplo de Saída

```markdown
# 📊 BITCOIN - Análise Resumida

## 🔍 Dados Essenciais
- Preço Atual: $43,250.00 (+2.5% 24h)
- Market Cap: $847B
- Volume 24h: $15.2B

## 📈 Análise
**Tendência Atual**: Alta - Rompimento de resistência em $42K

**Principais Oportunidades**:
- Momentum positivo pós-aprovação ETF
- Suporte forte em $40K
- Volume crescente

## 💡 Estratégias de Trading

**CONSERVADOR** 🛡️:
- Entrada: $42,500
- Stop-loss: $40,000
- Take-profit: $47,000
```

## 🏗️ Arquitetura do Sistema

### Agentes Especializados

1. **🔍 Pesquisador de Criptomoedas**
   - Coleta dados de preços, volume e market cap
   - Busca notícias recentes
   - Identifica níveis técnicos

2. **📊 Analista de Criptomoedas**
   - Analisa tendências de mercado
   - Identifica oportunidades e riscos
   - Gera recomendações

3. **💡 Estrategista de Trading**
   - Cria estratégias personalizadas
   - Define pontos de entrada e saída
   - Adapta para diferentes perfis de risco

## 📁 Estrutura do Projeto

```
cripto-assistente-pro/
├── main.py                 # Arquivo principal
├── requirements.txt        # Dependências
├── .env                   # Variáveis de ambiente (não versionado)
├── .gitignore            # Arquivos ignorados pelo Git
├── README.md             # Este arquivo
└── analises/             # Relatórios gerados (criado automaticamente)
```

## 🔧 Dependências

```txt
crewai>=0.28.0
crewai-tools>=0.1.0
google-generativeai>=0.4.0
python-dotenv>=1.0.0
pydantic>=2.0.0
```

## 🚦 Status do Projeto

- ✅ Sistema multi-agente funcional
- ✅ Integração com APIs externas
- ✅ Análise automatizada
- ✅ Estratégias de trading
- 🔄 Em desenvolvimento: Interface web
- 🔄 Planejado: Alertas em tempo real

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## ⚠️ Disclaimer

Este projeto é apenas para fins educacionais e informativos. Não constitui aconselhamento financeiro. Sempre faça suas próprias pesquisas antes de investir em criptomoedas.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato
- **Email**: isac468@hotmail.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
