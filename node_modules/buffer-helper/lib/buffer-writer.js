var LF = "\n".charCodeAt(0)
  , CR = "\r".charCodeAt(0);

var BufferWriter = function(buffer) {
  this.buffer = buffer ? buffer : new Buffer(1024);
  this.cursor = 0;
}

BufferWriter.prototype.appendCRLF = function() {
  this.buffer.writeInt8(CR, this.cursor++);
  this.buffer.writeInt8(LF, this.cursor++);
}

BufferWriter.prototype.appendCar = function(car) {
  this.buffer.writeInt8(car, this.cursor++);
}

BufferWriter.prototype.appendBuffer = function(source) {
  source.copy(this.buffer, this.cursor);
  this.cursor += source.length;
}

BufferWriter.prototype.append = function(obj) {
  switch (typeof(obj)) {
  case 'object':
    if (Buffer.isBuffer(obj)) {
      this.appendBuffer(obj);
    } else if (Array.isArray(obj)){
      this.appendList(obj);
    }
    break;
  case 'number':
    this.appendCar(obj);
    break;
  }
}

BufferWriter.prototype.appendList = function(l) {
  for (var i = 0; i < l.length; i++) {
    this.append(l[i]);
  }
}

module.exports = BufferWriter;
