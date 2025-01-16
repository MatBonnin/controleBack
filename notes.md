Coté back : 
Les routes qui intéroge l'api n'ont pas de /api devant.

La  route put http://localhost:3102/miels/1/prix/10 est formé bizarement car
il faudrait juste faire un put sur le /1 et passer dans le body les info à modifier

Dans l'idéale coté api il faudrait retourner les bon code ex 200 201 400 etc 
J'ai rien compris à cette histoire de tag

Coté front :

Ya tout dans une seul page c'est un sacré bordel puis ya rien qui est séparé . Dnas l'idealé il faudrait des fihcier pour les requete api et des fichier aussi différent pour chaque page . Il y a quasi aucune gestion d'erreur try catch .  