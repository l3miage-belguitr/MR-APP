from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

TMDB_API_KEY = '49451e454812f40a42145aabe7370765'
TMDB_API_URL = 'https://api.themoviedb.org/3'

@app.route('/api/movie/search')
def search_movie():
    try:
        # Obtenir le nom du film à partir des paramètres de requête
        movie_name = request.args.get('name')
        
        # Vérifier si le nom du film est fourni
        if not movie_name:
            return jsonify({'error': 'Le nom du film est requis dans les paramètres de la requête.'}), 400

        # Récupérer les détails du film depuis l'API TMDB
        response = requests.get(f'{TMDB_API_URL}/search/movie?api_key={TMDB_API_KEY}&query={movie_name}')
        response.raise_for_status()  # Lever une exception pour les erreurs HTTP
        data = response.json()
        
        # Vérifier si des résultats sont trouvés
        if data['total_results'] == 0:
            return jsonify({'error': 'Film non trouvé.'}), 404
        
        # Extraire les informations pertinentes sur le premier film trouvé
        movie_info = data['results'][0]
        
        # Vous pouvez décider quoi faire avec ces informations sur le film ici
        # Par exemple, vous pouvez l'ajouter à une base de données s'il est nouveau
        
        return jsonify(movie_info)
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
