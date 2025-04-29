/**
 * Returns an RFC 4122–compliant UUID v4
 * Works in every modern browser and in legacy environments without crypto
 */
export function uuidv4() {
  let r = "";
  for (let i = 0; i < 32; i++) r += ((Math.random() * 16) | 0).toString(16);

  return (
    r.slice(0, 8) +
    "-" +
    r.slice(8, 12) +
    "-4" +
    r.slice(13, 16) +
    "-" + // force version 4
    ((parseInt(r[16], 16) & 0x3) | 0x8).toString(16) + // force variant 10
    r.slice(17, 20) +
    "-" +
    r.slice(20)
  );
}
