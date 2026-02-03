# ProjectManager
**ProjectManager** est une **application web**, fonctionnant via *React* et *Flash*, permettant de gérer des projets via un **système de tâche** \
Ce projet a été créé dans le cadre du projet web disponible sur [Raisintine](https://raisintine.fr/chocolatine/document.php?id=401).

# Pré-requis
- **Python 3.13**
- **Node.js**

# Installation
## Téléchargement du Dépôt
```powershell
git clone https://github.com/Jzombi-le-codeur/ProjectManager.git
```
## Installation côté back-end
### Powershell
```powershell
cd ProjectManager\BackEnd
python -m venv .venv
.venv\Scripts\activate.ps1
pip install -r requirements.txt
```
### Bash
```bash
cd ProjectManager/BackEnd
python -m venv .venv
.venv/bin/activate
pip install -r requirements.txt
```
## Installation côté front-end
```powershell
cd ProjectManager\FrontEnd\front_end
npm install
```

# Exécution
## Lancement côté back-end
```powershell
cd ProjectManager/BackEnd
python main.py
```
## Lancement côté front-end
```powershell
cd ProjectManager\FrontEnd\front_end
npm start
```