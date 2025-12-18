# Docker Deployment Guide - Apimef

## Démarrage rapide avec Docker Compose

### 1. Préparer l'environnement

```bash
# Copier le fichier d'exemple
cp .env.docker.example .env.docker

# Éditer avec vos variables (optionnel)
nano .env.docker
```

### 2. Démarrer les services

```bash
# Démarrer tous les services (MySQL + Backend)
docker-compose up -d

# Vérifier les logs
docker-compose logs -f backend
docker-compose logs -f mysql
```

### 3. Accéder à l'application

- **API Backend**: `http://localhost:3000`
- **API Products**: `http://localhost:3000/api/products`
- **MySQL**: `localhost:3306`

### 4. Arrêter les services

```bash
docker-compose down

# Supprimer aussi les volumes (données)
docker-compose down -v
```

---

## Build et déploiement personnalisé

### Build l'image Docker

```bash
docker build -t apimef:latest .
```

### Exécuter le conteneur seul (sans compose)

```bash
docker run -d \
  --name apimef \
  -p 3000:3000 \
  -e DB_HOST=<mysql-host> \
  -e DB_USER=apimef \
  -e DB_PASSWORD=<password> \
  -e DB_NAME=apimef \
  -e JWT_SECRET=<your-secret> \
  -e STRIPE_MOCK=true \
  apimef:latest
```

---

## Production (cloud deployment)

### Variables d'environnement requises

```env
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_USER=apimef
DB_PASSWORD=strong_password_here
DB_NAME=apimef
JWT_SECRET=generate_strong_secret
STRIPE_SECRET_KEY=sk_live_your_production_key
STRIPE_MOCK=false
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

### Déployer sur AWS, Heroku, DigitalOcean

1. **Push l'image Docker vers un registre** (ECR, DockerHub, etc.)
2. **Configurer les variables d'environnement** dans le service cloud
3. **Pointer la BD** vers une instance MySQL managée (RDS, CloudSQL, etc.)
4. **Lancer le conteneur** avec les variables d'env

### Exemple Heroku

```bash
# Se connecter
heroku login

# Créer une app
heroku create apimef

# Ajouter une BD MySQL
heroku addons:create cleardb:ignite

# Déployer
git push heroku main
```

---

## Debugging

### Vérifier la santé du conteneur

```bash
docker-compose ps
docker inspect apimef-backend
```

### Accéder au shell du conteneur

```bash
docker-compose exec backend sh
```

### Vérifier les logs

```bash
docker-compose logs -f --tail=100 backend
docker-compose logs -f --tail=100 mysql
```

### Réinitialiser la BD

```bash
docker-compose down -v
docker-compose up -d
# La BD sera réinitialisée automatiquement depuis schema.sql
```

---

## Considérations de sécurité

- ✅ **Ne pas commiter** `.env` ou `.env.docker` (protégés par `.gitignore`)
- ✅ **Générer** des secrets forts pour `JWT_SECRET` et `DB_PASSWORD`
- ✅ **Utiliser HTTPS** en production
- ✅ **Mettre à jour** les images Docker régulièrement
- ✅ **Limiter** l'accès à MySQL (pas d'exposition directe)
- ✅ **Configurer** les limites de ressources (CPU, mémoire)

```yaml
# Ajouter au service dans docker-compose.yml pour limiter les ressources
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 512M
```
