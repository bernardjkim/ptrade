import decode from 'jwt-decode';

export function getIdFromToken(token) {
  try {
    const { id } = decode(token);
    return id;
  } catch (err) {
    return false;
  }
}

export function getExpFromToken(token) {
  try {
    const { exp } = decode(token);
    return exp;
  } catch (err) {
    return false;
  }
}

export function getIatFromToken(token) {
  try {
    const { iat } = decode(token);
    return iat;
  } catch (err) {
    return false;
  }
}
