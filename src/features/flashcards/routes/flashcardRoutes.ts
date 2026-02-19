import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { CreateCard } from '@flashcards/controllers/create-card';
import { GetCards } from '@flashcards/controllers/get-cards';
import { DeleteCard } from '@flashcards/controllers/delete-card';
import { UpdateCard } from '@flashcards/controllers/update-card';
import { CardProgress } from '@flashcards/controllers/card-progress';
import { CardBookmark } from '@flashcards/controllers/card-bookmark';
import { CardReaction } from '@flashcards/controllers/card-reaction';
import { CardComment } from '@flashcards/controllers/card-comment';

class FlashcardRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // GET routes
    this.router.get('/cards/all/:page', authMiddleware.checkAuthentication, GetCards.prototype.cards);
    this.router.get('/cards/category/:category/:page', authMiddleware.checkAuthentication, GetCards.prototype.cardsByCategory);
    this.router.get('/cards/user/:userId/:page', authMiddleware.checkAuthentication, GetCards.prototype.cardsByUser);
    this.router.get('/cards/:cardId', authMiddleware.checkAuthentication, GetCards.prototype.singleCard);

    // Progress routes
    this.router.get('/cards/progress/user/:userId', authMiddleware.checkAuthentication, CardProgress.prototype.getUserProgress);
    this.router.get('/cards/progress/card/:cardId', authMiddleware.checkAuthentication, CardProgress.prototype.getCardProgress);
    this.router.get('/cards/practice/due', authMiddleware.checkAuthentication, CardProgress.prototype.getCardsDue);
    this.router.get('/cards/practice/stats', authMiddleware.checkAuthentication, CardProgress.prototype.getPracticeStats);

    // Bookmark routes
    this.router.get('/cards/bookmarks/:userId/:page', authMiddleware.checkAuthentication, CardBookmark.prototype.getBookmarkedCards);
    this.router.get('/cards/bookmark/check/:cardId', authMiddleware.checkAuthentication, CardBookmark.prototype.checkBookmark);
    this.router.get('/cards/bookmark/count/:cardId', authMiddleware.checkAuthentication, CardBookmark.prototype.getBookmarkCount);

    // Reaction routes
    this.router.get('/cards/reactions/:cardId', authMiddleware.checkAuthentication, CardReaction.prototype.getCardReactions);
    this.router.get('/cards/reaction/single/:cardId', authMiddleware.checkAuthentication, CardReaction.prototype.getSingleCardReaction);
    this.router.get('/cards/reaction/types/:cardId', authMiddleware.checkAuthentication, CardReaction.prototype.getReactionsByType);

    // Comment routes
    this.router.get('/cards/comments/:cardId', authMiddleware.checkAuthentication, CardComment.prototype.getCardComments);
    this.router.get('/cards/comment/names/:cardId', authMiddleware.checkAuthentication, CardComment.prototype.getCommentNames);

    // POST routes
    this.router.post('/cards', authMiddleware.checkAuthentication, CreateCard.prototype.card);
    this.router.post('/cards/with-image', authMiddleware.checkAuthentication, CreateCard.prototype.cardWithImage);
    this.router.post('/cards/progress/:cardId', authMiddleware.checkAuthentication, CardProgress.prototype.updateProgress);
    this.router.post('/cards/bookmark/:cardId', authMiddleware.checkAuthentication, CardBookmark.prototype.toggleBookmark);
    this.router.post('/cards/reaction', authMiddleware.checkAuthentication, CardReaction.prototype.addReaction);
    this.router.post('/cards/comment', authMiddleware.checkAuthentication, CardComment.prototype.addComment);

    // PUT routes
    this.router.put('/cards/:cardId', authMiddleware.checkAuthentication, UpdateCard.prototype.card);
    this.router.put('/cards/comment/:commentId', authMiddleware.checkAuthentication, CardComment.prototype.updateComment);

    // DELETE routes
    this.router.delete('/cards/:cardId', authMiddleware.checkAuthentication, DeleteCard.prototype.card);
    this.router.delete('/cards/progress/:cardId', authMiddleware.checkAuthentication, CardProgress.prototype.resetProgress);
    this.router.delete('/cards/reaction/:cardId/:reactionType', authMiddleware.checkAuthentication, CardReaction.prototype.removeReaction);
    this.router.delete('/cards/comment/:commentId', authMiddleware.checkAuthentication, CardComment.prototype.deleteComment);

    return this.router;
  }
}

export const flashcardRoutes: FlashcardRoutes = new FlashcardRoutes();
