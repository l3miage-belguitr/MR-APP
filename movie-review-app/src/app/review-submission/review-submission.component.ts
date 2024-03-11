import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-review-submission',
  templateUrl: './review-submission.component.html',
  styleUrls: ['./review-submission.component.css']
})
export class ReviewSubmissionComponent {
  movieId!: string;
  name: string = '';
  review: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    // Souscrire aux paramètres de l'URL pour obtenir l'ID du film
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
    });
  }

  // Méthode appelée lors de la soumission de l'avis
  submitReview() {
    if (this.name && this.review) {
      // Appel de service pour soumettre l'avis
      this.movieService.submitReview(this.movieId, this.name, this.review).subscribe(response => {
        console.log('Avis soumis avec succès :', response);
        // En option, vous pouvez naviguer vers une autre page ou afficher un message de succès à l'utilisateur
      }, error => {
        console.error('Échec de la soumission de l\'avis :', error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
      });
    } else {
      // Afficher un message d'erreur de validation à l'utilisateur
      console.error('Les champs Nom et Avis sont requis.');
    }
  }
}
