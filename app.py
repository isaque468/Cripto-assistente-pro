from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import json
from crypto_agent import analisar_crypto
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permite requisições do frontend

# Configurações
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')


@app.route('/')
def index():
    """Serve o frontend"""
    return render_template('index.html')


@app.route('/api/analyze', methods=['POST'])
def analyze_crypto():
    """Endpoint para análise de crypto"""
    try:
        data = request.get_json()
        crypto_name = data.get('crypto_name', '').strip()

        if not crypto_name:
            return jsonify({
                'error': 'Nome da criptomoeda é obrigatório'
            }), 400

        # Chama seu agente CrewAI
        resultado = analisar_crypto(crypto_name)

        # Salva o relatório
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        nome_arquivo = f"reports/analise_{crypto_name.replace(' ', '_').lower()}_{timestamp}.md"

        os.makedirs('reports', exist_ok=True)
        with open(nome_arquivo, "w", encoding="utf-8") as f:
            f.write(resultado)

        return jsonify({
            'success': True,
            'result': resultado,
            'crypto_name': crypto_name,
            'timestamp': timestamp,
            'report_file': nome_arquivo
        })

    except Exception as e:
        return jsonify({
            'error': f'Erro na análise: {str(e)}'
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Verifica se a API está funcionando"""
    return jsonify({
        'status': 'ok',
        'message': 'Cripto Assistente PRO API está funcionando!'
    })


@app.route('/api/sectors', methods=['POST'])
def analyze_sector():
    """Endpoint para análise de setores"""
    try:
        data = request.get_json()
        sector_name = data.get('sector_name', '').strip()

        if not sector_name:
            return jsonify({
                'error': 'Nome do setor é obrigatório'
            }), 400

        # Usa o mesmo agente para análise de setor
        resultado = analisar_crypto(sector_name)

        return jsonify({
            'success': True,
            'result': resultado,
            'sector_name': sector_name,
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

    except Exception as e:
        return jsonify({
            'error': f'Erro na análise: {str(e)}'
        }), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)