const MAGIC_NUMBER = 0xfb0bd1e5;
const SIZEOF_UINT32 = 4;
const HEADER_SIZE = 3;

class RamBundle {
  constructor(buffer) {
    this._buffer = buffer;

    if (this._readPosition(0) !== MAGIC_NUMBER) {
      throw new Error('File is not a RAM bundle file');
    }

    this._numModules = this._readPosition(1);
    this._startupCodeLength = this._readPosition(2);

    // The startup code begins after the table of contents, which contains the
    // 3 fields on the header plus 2 entries per module.
    this._startOffset = (HEADER_SIZE + this._numModules * 2) * SIZEOF_UINT32;
  }

  _readPosition(pos) {
    return this._buffer.readUInt32LE(pos * SIZEOF_UINT32);
  }

  getStartupCode() {
    const start = this._startOffset;
    const end = start + this._startupCodeLength - 1;

    return this._buffer.toString('utf8', start, end);
  }

  getModule(id) {
    const moduleOffset = this._readPosition(HEADER_SIZE + id * 2);
    const moduleLength = this._readPosition(HEADER_SIZE + id * 2 + 1);

    const start = this._startOffset + moduleOffset;
    const end = start + moduleLength - 1;

    return this._buffer.toString('utf8', start, end);
  }

  getHeader() {
    return this._buffer.slice(0, this._startOffset);
  }

  getBody() {
    return this._buffer.slice(this._startOffset);
  }

  getNumModules() {
    return this._numModules;
  }

  replaceModule(id, module) {
    const moduleOffset = this._startOffset + this._readPosition(HEADER_SIZE + id * 2);
    const newModuleLength = module.length;
    this._buffer.write(module, moduleOffset, 'utf8');
    this._buffer.writeInt8(0, moduleOffset + newModuleLength);
    this._buffer.writeUInt32LE(newModuleLength, HEADER_SIZE + id * 2 + 1);
  }

  addModule(module) {
    this._buffer.writeUInt32LE(this._numModules + 1, SIZEOF_UINT32);

    let header = this.getHeader();
    let body = this.getBody();

    const oldHeaderLength = header.length;
    const oldBodyLength = body.length;

    header = Buffer.alloc(oldHeaderLength + SIZEOF_UINT32 * 2, header);

    header.writeUInt32LE(body.length, oldHeaderLength);
    header.writeUInt32LE(module.length, oldHeaderLength + SIZEOF_UINT32);

    body = Buffer.alloc(oldBodyLength + module.length + 1, body);
    body.write(module, oldBodyLength, 'utf8');
    body.writeInt8(0, body.length - 1);

    return {header, body};
  }
}

module.exports = RamBundle;
