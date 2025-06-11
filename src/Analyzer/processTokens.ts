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

export const processTokens = (tokens: Token[]): Jugador[] => {
    const jugadores: Jugador[] = [];
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];
        if (token.getLexeme() === 'Jugador') {
            const jugadorNombreToken = tokens[i + 2];
            const jugadorNombre = jugadorNombreToken.getLexeme().replace(/"/g, '');
            const jugador: Jugador = {
                nombre: jugadorNombre,
                pokemons: [],
                topPokemons: []
            };
            i += 4;
            while (i < tokens.length && tokens[i].getLexeme() !== '}') {
                if (tokens[i].getType() === Type.STRING) {
                    const nombre = tokens[i].getLexeme().replace(/"/g, '');
                    const tipo = tokens[i + 2]?.getLexeme().replace(/[\[\]]/g, '') ?? 'desconocido';
                    let salud = 0, ataque = 0, defensa = 0;
                    let j = i;
                    while (j < tokens.length && tokens[j].getLexeme() !== '(') j++;
                    j++;
                    while (j < tokens.length && tokens[j].getLexeme() !== ')') {
                        if (
                            tokens[j]?.getLexeme() === '[' &&
                            tokens[j + 1] && typeof tokens[j + 1].getLexeme() === 'string' &&
                            tokens[j + 2]?.getLexeme() === ']' &&
                            tokens[j + 3]?.getLexeme() === '=' &&
                            tokens[j + 4]?.getType() === Type.NUMBER
                        ) {
                            const key = tokens[j + 1].getLexeme().toLowerCase();
                            const value = parseInt(tokens[j + 4].getLexeme());
                            if (key === 'salud') salud = value;
                            else if (key === 'ataque') ataque = value;
                            else if (key === 'defensa') defensa = value;
                            j += 6;
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