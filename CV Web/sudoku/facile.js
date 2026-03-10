document.addEventListener('DOMContentLoaded', () => {
	genererSudoku();
	const buttonVerifier = document.getElementById('button-verifier')
	buttonVerifier.addEventListener('click', verifier) 
});

const ajouterErreurChamp = (ligne, col) => {
	const input = document.getElementById('case' + ligne + '-' + col)
	pasErreurs = false;
	input.classList.add('invalide')
	input.addEventListener('input', () => {
	input.classList.remove('invalide')
	}, { once: true })
}

// Fonction pour générer un nombre aléatoire entre min et max inclus
const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// Fonction pour vérifier si un nombre est valide dans une case donnée
const isSafe = (sudoku, row, col, num) => {
  // Vérifier la ligne
  for (let i = 0; i < 9; i++) {
    if (sudoku[row][i] === num) {
      return false;
    }
  }

  // Vérifier la colonne
  for (let i = 0; i < 9; i++) {
    if (sudoku[i][col] === num) {
      return false;
    }
  }

  // Vérifier le carré 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (sudoku[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
};

// Fonction pour remplir le Sudoku de manière ordonnée en utilisant un algorithme de backtracking
const fillSudoku = (sudoku, row, col) => {
  if (row === 9) {
    return true; // Sudoku rempli avec succès
  }

  if (col === 9) {
    return fillSudoku(sudoku, row + 1, 0);
  }

  if (sudoku[row][col] !== 0) {
    return fillSudoku(sudoku, row, col + 1);
  }

  for (let num = 1; num <= 9; num++) {
    if (isSafe(sudoku, row, col, num)) {
      sudoku[row][col] = num;

      if (fillSudoku(sudoku, row, col + 1)) {
        return true;
      }

      sudoku[row][col] = 0; // Annuler l'assignation si elle ne mène pas à une solution valide
    }
  }

  return false;
};

const genererSudoku = () => {
	const sudoku = [];
	for (let i = 0; i < 9; i++) {
		sudoku.push(new Array(9).fill(0));
	}
	
	// Remplir le Sudoku de manière ordonnée en respectant la règle de non-duplication
	fillSudoku(sudoku, 0, 0);

	// Remplir le sudoku avec des chiffres de 1 à 9
	for (let ligne = 0; ligne < 9; ligne++) {
		const sudokuLigne = []
		for (let col = 0; col < 9; col++) {
			sudokuLigne.push((col + ligne * 3 + Math.floor(col / 3)) % 9 + 1)
		}
		sudoku.push(sudokuLigne)
	}

	// Mélanger les lignes, les colonnes et les carrés pour obtenir un sudoku aléatoire
	for (let i = 0; i < 1000; i++) {
		const group = randomIntFromInterval(0, 2)

		if (group === 0) {
			// Mélanger les lignes dans le même groupe de 3
			const groupIndex = randomIntFromInterval(0, 2)
			const line1 = groupIndex * 3 + randomIntFromInterval(0, 2)
			const line2 = groupIndex * 3 + randomIntFromInterval(0, 2)
			;[sudoku[line1], sudoku[line2]] = [sudoku[line2], sudoku[line1]]
		} else if (group === 1) {
			// Mélanger les colonnes dans le même groupe de 3
			const groupIndex = randomIntFromInterval(0, 2)
			const col1 = groupIndex * 3 + randomIntFromInterval(0, 2)
			const col2 = groupIndex * 3 + randomIntFromInterval(0, 2)
			for (let row = 0; row < 9; row++) {
				;[sudoku[row][col1], sudoku[row][col2]] = [sudoku[row][col2], sudoku[row][col1]]
			}
		} else {
			// Mélanger les carrés (groupes de 3x3)
			const group1 = randomIntFromInterval(0, 2)
			const group2 = randomIntFromInterval(0, 2)
			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 9; col++) {
					;[sudoku[row + group1 * 3][col], sudoku[row + group2 * 3][col]] = [sudoku[row + group2 * 3][col], sudoku[row + group1 * 3][col]]
				}
			}
		}
	}

	// Masquer certaines cases pour obtenir 40 cases vides
	let casesMasquees = 0;
	while (casesMasquees < 40) {
		const ligne = Math.floor(Math.random() * 9);
		const col = Math.floor(Math.random() * 9);

			if (sudoku[ligne][col] !== '') {
				sudoku[ligne][col] = '';
				casesMasquees++;
			}
	}
	
	// Afficher le sudoku dans la page
	for (let ligne = 0; ligne < 9; ligne++) {
		for (let col = 0; col < 9; col++) {
			const identifiant = 'case' + ligne + '-' + col;
			const input = document.getElementById(identifiant)
			input.value = sudoku[ligne][col];
			
			// Désactiver les cases générées aléatoirement
			if (sudoku[ligne][col] !== '') {
				input.disabled = true;
			} else {
			// Laisser les autres cases modifiables
				input.disabled = false;
			}
		}
	}
}

