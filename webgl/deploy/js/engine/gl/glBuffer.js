"use strict";
var webglEngine;
(function (webglEngine) {
    /**
     * represents the information needed for a GLBuffer attribute
     */
    var AttributeInfo = /** @class */ (function () {
        function AttributeInfo() {
            // the location of this attribute
            this.location = 0;
            // the size (number of elements) in this attribute (i.e. vector3 = 3)
            this.size = 0;
            // the number of elements from the beginning of the buffer
            this.offset = 0;
        }
        return AttributeInfo;
    }());
    webglEngine.AttributeInfo = AttributeInfo;
    /**
     * represents a WebGLBuffer
     */
    var GLBuffer = /** @class */ (function () {
        /**
         * creates a new GL buffer
         * @param elementSize the size of each element in this buffer
         * @param dataType the data type of this buffer. Default: gl.FLOAT
         * @param targetBufferType the buffer target type. gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER. Default: gl.ARRAY_BUFFER
         * @param mode the drawing mode of this buffer (i.e. gl.TRIANGLES or gl.LINES). Default gl.TRIANGLES
         */
        function GLBuffer(elementSize, dataType, targetBufferType, mode) {
            if (dataType === void 0) { dataType = webglEngine.gl.FLOAT; }
            if (targetBufferType === void 0) { targetBufferType = webglEngine.gl.ARRAY_BUFFER; }
            if (mode === void 0) { mode = webglEngine.gl.TRIANGLES; }
            this._hasAttributeLocation = false;
            this._data = [];
            this._attributes = [];
            this._elementSize = elementSize;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;
            // determine byte size
            switch (this._dataType) {
                case webglEngine.gl.FLOAT:
                case webglEngine.gl.INT:
                case webglEngine.gl.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case webglEngine.gl.SHORT:
                case webglEngine.gl.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case webglEngine.gl.BYTE:
                case webglEngine.gl.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error("Unrecognized data type: " + this._dataType.toString());
            }
            this._stride = this._elementSize * this._typeSize;
            this._buffer = webglEngine.gl.createBuffer();
        }
        /**
         * destroys this buffer
         */
        GLBuffer.prototype.destroy = function () {
            webglEngine.gl.deleteBuffer(this._buffer);
        };
        /**
         * binds this buffer
         * @param normalized indicates if the data should be normalized. Default: false
         */
        GLBuffer.prototype.bind = function (normalized) {
            if (normalized === void 0) { normalized = false; }
            webglEngine.gl.bindBuffer(this._targetBufferType, this._buffer);
            if (this._hasAttributeLocation) {
                for (var _i = 0, _a = this._attributes; _i < _a.length; _i++) {
                    var it = _a[_i];
                    webglEngine.gl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stride, it.offset * this._typeSize);
                    webglEngine.gl.enableVertexAttribArray(it.location);
                }
            }
        };
        /**
         * unbinds this buffer
         */
        GLBuffer.prototype.unbind = function () {
            for (var _i = 0, _a = this._attributes; _i < _a.length; _i++) {
                var it = _a[_i];
                webglEngine.gl.disableVertexAttribArray(it.location);
            }
            webglEngine.gl.bindBuffer(this._targetBufferType, this._buffer);
        };
        /**
         * adds an attribute with the provided information to this buffer
         * @param info the information to be added
         */
        GLBuffer.prototype.addAttributeLocation = function (info) {
            this._hasAttributeLocation = true;
            this._attributes.push(info);
        };
        /**
         * adds data to this buffer
         * @param data
         */
        GLBuffer.prototype.pushBackData = function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                this._data.push(d);
            }
        };
        /**
         * uploads this buffer's data to the GPU
         */
        GLBuffer.prototype.upload = function () {
            webglEngine.gl.bindBuffer(this._targetBufferType, this._buffer);
            var bufferData;
            switch (this._dataType) {
                case webglEngine.gl.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case webglEngine.gl.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case webglEngine.gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case webglEngine.gl.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case webglEngine.gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case webglEngine.gl.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case webglEngine.gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
                default:
                    bufferData = new Float32Array(this._data);
            }
            webglEngine.gl.bufferData(this._targetBufferType, bufferData, webglEngine.gl.STATIC_DRAW);
        };
        /**
         * draws this buffer
         */
        GLBuffer.prototype.draw = function () {
            if (this._targetBufferType === webglEngine.gl.ARRAY_BUFFER) {
                webglEngine.gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
            }
            else if (this._targetBufferType === webglEngine.gl.ELEMENT_ARRAY_BUFFER) {
                webglEngine.gl.drawElements(this._mode, this._data.length, this._dataType, 0);
            }
        };
        return GLBuffer;
    }());
    webglEngine.GLBuffer = GLBuffer;
})(webglEngine || (webglEngine = {}));
