import { Token, Type } from './Token';

interface Pokemon {
    nombre: string;
    tipo: string;
    salud: number;
    ataque: number;
    defensa: number;
    ivs: number;
}

interface Jugador {
    nombre: string;
    pokemons: Pokemon[];
    topPokemons: Pokemon[];
}

export const processTokensOrigin = (tokens: Token[]): Jugador[] => {
    const jugadores: Jugador[] = [];
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];

        if (token['lexeme'] === 'Jugador') {
            const jugadorNombreToken = tokens[i + 2]; // Jugador: "Nombre"
            const jugadorNombre = jugadorNombreToken['lexeme'].replace(/"/g, '');
            const jugador: Jugador = {
                nombre: jugadorNombre,
                pokemons: [],
                topPokemons: []
            };

            i += 4; // Saltar hasta el primer Pokémon
            while (i < tokens.length && tokens[i]['lexeme'] !== '}') {
                if (tokens[i].typeToken === Type.STRING) {
                    const nombre = tokens[i]['lexeme'].replace(/"/g, '');
                    const tipo = tokens[i + 2]['lexeme'].replace(/[\[\]]/g, '');
                    const salud = parseInt(tokens[i + 10]['lexeme']);
                    const ataque = parseInt(tokens[i + 14]['lexeme']);
                    const defensa = parseInt(tokens[i + 18]['lexeme']);

                    const ivs = Math.round(((salud + ataque + defensa) / 45) * 100);

                    jugador.pokemons.push({
                        nombre,
                        tipo,
                        salud,
                        ataque,
                        defensa,
                        ivs
                    });

                    i += 20; // Avanza al siguiente pokémon
                } else {
                    i++;
                }
            }

            // Elegir los mejores 6
            jugador.topPokemons = jugador.pokemons
                .sort((a, b) => b.ivs - a.ivs)
                .slice(0, 6);

            jugadores.push(jugador);
        }

        i++;
    }

    return jugadores;
};

export const processTokens = (tokens: Token[]): Jugador[] => {
    const jugadores: Jugador[] = [];
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];

        if (token.lexeme === 'Jugador') {
            const jugadorNombreToken = tokens[i + 2];
            const jugadorNombre = jugadorNombreToken.lexeme.replace(/"/g, '');
            const jugador: Jugador = {
                nombre: jugadorNombre,
                pokemons: [],
                topPokemons: []
            };

            i += 4;

            while (i < tokens.length && tokens[i].lexeme !== '}') {
                if (tokens[i].typeToken === Type.STRING) {
                    const nombre = tokens[i].lexeme.replace(/"/g, '');
                    const tipo = tokens[i + 2]?.lexeme.replace(/[\[\]]/g, '') ?? 'desconocido';

                    let salud = 0, ataque = 0, defensa = 0;

                    let j = i;
                    while (j < tokens.length && tokens[j].lexeme !== '(') j++;
                    j++;

                    while (j < tokens.length && tokens[j].lexeme !== ')') {
                        if (
                            tokens[j]?.lexeme === '[' &&
                            tokens[j + 1] && typeof tokens[j + 1].lexeme === 'string' &&
                            tokens[j + 2]?.lexeme === ']' &&
                            tokens[j + 3]?.lexeme === '=' &&
                            tokens[j + 4]?.typeToken === Type.NUMBER
                        ) {
                            const key = tokens[j + 1].lexeme.toLowerCase();
                            const value = parseInt(tokens[j + 4].lexeme);

                            if (key === 'salud') salud = value;
                            else if (key === 'ataque') ataque = value;
                            else if (key === 'defensa') defensa = value;

                            j += 6; // skip to next stat
                        } else {
                            j++;
                        }
                    }

                    const ivs = Math.round(((salud + ataque + defensa) / 45) * 100);

                    jugador.pokemons.push({
                        nombre,
                        tipo,
                        salud,
                        ataque,
                        defensa,
                        ivs
                    });

                    i = j + 1;
                } else {
                    i++;
                }
            }

            jugador.topPokemons = jugador.pokemons
                .sort((a, b) => b.ivs - a.ivs)
                .slice(0, 6);

            jugadores.push(jugador);
        }

        i++;
    }

    return jugadores;
};