const isGrilleValide = (sudoku) => {
  // Vérifier si toutes les cases sont remplies
  for (let ligne = 0; ligne < 9; ligne++) {
    for (let col = 0; col < 9; col++) {
      if (sudoku[ligne][col] === '') {
        return false;
      }
    }
  }

  // Vérifier s'il n'y a pas d'erreurs dans la grille
  for (let ligne = 0; ligne < 9; ligne++) {
    for (let col = 0; col < 9; col++) {
      const num = sudoku[ligne][col];
      if (!isSafe(sudoku, ligne, col, num)) {
        return false;
      }
    }
  }

  return true;
};

const verifier = () => {
	let pasErreurs = true;
	// Vérifier que les nombres saisis sont bien des nombres de 1 à 9
	
	// Récupérer tous les input de la page
	const listeInput = document.querySelectorAll('input')
	
	// Enlever toutes les classes invalides
	for (const input of listeInput) {
		input.classList.remove('invalide')
	}
	
	// chacun des inputs
	for (const input of listeInput) {
		// Vérifier que le champs est valide
		const validiteInput = input.checkValidity()
		
		if (validiteInput === false) {
			// Si c'est pas valide, arrêtez le programme
			return
		}
	}
	
	// Tableau qui contient toutes les lignes
	const sudoku = []
	
	// Récupérer toutes les valeurs
	for (let ligne = 0; ligne < 9; ligne += 1) {
		const sudokuLigne = []
		
		for (let col = 0; col < 9; col += 1) {
			const identifiant = 'case' + ligne + '-' + col
			const input = document.getElementById(identifiant)
			const valeur = input.value
			const nombre = valeur === ''
				? ''
				: parseInt(valeur, 10)
			
			// Ajouter la valeur à la ligne
			sudokuLigne.push(nombre)
		}
		
		// Ajouter la ligne au sudoku
		sudoku.push(sudokuLigne)
	}
	
	// Vérifier qu'il n'y ait pas de doublons dans les lignes
	
	// Parcourir les lignes
	for (let ligne = 0; ligne < 9; ligne += 1) {
		const liste = new Set()
		
		// Parcourir les éléments de la ligne
		for (let col = 0; col < 9; col += 1) {
			const valeur = sudoku[ligne][col]
			
			// Si la valeur est vide, ne rien faire			
			if (valeur === '') {
				
			} else {
				// Sinon	
				const valeurExiste = liste.has(valeur)
				
				// Vérifier que l'élément n'est pas dans la liste
				if (valeurExiste) {
					console.log('Erreur doublon' + ligne + '-' + col)
					
					// Ajouter une classe d'erreur au champs
					ajouterErreurChamp(ligne, col)
					} else {
					// Ajouter l'élément à une liste
					liste.add(valeur)
				}
			}
		}
	}
	
	// Parcourir les colonnes
	for (let col = 0; col < 9; col += 1) {
		const liste = new Set()
		
		// Parcourir les éléments de la ligne
		for (let ligne = 0; ligne < 9; ligne += 1) {
			const valeur = sudoku[ligne][col]
			
			// Si la valeur est vide, ne rien faire			
			if (valeur === '') {
				
			} else {
				// Sinon	
				const valeurExiste = liste.has(valeur)
				
				// Vérifier que l'élément n'est pas dans la liste
				if (valeurExiste) {
					console.log('Erreur doublon' + ligne + '-' + col)
					
					// Ajouter une classe d'erreur au champs
					ajouterErreurChamp(ligne, col)
				} else {
					// Ajouter l'élément à une liste
					liste.add(valeur)
				}
			}
		}
	}
	
	// Indices des carrés
	const carres = [
		[
			[0, 0], [0, 1], [0,2],
			[1, 0], [1, 1], [1,2],
			[2, 0], [2, 1], [2,2],
		],
		[
			[0, 3], [0, 4], [0,5],
			[1, 3], [1, 4], [1,5],
			[2, 3], [2, 4], [2,5],
		],
		[
			[0, 6], [0, 7], [0,8],
			[1, 6], [1, 7], [1,8],
			[2, 6], [2, 7], [2,8],
		],
		[
			[3, 0], [3, 1], [3,2],
			[4, 0], [4, 1], [4,2],
			[5, 0], [5, 1], [5,2],
		],
		[
			[3, 3], [3, 4], [3,5],
			[4, 3], [4, 4], [4,5],
			[5, 3], [5, 4], [5,5],
		],
		[
			[3, 6], [3, 7], [3,8],
			[4, 6], [4, 7], [4,8],
			[5, 6], [5, 7], [5,8],
		],
		[
			[6, 0], [6, 1], [6,2],
			[7, 0], [7, 1], [7,2],
			[8, 0], [8, 1], [8,2],
		],
		[
			[6, 3], [6, 4], [6,5],
			[7, 3], [7, 4], [7,5],
			[8, 3], [8, 4], [8,5],
		],
		[
			[6, 6], [6, 7], [6,8],
			[7, 6], [7, 7], [7,8],
			[8, 6], [8, 7], [8,8],
		],
	]
	
	// Parcourir les carrés
	for (const carre of carres) {
		const liste = new Set()
		
		// Pour chaque carrés
		for (const element of carre) {
			const ligne = element[0]
			const col = element[1]
			
			const valeur = sudoku[ligne][col]
			
			// Si la valeur est vide, ne rien faire			
			if (valeur === '') {
				
			} else {
				// Sinon	
				const valeurExiste = liste.has(valeur)
				
				// Vérifier que l'élément n'est pas dans la liste
				if (valeurExiste) {
					console.log('Erreur doublon' + ligne + '-' + col)
					
					// Ajouter une classe d'erreur au champs
					ajouterErreurChamp(ligne, col)
					
					pasErreurs = false; // Si une erreur est trouvée, définir pasErreurs à false
				} else {
					// Ajouter l'élément à une liste
					liste.add(valeur)
				}
			}
		}
	}
	
	let grilleComplete = true;
	for (const ligne of sudoku) {
		for (const valeur of ligne) {
			if (valeur === '') {
				grilleComplete = false;
				break;
			}
		}
		if (!grilleComplete) {
			break;
		}
	}
	

	// Vérifier si la grille est valide
	const grilleValide = isGrilleValide(sudoku);

	// Afficher le message approprié dans la fenêtre modale
	let modalMessage = '';
	if (grilleComplete) {
		if (pasErreurs) {
			modalMessage = 'Félicitations ! La grille est valide.';
		} else {
			modalMessage = 'Il y a des erreurs dans la grille.';
		}
	} else {
		modalMessage = 'La grille n\'est pas complète.';
	}
	openModal(modalMessage); // Déplacez cet appel à openModal ici, pour l'appeler uniquement lorsque le bouton de vérification est cliqué.
};

const openModal = (message) => {
	const modal = document.createElement('div');
	modal.classList.add('modal');

	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');

	const messageElement = document.createElement('p');
	messageElement.textContent = message;

	const closeButton = document.createElement('span');
	closeButton.textContent = 'Fermer';
	closeButton.classList.add('close-button');
	closeButton.addEventListener('click', closeModal);

	modalContent.appendChild(messageElement);
	modalContent.appendChild(closeButton);
	modal.appendChild(modalContent);
	document.body.appendChild(modal);
};

const closeModal = () => {
	const modal = document.querySelector('.modal');
		if (modal) {
			modal.remove();
		}
};