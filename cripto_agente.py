import warnings
from pydantic import PydanticDeprecatedSince20

warnings.filterwarnings("ignore", category=PydanticDeprecatedSince20)

from dotenv import load_dotenv
from crewai import Agent, Task, Crew, LLM
from crewai_tools import SerperDevTool
import os
import sys

load_dotenv()


def check_api_keys():
    required_keys = ['SERPER_API_KEY', 'GOOGLE_API_KEY']
    missing_keys = []

    for key in required_keys:
        if not os.getenv(key):
            missing_keys.append(key)

    if missing_keys:
        print("❌ ERRO: Chaves de API não encontradas:", missing_keys)
        return False
    return True


if not check_api_keys():
    sys.exit(1)

# Configura o modelo Gemini
gemini_llm = LLM(
    model="gemini/gemini-1.5-flash",
    api_key=os.getenv("GOOGLE_API_KEY")
)

search_tool = SerperDevTool()

# --- AGENTES OTIMIZADOS ---

pesquisador_crypto = Agent(
    role="Pesquisador de Criptomoedas",
    goal="Coletar dados essenciais sobre {crypto_target}",
    backstory="""Você é um pesquisador eficiente que coleta apenas os dados mais relevantes.
    Foca em preços, volume, market cap, notícias recentes e análise técnica básica.""",
    allow_delegation=False,
    verbose=True,
    tools=[search_tool],
    llm=gemini_llm
)

analista_crypto = Agent(
    role="Analista de Criptomoedas",
    goal="Analisar dados e identificar oportunidades para {crypto_target}",
    backstory="""Você é um analista prático que transforma dados em insights rápidos.
    Foca em tendências, oportunidades e riscos principais sem se perder em detalhes.""",
    allow_delegation=False,
    verbose=True,
    llm=gemini_llm
)

estrategista_trading = Agent(
    role="Especialista em Trading",
    goal="Criar estratégias de trading para {crypto_target}",
    backstory="""Você é um trader que cria estratégias simples e eficazes.
    Define pontos de entrada, stop-loss e take-profit para diferentes perfis.""",
    allow_delegation=False,
    verbose=True,
    llm=gemini_llm
)

# --- TAREFAS RESUMIDAS ---

tarefa_pesquisa = Task(
    description="""Pesquise dados essenciais sobre {crypto_target}:

    BUSCAS PRINCIPAIS:
    1. "{crypto_target} price coinmarketcap"
    2. "{crypto_target} news today"
    3. "{crypto_target} technical analysis"
    4. "{crypto_target} trading volume"

    COLETE APENAS:
    - Preço atual e variação 24h
    - Market cap e volume
    - Principais notícias (máximo 3)
    - Níveis de suporte e resistência
    - Tendência atual (alta/baixa/lateral)""",
    agent=pesquisador_crypto,
    expected_output="Dados essenciais de {crypto_target} com preços, volume e tendências."
)

tarefa_analise = Task(
    description="""Analise {crypto_target} de forma resumida:

    ANÁLISE OBRIGATÓRIA:
    1. **Tendência Atual**: Alta/Baixa/Lateral (justificativa em 1 linha)
    2. **Principais Oportunidades**: Máximo 3 pontos
    3. **Riscos Principais**: Máximo 3 pontos
    4. **Recomendação**: Comprar/Manter/Vender

    Seja conciso e direto ao ponto.""",
    agent=analista_crypto,
    expected_output="Análise resumida com tendência, oportunidades e riscos de {crypto_target}."
)

tarefa_estrategias = Task(
    description="""Crie estratégias de trading para {crypto_target}:

    ESTRATÉGIAS POR PERFIL:

    **CONSERVADOR** 🛡️:
    - Entrada: [Preço específico]
    - Stop-loss: [Preço específico] 
    - Take-profit: [Preço específico]

    **MODERADO** ⚖️:
    - Entrada: [Preço específico]
    - Stop-loss: [Preço específico]
    - Take-profit: [Preço específico]

    **ARROJADO** 🚀:
    - Entrada: [Preço específico]
    - Stop-loss: [Preço específico]
    - Take-profit: [Preço específico]

    Inclua apenas 1 estratégia de renda passiva se aplicável.""",
    agent=estrategista_trading,
    expected_output="Estratégias específicas de trading para {crypto_target} com preços exatos."
)

# --- CREW ---
crew_crypto = Crew(
    agents=[pesquisador_crypto, analista_crypto, estrategista_trading],
    tasks=[tarefa_pesquisa, tarefa_analise, tarefa_estrategias],
    verbose=True
)


def analisar_crypto(crypto_name):
    """Analisa uma criptomoeda específica"""
    try:
        print(f"\n🔍 Analisando {crypto_name}...")
        resultado = crew_crypto.kickoff(inputs={"crypto_target": crypto_name})

        # Formatação do resultado
        relatorio = f"""
# 📊 {crypto_name.upper()} - Análise Resumida

{resultado}

---
*Análise gerada automaticamente*
"""
        return relatorio
    except Exception as e:
        return f"❌ Erro na análise: {e}"


def main():
    print("=" * 50)
    print("🚀 Cripto Assistente PRO - Versão Resumida")
    print("=" * 50)

    opcoes_analise = [
        "Análise Geral de Criptomoedas",
        "DeFi", "AI Tokens", "Memecoins", "GameFi",
        "NFT", "Web3", "Metaverse", "Storage"
    ]

    print("💡 Opções de análise:")
    for i, opcao in enumerate(opcoes_analise, 1):
        print(f"   {i}. {opcao}")

    print("\n🔍 Ou pesquise uma criptomoeda específica:")
    print("   Exemplos: Bitcoin, Ethereum, Solana, Cardano")

    while True:
        escolha = input("\n🎯 Escolha uma opção (1-9) ou digite uma crypto: ").strip()

        if escolha.lower() in ['sair', 'exit', 'quit']:
            break

        if escolha.isdigit():
            idx = int(escolha) - 1
            if 0 <= idx < len(opcoes_analise):
                target = opcoes_analise[idx]
            else:
                print("❌ Número inválido!")
                continue
        else:
            target = escolha

        if not target:
            print("❌ Digite uma opção válida!")
            continue

        try:
            resultado = analisar_crypto(target)
            print(resultado)

            # Salva o relatório
            nome_arquivo = f"analise_{target.replace(' ', '_').lower()}.md"
            with open(nome_arquivo, "w", encoding="utf-8") as f:
                f.write(resultado)
            print(f"\n💾 Análise salva: '{nome_arquivo}'")

        except KeyboardInterrupt:
            print("\n⏹️ Interrompido pelo usuário.")
            break
        except Exception as e:
            print(f"\n❌ Erro: {e}")


if __name__ == "__main__":
    main()