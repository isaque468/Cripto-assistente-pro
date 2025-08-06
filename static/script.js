let currentAnalysis = null;

function switchTab(event, tabName) {
    // Remove active class from all tabs and panes
    const tabs = document.querySelectorAll('.tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => tab.classList.remove('active'));
    panes.forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked tab and corresponding pane
    event.currentTarget.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function selectCrypto(cryptoName) {
    document.getElementById('crypto-input').value = cryptoName;
    searchCrypto();
}

function selectSector(sectorName) {
    // Remove selected class from all cards
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(card => card.classList.remove('selected'));

    // Add selected class to clicked card
    event.currentTarget.classList.add('selected');

    analyzeSector(sectorName);
}

function searchCrypto() {
    const cryptoName = document.getElementById('crypto-input').value.trim();

    if (!cryptoName) {
        alert('Por favor, digite o nome de uma criptomoeda!');
        return;
    }

    const resultsDiv = document.getElementById('crypto-results');
    resultsDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>🔍 Analisando ${cryptoName}...</p>
            <p style="font-size: 0.9em; color: #6c757d;">Coletando dados de preços, volume e tendências...</p>
        </div>
    `;

    // Simula chamada para o backend
    setTimeout(() => {
        const mockResult = generateMockCryptoAnalysis(cryptoName);
        resultsDiv.innerHTML = mockResult;
    }, 3000);
}

function analyzeSector(sectorName) {
    const resultsDiv = document.getElementById('market-results');
    resultsDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>📊 Analisando setor ${sectorName}...</p>
            <p style="font-size: 0.9em; color: #6c757d;">Identificando oportunidades e riscos...</p>
        </div>
    `;

    // Simula chamada para o backend
    setTimeout(() => {
        const mockResult = generateMockSectorAnalysis(sectorName);
        resultsDiv.innerHTML = mockResult;
    }, 3000);
}

function generateMockCryptoAnalysis(cryptoName) {
    return `
        <div class="results">
            <h3>📊 ${cryptoName.toUpperCase()} - Análise Resumida</h3>

            <div class="alert alert-success">
                <strong>✅ Análise Concluída:</strong> Dados coletados e processados com sucesso!
            </div>

            <h4>📈 Dados Atuais</h4>
            <p><strong>Preço:</strong> $${(Math.random() * 50000).toFixed(2)}</p>
            <p><strong>Variação 24h:</strong> ${(Math.random() * 10 - 5).toFixed(2)}%</p>
            <p><strong>Volume:</strong> $${(Math.random() * 1000000000).toFixed(0)}</p>

            <h4>🎯 Tendência Atual</h4>
            <p><strong>Alta</strong> - Momentum positivo com rompimento de resistência</p>

            <h4>💡 Oportunidades</h4>
            <ul>
                <li>Rompimento de resistência técnica</li>
                <li>Volume crescente nas últimas 24h</li>
                <li>Notícias positivas sobre adoção</li>
            </ul>

            <h4>⚠️ Riscos</h4>
            <ul>
                <li>Volatilidade do mercado geral</li>
                <li>Correção técnica possível</li>
                <li>Pressão regulatória</li>
            </ul>

            <h4>🎯 Estratégias de Trading</h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                    <h5>🛡️ CONSERVADOR</h5>
                    <p><strong>Entrada:</strong> $${(Math.random() * 50000 * 0.95).toFixed(2)}</p>
                    <p><strong>Stop:</strong> $${(Math.random() * 50000 * 0.85).toFixed(2)}</p>
                    <p><strong>Alvo:</strong> $${(Math.random() * 50000 * 1.15).toFixed(2)}</p>
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <h5>⚖️ MODERADO</h5>
                    <p><strong>Entrada:</strong> $${(Math.random() * 50000 * 0.90).toFixed(2)}</p>
                    <p><strong>Stop:</strong> $${(Math.random() * 50000 * 0.80).toFixed(2)}</p>
                    <p><strong>Alvo:</strong> $${(Math.random() * 50000 * 1.30).toFixed(2)}</p>
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545;">
                    <h5>🚀 ARROJADO</h5>
                    <p><strong>Entrada:</strong> $${(Math.random() * 50000 * 0.85).toFixed(2)}</p>
                    <p><strong>Stop:</strong> $${(Math.random() * 50000 * 0.70).toFixed(2)}</p>
                    <p><strong>Alvo:</strong> $${(Math.random() * 50000 * 1.60).toFixed(2)}</p>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px;">
                <h5>🎯 Recomendação Final</h5>
                <p><strong>COMPRAR</strong> - Momentum positivo com boas perspectivas técnicas</p>
            </div>

            <div style="margin-top: 15px; font-size: 0.9em; color: #6c757d;">
                <p>📊 <strong>Conecte com seu backend Python:</strong> Para análises reais, integre este frontend com o agente Python usando Flask ou FastAPI.</p>
            </div>
        </div>
    `;
}

function generateMockSectorAnalysis(sectorName) {
    return `
        <div class="results">
            <h3>📊 ${sectorName.toUpperCase()} - Análise de Setor</h3>

            <div class="alert alert-success">
                <strong>✅ Análise Concluída:</strong> Setor analisado com sucesso!
            </div>

            <h4>📈 Panorama Geral</h4>
            <p>O setor ${sectorName} apresenta ${Math.random() > 0.5 ? 'crescimento' : 'consolidação'} com ${Math.random() > 0.5 ? 'alta' : 'média'} atividade de desenvolvimento.</p>

            <h4>🚀 Principais Projetos</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h5>Token A</h5>
                    <p>${(Math.random() * 100).toFixed(2)} (+${(Math.random() * 10).toFixed(1)}%)</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h5>Token B</h5>
                    <p>${(Math.random() * 100).toFixed(2)} (+${(Math.random() * 10).toFixed(1)}%)</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h5>Token C</h5>
                    <p>${(Math.random() * 100).toFixed(2)} (+${(Math.random() * 10).toFixed(1)}%)</p>
                </div>
            </div>

            <h4>💡 Oportunidades</h4>
            <ul>
                <li>Crescimento da adoção institucional</li>
                <li>Novos protocolos em desenvolvimento</li>
                <li>Parcerias estratégicas recentes</li>
            </ul>

            <h4>⚠️ Riscos</h4>
            <ul>
                <li>Volatilidade do mercado</li>
                <li>Concorrência acirrada</li>
                <li>Mudanças regulatórias</li>
            </ul>

            <h4>🎯 Estratégia Recomendada</h4>
            <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                <p><strong>MANTER/COMPRAR</strong> - Setor com potencial de crescimento a médio prazo</p>
                <p><strong>Alocação sugerida:</strong> 15-25% do portfólio para investidores moderados</p>
            </div>

            <div style="margin-top: 15px; font-size: 0.9em; color: #6c757d;">
                <p>📊 <strong>Integração Backend:</strong> Conecte com o agente Python para análises detalhadas em tempo real.</p>
            </div>
        </div>
    `;
}

// Adiciona funcionalidade de Enter no input
document.getElementById('crypto-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCrypto();
    }
});

// Simula dados de mercado em tempo real
function updateMarketData() {
    const suggestions = document.querySelectorAll('.crypto-suggestion');
    suggestions.forEach(suggestion => {
        const change = (Math.random() * 2 - 1).toFixed(1);
        const color = change > 0 ? '#28a745' : '#dc3545';
        suggestion.style.borderLeft = `3px solid ${color}`;
    });
}

// Atualiza dados a cada 30 segundos
setInterval(updateMarketData, 30000);
updateMarketData(); // Executa imediatamente