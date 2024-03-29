function $parcel$export(e, n, v, s) {
    Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
  }
  var $fc1204d3bb8e8da9$exports = {};
  
  $parcel$export($fc1204d3bb8e8da9$exports, "Selection", () => $fc1204d3bb8e8da9$export$52baac22726c72bf);
  $parcel$export($fc1204d3bb8e8da9$exports, "SelectionRange", () => $fc1204d3bb8e8da9$export$7bd1839c3c5d5bd4);
  $parcel$export($fc1204d3bb8e8da9$exports, "TextSelection", () => $fc1204d3bb8e8da9$export$c2b25f346d19bcbb);
  $parcel$export($fc1204d3bb8e8da9$exports, "AllSelection", () => $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95);
  $parcel$export($fc1204d3bb8e8da9$exports, "NodeSelection", () => $fc1204d3bb8e8da9$export$e2940151ac854c0b);
  $parcel$export($fc1204d3bb8e8da9$exports, "Transaction", () => $fc1204d3bb8e8da9$export$febc5573c75cefb0);
  $parcel$export($fc1204d3bb8e8da9$exports, "EditorState", () => $fc1204d3bb8e8da9$export$afa855cbfaff27f2);
  $parcel$export($fc1204d3bb8e8da9$exports, "Plugin", () => $fc1204d3bb8e8da9$export$901cf72dabf2112a);
  $parcel$export($fc1204d3bb8e8da9$exports, "PluginKey", () => $fc1204d3bb8e8da9$export$1692d8b0e89cecc3);
  var $59526ec4d3b41406$exports = {};
  
  $parcel$export($59526ec4d3b41406$exports, "Fragment", () => $59526ec4d3b41406$export$ffb0004e005737fa);
  $parcel$export($59526ec4d3b41406$exports, "Mark", () => $59526ec4d3b41406$export$c9d15bcfc6d42044);
  $parcel$export($59526ec4d3b41406$exports, "ReplaceError", () => $59526ec4d3b41406$export$6de0e778727af3f2);
  $parcel$export($59526ec4d3b41406$exports, "Slice", () => $59526ec4d3b41406$export$b3f2e2de3a8baa1e);
  $parcel$export($59526ec4d3b41406$exports, "ResolvedPos", () => $59526ec4d3b41406$export$b2a42f82e59e4b19);
  $parcel$export($59526ec4d3b41406$exports, "NodeRange", () => $59526ec4d3b41406$export$7bc461ceb770fb16);
  $parcel$export($59526ec4d3b41406$exports, "Node", () => $59526ec4d3b41406$export$85c928794f8d04d4);
  $parcel$export($59526ec4d3b41406$exports, "ContentMatch", () => $59526ec4d3b41406$export$364ed450558d7ec4);
  $parcel$export($59526ec4d3b41406$exports, "NodeType", () => $59526ec4d3b41406$export$f06e977173f1857c);
  $parcel$export($59526ec4d3b41406$exports, "MarkType", () => $59526ec4d3b41406$export$b6a78689043c6521);
  $parcel$export($59526ec4d3b41406$exports, "Schema", () => $59526ec4d3b41406$export$19342e026b58ebb7);
  $parcel$export($59526ec4d3b41406$exports, "DOMParser", () => $59526ec4d3b41406$export$1059c6e7d2ce5669);
  $parcel$export($59526ec4d3b41406$exports, "DOMSerializer", () => $59526ec4d3b41406$export$3476b78f8f5a8b72);
  // ::- Persistent data structure representing an ordered mapping from
  // strings to values, with some convenient update methods.
  function $a48802960d5588da$var$OrderedMap(content) {
      this.content = content;
  }
  $a48802960d5588da$var$OrderedMap.prototype = {
      constructor: $a48802960d5588da$var$OrderedMap,
      find: function(key) {
          for(var i = 0; i < this.content.length; i += 2)if (this.content[i] === key) return i;
          return -1;
      },
      // :: (string) → ?any
      // Retrieve the value stored under `key`, or return undefined when
      // no such key exists.
      get: function(key) {
          var found = this.find(key);
          return found == -1 ? undefined : this.content[found + 1];
      },
      // :: (string, any, ?string) → OrderedMap
      // Create a new map by replacing the value of `key` with a new
      // value, or adding a binding to the end of the map. If `newKey` is
      // given, the key of the binding will be replaced with that key.
      update: function(key, value, newKey) {
          var self = newKey && newKey != key ? this.remove(newKey) : this;
          var found = self.find(key), content = self.content.slice();
          if (found == -1) content.push(newKey || key, value);
          else {
              content[found + 1] = value;
              if (newKey) content[found] = newKey;
          }
          return new $a48802960d5588da$var$OrderedMap(content);
      },
      // :: (string) → OrderedMap
      // Return a map with the given key removed, if it existed.
      remove: function(key) {
          var found = this.find(key);
          if (found == -1) return this;
          var content = this.content.slice();
          content.splice(found, 2);
          return new $a48802960d5588da$var$OrderedMap(content);
      },
      // :: (string, any) → OrderedMap
      // Add a new key to the start of the map.
      addToStart: function(key, value) {
          return new $a48802960d5588da$var$OrderedMap([
              key,
              value
          ].concat(this.remove(key).content));
      },
      // :: (string, any) → OrderedMap
      // Add a new key to the end of the map.
      addToEnd: function(key, value) {
          var content = this.remove(key).content.slice();
          content.push(key, value);
          return new $a48802960d5588da$var$OrderedMap(content);
      },
      // :: (string, string, any) → OrderedMap
      // Add a key after the given key. If `place` is not found, the new
      // key is added to the end.
      addBefore: function(place, key, value) {
          var without = this.remove(key), content = without.content.slice();
          var found = without.find(place);
          content.splice(found == -1 ? content.length : found, 0, key, value);
          return new $a48802960d5588da$var$OrderedMap(content);
      },
      // :: ((key: string, value: any))
      // Call the given function for each key/value pair in the map, in
      // order.
      forEach: function(f) {
          for(var i = 0; i < this.content.length; i += 2)f(this.content[i], this.content[i + 1]);
      },
      // :: (union<Object, OrderedMap>) → OrderedMap
      // Create a new map by prepending the keys in this map that don't
      // appear in `map` before the keys in `map`.
      prepend: function(map) {
          map = $a48802960d5588da$var$OrderedMap.from(map);
          if (!map.size) return this;
          return new $a48802960d5588da$var$OrderedMap(map.content.concat(this.subtract(map).content));
      },
      // :: (union<Object, OrderedMap>) → OrderedMap
      // Create a new map by appending the keys in this map that don't
      // appear in `map` after the keys in `map`.
      append: function(map) {
          map = $a48802960d5588da$var$OrderedMap.from(map);
          if (!map.size) return this;
          return new $a48802960d5588da$var$OrderedMap(this.subtract(map).content.concat(map.content));
      },
      // :: (union<Object, OrderedMap>) → OrderedMap
      // Create a map containing all the keys in this map that don't
      // appear in `map`.
      subtract: function(map) {
          var result = this;
          map = $a48802960d5588da$var$OrderedMap.from(map);
          for(var i = 0; i < map.content.length; i += 2)result = result.remove(map.content[i]);
          return result;
      },
      // :: () → Object
      // Turn ordered map into a plain object.
      toObject: function() {
          var result = {};
          this.forEach(function(key, value) {
              result[key] = value;
          });
          return result;
      },
      // :: number
      // The amount of keys in this map.
      get size () {
          return this.content.length >> 1;
      }
  };
  // :: (?union<Object, OrderedMap>) → OrderedMap
  // Return a map with the given content. If null, create an empty
  // map. If given an ordered map, return that map itself. If given an
  // object, create a map from the object's properties.
  $a48802960d5588da$var$OrderedMap.from = function(value) {
      if (value instanceof $a48802960d5588da$var$OrderedMap) return value;
      var content = [];
      if (value) for(var prop in value)content.push(prop, value[prop]);
      return new $a48802960d5588da$var$OrderedMap(content);
  };
  var $a48802960d5588da$export$2e2bcd8739ae039 = $a48802960d5588da$var$OrderedMap;
  
  
  function $59526ec4d3b41406$var$findDiffStart(a, b, pos) {
      for(let i = 0;; i++){
          if (i == a.childCount || i == b.childCount) return a.childCount == b.childCount ? null : pos;
          let childA = a.child(i), childB = b.child(i);
          if (childA == childB) {
              pos += childA.nodeSize;
              continue;
          }
          if (!childA.sameMarkup(childB)) return pos;
          if (childA.isText && childA.text != childB.text) {
              for(let j = 0; childA.text[j] == childB.text[j]; j++)pos++;
              return pos;
          }
          if (childA.content.size || childB.content.size) {
              let inner = $59526ec4d3b41406$var$findDiffStart(childA.content, childB.content, pos + 1);
              if (inner != null) return inner;
          }
          pos += childA.nodeSize;
      }
  }
  function $59526ec4d3b41406$var$findDiffEnd(a, b, posA, posB) {
      for(let iA = a.childCount, iB = b.childCount;;){
          if (iA == 0 || iB == 0) return iA == iB ? null : {
              a: posA,
              b: posB
          };
          let childA = a.child(--iA), childB = b.child(--iB), size = childA.nodeSize;
          if (childA == childB) {
              posA -= size;
              posB -= size;
              continue;
          }
          if (!childA.sameMarkup(childB)) return {
              a: posA,
              b: posB
          };
          if (childA.isText && childA.text != childB.text) {
              let same = 0, minSize = Math.min(childA.text.length, childB.text.length);
              while(same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]){
                  same++;
                  posA--;
                  posB--;
              }
              return {
                  a: posA,
                  b: posB
              };
          }
          if (childA.content.size || childB.content.size) {
              let inner = $59526ec4d3b41406$var$findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
              if (inner) return inner;
          }
          posA -= size;
          posB -= size;
      }
  }
  /**
  A fragment represents a node's collection of child nodes.
  
  Like nodes, fragments are persistent data structures, and you
  should not mutate them or their content. Rather, you create new
  instances whenever needed. The API tries to make this easy.
  */ class $59526ec4d3b41406$export$ffb0004e005737fa {
      /**
      @internal
      */ constructor(/**
      @internal
      */ content, size){
          this.content = content;
          this.size = size || 0;
          if (size == null) for(let i = 0; i < content.length; i++)this.size += content[i].nodeSize;
      }
      /**
      Invoke a callback for all descendant nodes between the given two
      positions (relative to start of this fragment). Doesn't descend
      into a node when the callback returns `false`.
      */ nodesBetween(from, to, f, nodeStart = 0, parent) {
          for(let i = 0, pos = 0; pos < to; i++){
              let child = this.content[i], end = pos + child.nodeSize;
              if (end > from && f(child, nodeStart + pos, parent || null, i) !== false && child.content.size) {
                  let start = pos + 1;
                  child.nodesBetween(Math.max(0, from - start), Math.min(child.content.size, to - start), f, nodeStart + start);
              }
              pos = end;
          }
      }
      /**
      Call the given callback for every descendant node. `pos` will be
      relative to the start of the fragment. The callback may return
      `false` to prevent traversal of a given node's children.
      */ descendants(f) {
          this.nodesBetween(0, this.size, f);
      }
      /**
      Extract the text between `from` and `to`. See the same method on
      [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
      */ textBetween(from, to, blockSeparator, leafText) {
          let text = "", separated = true;
          this.nodesBetween(from, to, (node, pos)=>{
              if (node.isText) {
                  text += node.text.slice(Math.max(from, pos) - pos, to - pos);
                  separated = !blockSeparator;
              } else if (node.isLeaf) {
                  if (leafText) text += typeof leafText === "function" ? leafText(node) : leafText;
                  else if (node.type.spec.leafText) text += node.type.spec.leafText(node);
                  separated = !blockSeparator;
              } else if (!separated && node.isBlock) {
                  text += blockSeparator;
                  separated = true;
              }
          }, 0);
          return text;
      }
      /**
      Create a new fragment containing the combined content of this
      fragment and the other.
      */ append(other) {
          if (!other.size) return this;
          if (!this.size) return other;
          let last = this.lastChild, first = other.firstChild, content = this.content.slice(), i = 0;
          if (last.isText && last.sameMarkup(first)) {
              content[content.length - 1] = last.withText(last.text + first.text);
              i = 1;
          }
          for(; i < other.content.length; i++)content.push(other.content[i]);
          return new $59526ec4d3b41406$export$ffb0004e005737fa(content, this.size + other.size);
      }
      /**
      Cut out the sub-fragment between the two given positions.
      */ cut(from, to = this.size) {
          if (from == 0 && to == this.size) return this;
          let result = [], size = 0;
          if (to > from) for(let i = 0, pos = 0; pos < to; i++){
              let child = this.content[i], end = pos + child.nodeSize;
              if (end > from) {
                  if (pos < from || end > to) {
                      if (child.isText) child = child.cut(Math.max(0, from - pos), Math.min(child.text.length, to - pos));
                      else child = child.cut(Math.max(0, from - pos - 1), Math.min(child.content.size, to - pos - 1));
                  }
                  result.push(child);
                  size += child.nodeSize;
              }
              pos = end;
          }
          return new $59526ec4d3b41406$export$ffb0004e005737fa(result, size);
      }
      /**
      @internal
      */ cutByIndex(from, to) {
          if (from == to) return $59526ec4d3b41406$export$ffb0004e005737fa.empty;
          if (from == 0 && to == this.content.length) return this;
          return new $59526ec4d3b41406$export$ffb0004e005737fa(this.content.slice(from, to));
      }
      /**
      Create a new fragment in which the node at the given index is
      replaced by the given node.
      */ replaceChild(index, node) {
          let current = this.content[index];
          if (current == node) return this;
          let copy = this.content.slice();
          let size = this.size + node.nodeSize - current.nodeSize;
          copy[index] = node;
          return new $59526ec4d3b41406$export$ffb0004e005737fa(copy, size);
      }
      /**
      Create a new fragment by prepending the given node to this
      fragment.
      */ addToStart(node) {
          return new $59526ec4d3b41406$export$ffb0004e005737fa([
              node
          ].concat(this.content), this.size + node.nodeSize);
      }
      /**
      Create a new fragment by appending the given node to this
      fragment.
      */ addToEnd(node) {
          return new $59526ec4d3b41406$export$ffb0004e005737fa(this.content.concat(node), this.size + node.nodeSize);
      }
      /**
      Compare this fragment to another one.
      */ eq(other) {
          if (this.content.length != other.content.length) return false;
          for(let i = 0; i < this.content.length; i++)if (!this.content[i].eq(other.content[i])) return false;
          return true;
      }
      /**
      The first child of the fragment, or `null` if it is empty.
      */ get firstChild() {
          return this.content.length ? this.content[0] : null;
      }
      /**
      The last child of the fragment, or `null` if it is empty.
      */ get lastChild() {
          return this.content.length ? this.content[this.content.length - 1] : null;
      }
      /**
      The number of child nodes in this fragment.
      */ get childCount() {
          return this.content.length;
      }
      /**
      Get the child node at the given index. Raise an error when the
      index is out of range.
      */ child(index) {
          let found = this.content[index];
          if (!found) throw new RangeError("Index " + index + " out of range for " + this);
          return found;
      }
      /**
      Get the child node at the given index, if it exists.
      */ maybeChild(index) {
          return this.content[index] || null;
      }
      /**
      Call `f` for every child node, passing the node, its offset
      into this parent node, and its index.
      */ forEach(f) {
          for(let i = 0, p = 0; i < this.content.length; i++){
              let child = this.content[i];
              f(child, p, i);
              p += child.nodeSize;
          }
      }
      /**
      Find the first position at which this fragment and another
      fragment differ, or `null` if they are the same.
      */ findDiffStart(other, pos = 0) {
          return $59526ec4d3b41406$var$findDiffStart(this, other, pos);
      }
      /**
      Find the first position, searching from the end, at which this
      fragment and the given fragment differ, or `null` if they are
      the same. Since this position will not be the same in both
      nodes, an object with two separate positions is returned.
      */ findDiffEnd(other, pos = this.size, otherPos = other.size) {
          return $59526ec4d3b41406$var$findDiffEnd(this, other, pos, otherPos);
      }
      /**
      Find the index and inner offset corresponding to a given relative
      position in this fragment. The result object will be reused
      (overwritten) the next time the function is called. (Not public.)
      */ findIndex(pos, round = -1) {
          if (pos == 0) return $59526ec4d3b41406$var$retIndex(0, pos);
          if (pos == this.size) return $59526ec4d3b41406$var$retIndex(this.content.length, pos);
          if (pos > this.size || pos < 0) throw new RangeError(`Position ${pos} outside of fragment (${this})`);
          for(let i = 0, curPos = 0;; i++){
              let cur = this.child(i), end = curPos + cur.nodeSize;
              if (end >= pos) {
                  if (end == pos || round > 0) return $59526ec4d3b41406$var$retIndex(i + 1, end);
                  return $59526ec4d3b41406$var$retIndex(i, curPos);
              }
              curPos = end;
          }
      }
      /**
      Return a debugging string that describes this fragment.
      */ toString() {
          return "<" + this.toStringInner() + ">";
      }
      /**
      @internal
      */ toStringInner() {
          return this.content.join(", ");
      }
      /**
      Create a JSON-serializeable representation of this fragment.
      */ toJSON() {
          return this.content.length ? this.content.map((n)=>n.toJSON()) : null;
      }
      /**
      Deserialize a fragment from its JSON representation.
      */ static fromJSON(schema, value) {
          if (!value) return $59526ec4d3b41406$export$ffb0004e005737fa.empty;
          if (!Array.isArray(value)) throw new RangeError("Invalid input for Fragment.fromJSON");
          return new $59526ec4d3b41406$export$ffb0004e005737fa(value.map(schema.nodeFromJSON));
      }
      /**
      Build a fragment from an array of nodes. Ensures that adjacent
      text nodes with the same marks are joined together.
      */ static fromArray(array) {
          if (!array.length) return $59526ec4d3b41406$export$ffb0004e005737fa.empty;
          let joined, size = 0;
          for(let i = 0; i < array.length; i++){
              let node = array[i];
              size += node.nodeSize;
              if (i && node.isText && array[i - 1].sameMarkup(node)) {
                  if (!joined) joined = array.slice(0, i);
                  joined[joined.length - 1] = node.withText(joined[joined.length - 1].text + node.text);
              } else if (joined) joined.push(node);
          }
          return new $59526ec4d3b41406$export$ffb0004e005737fa(joined || array, size);
      }
      /**
      Create a fragment from something that can be interpreted as a
      set of nodes. For `null`, it returns the empty fragment. For a
      fragment, the fragment itself. For a node or array of nodes, a
      fragment containing those nodes.
      */ static from(nodes) {
          if (!nodes) return $59526ec4d3b41406$export$ffb0004e005737fa.empty;
          if (nodes instanceof $59526ec4d3b41406$export$ffb0004e005737fa) return nodes;
          if (Array.isArray(nodes)) return this.fromArray(nodes);
          if (nodes.attrs) return new $59526ec4d3b41406$export$ffb0004e005737fa([
              nodes
          ], nodes.nodeSize);
          throw new RangeError("Can not convert " + nodes + " to a Fragment" + (nodes.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
      }
  }
  /**
  An empty fragment. Intended to be reused whenever a node doesn't
  contain anything (rather than allocating a new empty fragment for
  each leaf node).
  */ $59526ec4d3b41406$export$ffb0004e005737fa.empty = new $59526ec4d3b41406$export$ffb0004e005737fa([], 0);
  const $59526ec4d3b41406$var$found = {
      index: 0,
      offset: 0
  };
  function $59526ec4d3b41406$var$retIndex(index, offset) {
      $59526ec4d3b41406$var$found.index = index;
      $59526ec4d3b41406$var$found.offset = offset;
      return $59526ec4d3b41406$var$found;
  }
  function $59526ec4d3b41406$var$compareDeep(a, b) {
      if (a === b) return true;
      if (!(a && typeof a == "object") || !(b && typeof b == "object")) return false;
      let array = Array.isArray(a);
      if (Array.isArray(b) != array) return false;
      if (array) {
          if (a.length != b.length) return false;
          for(let i = 0; i < a.length; i++)if (!$59526ec4d3b41406$var$compareDeep(a[i], b[i])) return false;
      } else {
          for(let p in a)if (!(p in b) || !$59526ec4d3b41406$var$compareDeep(a[p], b[p])) return false;
          for(let p in b)if (!(p in a)) return false;
      }
      return true;
  }
  /**
  A mark is a piece of information that can be attached to a node,
  such as it being emphasized, in code font, or a link. It has a
  type and optionally a set of attributes that provide further
  information (such as the target of the link). Marks are created
  through a `Schema`, which controls which types exist and which
  attributes they have.
  */ class $59526ec4d3b41406$export$c9d15bcfc6d42044 {
      /**
      @internal
      */ constructor(/**
      The type of this mark.
      */ type, /**
      The attributes associated with this mark.
      */ attrs){
          this.type = type;
          this.attrs = attrs;
      }
      /**
      Given a set of marks, create a new set which contains this one as
      well, in the right position. If this mark is already in the set,
      the set itself is returned. If any marks that are set to be
      [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
      those are replaced by this one.
      */ addToSet(set) {
          let copy, placed = false;
          for(let i = 0; i < set.length; i++){
              let other = set[i];
              if (this.eq(other)) return set;
              if (this.type.excludes(other.type)) {
                  if (!copy) copy = set.slice(0, i);
              } else if (other.type.excludes(this.type)) return set;
              else {
                  if (!placed && other.type.rank > this.type.rank) {
                      if (!copy) copy = set.slice(0, i);
                      copy.push(this);
                      placed = true;
                  }
                  if (copy) copy.push(other);
              }
          }
          if (!copy) copy = set.slice();
          if (!placed) copy.push(this);
          return copy;
      }
      /**
      Remove this mark from the given set, returning a new set. If this
      mark is not in the set, the set itself is returned.
      */ removeFromSet(set) {
          for(let i = 0; i < set.length; i++)if (this.eq(set[i])) return set.slice(0, i).concat(set.slice(i + 1));
          return set;
      }
      /**
      Test whether this mark is in the given set of marks.
      */ isInSet(set) {
          for(let i = 0; i < set.length; i++)if (this.eq(set[i])) return true;
          return false;
      }
      /**
      Test whether this mark has the same type and attributes as
      another mark.
      */ eq(other) {
          return this == other || this.type == other.type && $59526ec4d3b41406$var$compareDeep(this.attrs, other.attrs);
      }
      /**
      Convert this mark to a JSON-serializeable representation.
      */ toJSON() {
          let obj = {
              type: this.type.name
          };
          for(let _ in this.attrs){
              obj.attrs = this.attrs;
              break;
          }
          return obj;
      }
      /**
      Deserialize a mark from JSON.
      */ static fromJSON(schema, json) {
          if (!json) throw new RangeError("Invalid input for Mark.fromJSON");
          let type = schema.marks[json.type];
          if (!type) throw new RangeError(`There is no mark type ${json.type} in this schema`);
          return type.create(json.attrs);
      }
      /**
      Test whether two sets of marks are identical.
      */ static sameSet(a, b) {
          if (a == b) return true;
          if (a.length != b.length) return false;
          for(let i = 0; i < a.length; i++)if (!a[i].eq(b[i])) return false;
          return true;
      }
      /**
      Create a properly sorted mark set from null, a single mark, or an
      unsorted array of marks.
      */ static setFrom(marks) {
          if (!marks || Array.isArray(marks) && marks.length == 0) return $59526ec4d3b41406$export$c9d15bcfc6d42044.none;
          if (marks instanceof $59526ec4d3b41406$export$c9d15bcfc6d42044) return [
              marks
          ];
          let copy = marks.slice();
          copy.sort((a, b)=>a.type.rank - b.type.rank);
          return copy;
      }
  }
  /**
  The empty set of marks.
  */ $59526ec4d3b41406$export$c9d15bcfc6d42044.none = [];
  /**
  Error type raised by [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) when
  given an invalid replacement.
  */ class $59526ec4d3b41406$export$6de0e778727af3f2 extends Error {
  }
  /*
  ReplaceError = function(this: any, message: string) {
    let err = Error.call(this, message)
    ;(err as any).__proto__ = ReplaceError.prototype
    return err
  } as any
  
  ReplaceError.prototype = Object.create(Error.prototype)
  ReplaceError.prototype.constructor = ReplaceError
  ReplaceError.prototype.name = "ReplaceError"
  */ /**
  A slice represents a piece cut out of a larger document. It
  stores not only a fragment, but also the depth up to which nodes on
  both side are ‘open’ (cut through).
  */ class $59526ec4d3b41406$export$b3f2e2de3a8baa1e {
      /**
      Create a slice. When specifying a non-zero open depth, you must
      make sure that there are nodes of at least that depth at the
      appropriate side of the fragment—i.e. if the fragment is an
      empty paragraph node, `openStart` and `openEnd` can't be greater
      than 1.
      
      It is not necessary for the content of open nodes to conform to
      the schema's content constraints, though it should be a valid
      start/end/middle for such a node, depending on which sides are
      open.
      */ constructor(/**
      The slice's content.
      */ content, /**
      The open depth at the start of the fragment.
      */ openStart, /**
      The open depth at the end.
      */ openEnd){
          this.content = content;
          this.openStart = openStart;
          this.openEnd = openEnd;
      }
      /**
      The size this slice would add when inserted into a document.
      */ get size() {
          return this.content.size - this.openStart - this.openEnd;
      }
      /**
      @internal
      */ insertAt(pos, fragment) {
          let content = $59526ec4d3b41406$var$insertInto(this.content, pos + this.openStart, fragment);
          return content && new $59526ec4d3b41406$export$b3f2e2de3a8baa1e(content, this.openStart, this.openEnd);
      }
      /**
      @internal
      */ removeBetween(from, to) {
          return new $59526ec4d3b41406$export$b3f2e2de3a8baa1e($59526ec4d3b41406$var$removeRange(this.content, from + this.openStart, to + this.openStart), this.openStart, this.openEnd);
      }
      /**
      Tests whether this slice is equal to another slice.
      */ eq(other) {
          return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
      }
      /**
      @internal
      */ toString() {
          return this.content + "(" + this.openStart + "," + this.openEnd + ")";
      }
      /**
      Convert a slice to a JSON-serializable representation.
      */ toJSON() {
          if (!this.content.size) return null;
          let json = {
              content: this.content.toJSON()
          };
          if (this.openStart > 0) json.openStart = this.openStart;
          if (this.openEnd > 0) json.openEnd = this.openEnd;
          return json;
      }
      /**
      Deserialize a slice from its JSON representation.
      */ static fromJSON(schema, json) {
          if (!json) return $59526ec4d3b41406$export$b3f2e2de3a8baa1e.empty;
          let openStart = json.openStart || 0, openEnd = json.openEnd || 0;
          if (typeof openStart != "number" || typeof openEnd != "number") throw new RangeError("Invalid input for Slice.fromJSON");
          return new $59526ec4d3b41406$export$b3f2e2de3a8baa1e($59526ec4d3b41406$export$ffb0004e005737fa.fromJSON(schema, json.content), openStart, openEnd);
      }
      /**
      Create a slice from a fragment by taking the maximum possible
      open value on both side of the fragment.
      */ static maxOpen(fragment, openIsolating = true) {
          let openStart = 0, openEnd = 0;
          for(let n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild)openStart++;
          for(let n = fragment.lastChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.lastChild)openEnd++;
          return new $59526ec4d3b41406$export$b3f2e2de3a8baa1e(fragment, openStart, openEnd);
      }
  }
  /**
  The empty slice.
  */ $59526ec4d3b41406$export$b3f2e2de3a8baa1e.empty = new $59526ec4d3b41406$export$b3f2e2de3a8baa1e($59526ec4d3b41406$export$ffb0004e005737fa.empty, 0, 0);
  function $59526ec4d3b41406$var$removeRange(content, from, to) {
      let { index: index, offset: offset } = content.findIndex(from), child = content.maybeChild(index);
      let { index: indexTo, offset: offsetTo } = content.findIndex(to);
      if (offset == from || child.isText) {
          if (offsetTo != to && !content.child(indexTo).isText) throw new RangeError("Removing non-flat range");
          return content.cut(0, from).append(content.cut(to));
      }
      if (index != indexTo) throw new RangeError("Removing non-flat range");
      return content.replaceChild(index, child.copy($59526ec4d3b41406$var$removeRange(child.content, from - offset - 1, to - offset - 1)));
  }
  function $59526ec4d3b41406$var$insertInto(content, dist, insert, parent) {
      let { index: index, offset: offset } = content.findIndex(dist), child = content.maybeChild(index);
      if (offset == dist || child.isText) {
          if (parent && !parent.canReplace(index, index, insert)) return null;
          return content.cut(0, dist).append(insert).append(content.cut(dist));
      }
      let inner = $59526ec4d3b41406$var$insertInto(child.content, dist - offset - 1, insert);
      return inner && content.replaceChild(index, child.copy(inner));
  }
  function $59526ec4d3b41406$var$replace($from, $to, slice) {
      if (slice.openStart > $from.depth) throw new $59526ec4d3b41406$export$6de0e778727af3f2("Inserted content deeper than insertion position");
      if ($from.depth - slice.openStart != $to.depth - slice.openEnd) throw new $59526ec4d3b41406$export$6de0e778727af3f2("Inconsistent open depths");
      return $59526ec4d3b41406$var$replaceOuter($from, $to, slice, 0);
  }
  function $59526ec4d3b41406$var$replaceOuter($from, $to, slice, depth) {
      let index = $from.index(depth), node = $from.node(depth);
      if (index == $to.index(depth) && depth < $from.depth - slice.openStart) {
          let inner = $59526ec4d3b41406$var$replaceOuter($from, $to, slice, depth + 1);
          return node.copy(node.content.replaceChild(index, inner));
      } else if (!slice.content.size) return $59526ec4d3b41406$var$close(node, $59526ec4d3b41406$var$replaceTwoWay($from, $to, depth));
      else if (!slice.openStart && !slice.openEnd && $from.depth == depth && $to.depth == depth) {
          let parent = $from.parent, content = parent.content;
          return $59526ec4d3b41406$var$close(parent, content.cut(0, $from.parentOffset).append(slice.content).append(content.cut($to.parentOffset)));
      } else {
          let { start: start, end: end } = $59526ec4d3b41406$var$prepareSliceForReplace(slice, $from);
          return $59526ec4d3b41406$var$close(node, $59526ec4d3b41406$var$replaceThreeWay($from, start, end, $to, depth));
      }
  }
  function $59526ec4d3b41406$var$checkJoin(main, sub) {
      if (!sub.type.compatibleContent(main.type)) throw new $59526ec4d3b41406$export$6de0e778727af3f2("Cannot join " + sub.type.name + " onto " + main.type.name);
  }
  function $59526ec4d3b41406$var$joinable($before, $after, depth) {
      let node = $before.node(depth);
      $59526ec4d3b41406$var$checkJoin(node, $after.node(depth));
      return node;
  }
  function $59526ec4d3b41406$var$addNode(child, target) {
      let last = target.length - 1;
      if (last >= 0 && child.isText && child.sameMarkup(target[last])) target[last] = child.withText(target[last].text + child.text);
      else target.push(child);
  }
  function $59526ec4d3b41406$var$addRange($start, $end, depth, target) {
      let node = ($end || $start).node(depth);
      let startIndex = 0, endIndex = $end ? $end.index(depth) : node.childCount;
      if ($start) {
          startIndex = $start.index(depth);
          if ($start.depth > depth) startIndex++;
          else if ($start.textOffset) {
              $59526ec4d3b41406$var$addNode($start.nodeAfter, target);
              startIndex++;
          }
      }
      for(let i = startIndex; i < endIndex; i++)$59526ec4d3b41406$var$addNode(node.child(i), target);
      if ($end && $end.depth == depth && $end.textOffset) $59526ec4d3b41406$var$addNode($end.nodeBefore, target);
  }
  function $59526ec4d3b41406$var$close(node, content) {
      node.type.checkContent(content);
      return node.copy(content);
  }
  function $59526ec4d3b41406$var$replaceThreeWay($from, $start, $end, $to, depth) {
      let openStart = $from.depth > depth && $59526ec4d3b41406$var$joinable($from, $start, depth + 1);
      let openEnd = $to.depth > depth && $59526ec4d3b41406$var$joinable($end, $to, depth + 1);
      let content = [];
      $59526ec4d3b41406$var$addRange(null, $from, depth, content);
      if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
          $59526ec4d3b41406$var$checkJoin(openStart, openEnd);
          $59526ec4d3b41406$var$addNode($59526ec4d3b41406$var$close(openStart, $59526ec4d3b41406$var$replaceThreeWay($from, $start, $end, $to, depth + 1)), content);
      } else {
          if (openStart) $59526ec4d3b41406$var$addNode($59526ec4d3b41406$var$close(openStart, $59526ec4d3b41406$var$replaceTwoWay($from, $start, depth + 1)), content);
          $59526ec4d3b41406$var$addRange($start, $end, depth, content);
          if (openEnd) $59526ec4d3b41406$var$addNode($59526ec4d3b41406$var$close(openEnd, $59526ec4d3b41406$var$replaceTwoWay($end, $to, depth + 1)), content);
      }
      $59526ec4d3b41406$var$addRange($to, null, depth, content);
      return new $59526ec4d3b41406$export$ffb0004e005737fa(content);
  }
  function $59526ec4d3b41406$var$replaceTwoWay($from, $to, depth) {
      let content = [];
      $59526ec4d3b41406$var$addRange(null, $from, depth, content);
      if ($from.depth > depth) {
          let type = $59526ec4d3b41406$var$joinable($from, $to, depth + 1);
          $59526ec4d3b41406$var$addNode($59526ec4d3b41406$var$close(type, $59526ec4d3b41406$var$replaceTwoWay($from, $to, depth + 1)), content);
      }
      $59526ec4d3b41406$var$addRange($to, null, depth, content);
      return new $59526ec4d3b41406$export$ffb0004e005737fa(content);
  }
  function $59526ec4d3b41406$var$prepareSliceForReplace(slice, $along) {
      let extra = $along.depth - slice.openStart, parent = $along.node(extra);
      let node = parent.copy(slice.content);
      for(let i = extra - 1; i >= 0; i--)node = $along.node(i).copy($59526ec4d3b41406$export$ffb0004e005737fa.from(node));
      return {
          start: node.resolveNoCache(slice.openStart + extra),
          end: node.resolveNoCache(node.content.size - slice.openEnd - extra)
      };
  }
  /**
  You can [_resolve_](https://prosemirror.net/docs/ref/#model.Node.resolve) a position to get more
  information about it. Objects of this class represent such a
  resolved position, providing various pieces of context
  information, and some helper methods.
  
  Throughout this interface, methods that take an optional `depth`
  parameter will interpret undefined as `this.depth` and negative
  numbers as `this.depth + value`.
  */ class $59526ec4d3b41406$export$b2a42f82e59e4b19 {
      /**
      @internal
      */ constructor(/**
      The position that was resolved.
      */ pos, /**
      @internal
      */ path, /**
      The offset this position has into its parent node.
      */ parentOffset){
          this.pos = pos;
          this.path = path;
          this.parentOffset = parentOffset;
          this.depth = path.length / 3 - 1;
      }
      /**
      @internal
      */ resolveDepth(val) {
          if (val == null) return this.depth;
          if (val < 0) return this.depth + val;
          return val;
      }
      /**
      The parent node that the position points into. Note that even if
      a position points into a text node, that node is not considered
      the parent—text nodes are ‘flat’ in this model, and have no content.
      */ get parent() {
          return this.node(this.depth);
      }
      /**
      The root node in which the position was resolved.
      */ get doc() {
          return this.node(0);
      }
      /**
      The ancestor node at the given level. `p.node(p.depth)` is the
      same as `p.parent`.
      */ node(depth) {
          return this.path[this.resolveDepth(depth) * 3];
      }
      /**
      The index into the ancestor at the given level. If this points
      at the 3rd node in the 2nd paragraph on the top level, for
      example, `p.index(0)` is 1 and `p.index(1)` is 2.
      */ index(depth) {
          return this.path[this.resolveDepth(depth) * 3 + 1];
      }
      /**
      The index pointing after this position into the ancestor at the
      given level.
      */ indexAfter(depth) {
          depth = this.resolveDepth(depth);
          return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1);
      }
      /**
      The (absolute) position at the start of the node at the given
      level.
      */ start(depth) {
          depth = this.resolveDepth(depth);
          return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
      }
      /**
      The (absolute) position at the end of the node at the given
      level.
      */ end(depth) {
          depth = this.resolveDepth(depth);
          return this.start(depth) + this.node(depth).content.size;
      }
      /**
      The (absolute) position directly before the wrapping node at the
      given level, or, when `depth` is `this.depth + 1`, the original
      position.
      */ before(depth) {
          depth = this.resolveDepth(depth);
          if (!depth) throw new RangeError("There is no position before the top-level node");
          return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1];
      }
      /**
      The (absolute) position directly after the wrapping node at the
      given level, or the original position when `depth` is `this.depth + 1`.
      */ after(depth) {
          depth = this.resolveDepth(depth);
          if (!depth) throw new RangeError("There is no position after the top-level node");
          return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize;
      }
      /**
      When this position points into a text node, this returns the
      distance between the position and the start of the text node.
      Will be zero for positions that point between nodes.
      */ get textOffset() {
          return this.pos - this.path[this.path.length - 1];
      }
      /**
      Get the node directly after the position, if any. If the position
      points into a text node, only the part of that node after the
      position is returned.
      */ get nodeAfter() {
          let parent = this.parent, index = this.index(this.depth);
          if (index == parent.childCount) return null;
          let dOff = this.pos - this.path[this.path.length - 1], child = parent.child(index);
          return dOff ? parent.child(index).cut(dOff) : child;
      }
      /**
      Get the node directly before the position, if any. If the
      position points into a text node, only the part of that node
      before the position is returned.
      */ get nodeBefore() {
          let index = this.index(this.depth);
          let dOff = this.pos - this.path[this.path.length - 1];
          if (dOff) return this.parent.child(index).cut(0, dOff);
          return index == 0 ? null : this.parent.child(index - 1);
      }
      /**
      Get the position at the given index in the parent node at the
      given depth (which defaults to `this.depth`).
      */ posAtIndex(index, depth) {
          depth = this.resolveDepth(depth);
          let node = this.path[depth * 3], pos = depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
          for(let i = 0; i < index; i++)pos += node.child(i).nodeSize;
          return pos;
      }
      /**
      Get the marks at this position, factoring in the surrounding
      marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
      position is at the start of a non-empty node, the marks of the
      node after it (if any) are returned.
      */ marks() {
          let parent = this.parent, index = this.index();
          // In an empty parent, return the empty array
          if (parent.content.size == 0) return $59526ec4d3b41406$export$c9d15bcfc6d42044.none;
          // When inside a text node, just return the text node's marks
          if (this.textOffset) return parent.child(index).marks;
          let main = parent.maybeChild(index - 1), other = parent.maybeChild(index);
          // If the `after` flag is true of there is no node before, make
          // the node after this position the main reference.
          if (!main) {
              let tmp = main;
              main = other;
              other = tmp;
          }
          // Use all marks in the main node, except those that have
          // `inclusive` set to false and are not present in the other node.
          let marks = main.marks;
          for(var i = 0; i < marks.length; i++)if (marks[i].type.spec.inclusive === false && (!other || !marks[i].isInSet(other.marks))) marks = marks[i--].removeFromSet(marks);
          return marks;
      }
      /**
      Get the marks after the current position, if any, except those
      that are non-inclusive and not present at position `$end`. This
      is mostly useful for getting the set of marks to preserve after a
      deletion. Will return `null` if this position is at the end of
      its parent node or its parent node isn't a textblock (in which
      case no marks should be preserved).
      */ marksAcross($end) {
          let after = this.parent.maybeChild(this.index());
          if (!after || !after.isInline) return null;
          let marks = after.marks, next = $end.parent.maybeChild($end.index());
          for(var i = 0; i < marks.length; i++)if (marks[i].type.spec.inclusive === false && (!next || !marks[i].isInSet(next.marks))) marks = marks[i--].removeFromSet(marks);
          return marks;
      }
      /**
      The depth up to which this position and the given (non-resolved)
      position share the same parent nodes.
      */ sharedDepth(pos) {
          for(let depth = this.depth; depth > 0; depth--)if (this.start(depth) <= pos && this.end(depth) >= pos) return depth;
          return 0;
      }
      /**
      Returns a range based on the place where this position and the
      given position diverge around block content. If both point into
      the same textblock, for example, a range around that textblock
      will be returned. If they point into different blocks, the range
      around those blocks in their shared ancestor is returned. You can
      pass in an optional predicate that will be called with a parent
      node to see if a range into that parent is acceptable.
      */ blockRange(other = this, pred) {
          if (other.pos < this.pos) return other.blockRange(this);
          for(let d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--)if (other.pos <= this.end(d) && (!pred || pred(this.node(d)))) return new $59526ec4d3b41406$export$7bc461ceb770fb16(this, other, d);
          return null;
      }
      /**
      Query whether the given position shares the same parent node.
      */ sameParent(other) {
          return this.pos - this.parentOffset == other.pos - other.parentOffset;
      }
      /**
      Return the greater of this and the given position.
      */ max(other) {
          return other.pos > this.pos ? other : this;
      }
      /**
      Return the smaller of this and the given position.
      */ min(other) {
          return other.pos < this.pos ? other : this;
      }
      /**
      @internal
      */ toString() {
          let str = "";
          for(let i = 1; i <= this.depth; i++)str += (str ? "/" : "") + this.node(i).type.name + "_" + this.index(i - 1);
          return str + ":" + this.parentOffset;
      }
      /**
      @internal
      */ static resolve(doc, pos) {
          if (!(pos >= 0 && pos <= doc.content.size)) throw new RangeError("Position " + pos + " out of range");
          let path = [];
          let start = 0, parentOffset = pos;
          for(let node = doc;;){
              let { index: index, offset: offset } = node.content.findIndex(parentOffset);
              let rem = parentOffset - offset;
              path.push(node, index, start + offset);
              if (!rem) break;
              node = node.child(index);
              if (node.isText) break;
              parentOffset = rem - 1;
              start += offset + 1;
          }
          return new $59526ec4d3b41406$export$b2a42f82e59e4b19(pos, path, parentOffset);
      }
      /**
      @internal
      */ static resolveCached(doc, pos) {
          for(let i = 0; i < $59526ec4d3b41406$var$resolveCache.length; i++){
              let cached = $59526ec4d3b41406$var$resolveCache[i];
              if (cached.pos == pos && cached.doc == doc) return cached;
          }
          let result = $59526ec4d3b41406$var$resolveCache[$59526ec4d3b41406$var$resolveCachePos] = $59526ec4d3b41406$export$b2a42f82e59e4b19.resolve(doc, pos);
          $59526ec4d3b41406$var$resolveCachePos = ($59526ec4d3b41406$var$resolveCachePos + 1) % $59526ec4d3b41406$var$resolveCacheSize;
          return result;
      }
  }
  let $59526ec4d3b41406$var$resolveCache = [], $59526ec4d3b41406$var$resolveCachePos = 0, $59526ec4d3b41406$var$resolveCacheSize = 12;
  /**
  Represents a flat range of content, i.e. one that starts and
  ends in the same node.
  */ class $59526ec4d3b41406$export$7bc461ceb770fb16 {
      /**
      Construct a node range. `$from` and `$to` should point into the
      same node until at least the given `depth`, since a node range
      denotes an adjacent set of nodes in a single parent node.
      */ constructor(/**
      A resolved position along the start of the content. May have a
      `depth` greater than this object's `depth` property, since
      these are the positions that were used to compute the range,
      not re-resolved positions directly at its boundaries.
      */ $from, /**
      A position along the end of the content. See
      caveat for [`$from`](https://prosemirror.net/docs/ref/#model.NodeRange.$from).
      */ $to, /**
      The depth of the node that this range points into.
      */ depth){
          this.$from = $from;
          this.$to = $to;
          this.depth = depth;
      }
      /**
      The position at the start of the range.
      */ get start() {
          return this.$from.before(this.depth + 1);
      }
      /**
      The position at the end of the range.
      */ get end() {
          return this.$to.after(this.depth + 1);
      }
      /**
      The parent node that the range points into.
      */ get parent() {
          return this.$from.node(this.depth);
      }
      /**
      The start index of the range in the parent node.
      */ get startIndex() {
          return this.$from.index(this.depth);
      }
      /**
      The end index of the range in the parent node.
      */ get endIndex() {
          return this.$to.indexAfter(this.depth);
      }
  }
  const $59526ec4d3b41406$var$emptyAttrs = Object.create(null);
  /**
  This class represents a node in the tree that makes up a
  ProseMirror document. So a document is an instance of `Node`, with
  children that are also instances of `Node`.
  
  Nodes are persistent data structures. Instead of changing them, you
  create new ones with the content you want. Old ones keep pointing
  at the old document shape. This is made cheaper by sharing
  structure between the old and new data as much as possible, which a
  tree shape like this (without back pointers) makes easy.
  
  **Do not** directly mutate the properties of a `Node` object. See
  [the guide](/docs/guide/#doc) for more information.
  */ class $59526ec4d3b41406$export$85c928794f8d04d4 {
      /**
      @internal
      */ constructor(/**
      The type of node that this is.
      */ type, /**
      An object mapping attribute names to values. The kind of
      attributes allowed and required are
      [determined](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) by the node type.
      */ attrs, // A fragment holding the node's children.
      content, /**
      The marks (things like whether it is emphasized or part of a
      link) applied to this node.
      */ marks = $59526ec4d3b41406$export$c9d15bcfc6d42044.none){
          this.type = type;
          this.attrs = attrs;
          this.marks = marks;
          this.content = content || $59526ec4d3b41406$export$ffb0004e005737fa.empty;
      }
      /**
      The size of this node, as defined by the integer-based [indexing
      scheme](/docs/guide/#doc.indexing). For text nodes, this is the
      amount of characters. For other leaf nodes, it is one. For
      non-leaf nodes, it is the size of the content plus two (the
      start and end token).
      */ get nodeSize() {
          return this.isLeaf ? 1 : 2 + this.content.size;
      }
      /**
      The number of children that the node has.
      */ get childCount() {
          return this.content.childCount;
      }
      /**
      Get the child node at the given index. Raises an error when the
      index is out of range.
      */ child(index) {
          return this.content.child(index);
      }
      /**
      Get the child node at the given index, if it exists.
      */ maybeChild(index) {
          return this.content.maybeChild(index);
      }
      /**
      Call `f` for every child node, passing the node, its offset
      into this parent node, and its index.
      */ forEach(f) {
          this.content.forEach(f);
      }
      /**
      Invoke a callback for all descendant nodes recursively between
      the given two positions that are relative to start of this
      node's content. The callback is invoked with the node, its
      position relative to the original node (method receiver),
      its parent node, and its child index. When the callback returns
      false for a given node, that node's children will not be
      recursed over. The last parameter can be used to specify a
      starting position to count from.
      */ nodesBetween(from, to, f, startPos = 0) {
          this.content.nodesBetween(from, to, f, startPos, this);
      }
      /**
      Call the given callback for every descendant node. Doesn't
      descend into a node when the callback returns `false`.
      */ descendants(f) {
          this.nodesBetween(0, this.content.size, f);
      }
      /**
      Concatenates all the text nodes found in this fragment and its
      children.
      */ get textContent() {
          return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
      }
      /**
      Get all text between positions `from` and `to`. When
      `blockSeparator` is given, it will be inserted to separate text
      from different block nodes. If `leafText` is given, it'll be
      inserted for every non-text leaf node encountered, otherwise
      [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
      */ textBetween(from, to, blockSeparator, leafText) {
          return this.content.textBetween(from, to, blockSeparator, leafText);
      }
      /**
      Returns this node's first child, or `null` if there are no
      children.
      */ get firstChild() {
          return this.content.firstChild;
      }
      /**
      Returns this node's last child, or `null` if there are no
      children.
      */ get lastChild() {
          return this.content.lastChild;
      }
      /**
      Test whether two nodes represent the same piece of document.
      */ eq(other) {
          return this == other || this.sameMarkup(other) && this.content.eq(other.content);
      }
      /**
      Compare the markup (type, attributes, and marks) of this node to
      those of another. Returns `true` if both have the same markup.
      */ sameMarkup(other) {
          return this.hasMarkup(other.type, other.attrs, other.marks);
      }
      /**
      Check whether this node's markup correspond to the given type,
      attributes, and marks.
      */ hasMarkup(type, attrs, marks) {
          return this.type == type && $59526ec4d3b41406$var$compareDeep(this.attrs, attrs || type.defaultAttrs || $59526ec4d3b41406$var$emptyAttrs) && $59526ec4d3b41406$export$c9d15bcfc6d42044.sameSet(this.marks, marks || $59526ec4d3b41406$export$c9d15bcfc6d42044.none);
      }
      /**
      Create a new node with the same markup as this node, containing
      the given content (or empty, if no content is given).
      */ copy(content = null) {
          if (content == this.content) return this;
          return new $59526ec4d3b41406$export$85c928794f8d04d4(this.type, this.attrs, content, this.marks);
      }
      /**
      Create a copy of this node, with the given set of marks instead
      of the node's own marks.
      */ mark(marks) {
          return marks == this.marks ? this : new $59526ec4d3b41406$export$85c928794f8d04d4(this.type, this.attrs, this.content, marks);
      }
      /**
      Create a copy of this node with only the content between the
      given positions. If `to` is not given, it defaults to the end of
      the node.
      */ cut(from, to = this.content.size) {
          if (from == 0 && to == this.content.size) return this;
          return this.copy(this.content.cut(from, to));
      }
      /**
      Cut out the part of the document between the given positions, and
      return it as a `Slice` object.
      */ slice(from, to = this.content.size, includeParents = false) {
          if (from == to) return $59526ec4d3b41406$export$b3f2e2de3a8baa1e.empty;
          let $from = this.resolve(from), $to = this.resolve(to);
          let depth = includeParents ? 0 : $from.sharedDepth(to);
          let start = $from.start(depth), node = $from.node(depth);
          let content = node.content.cut($from.pos - start, $to.pos - start);
          return new $59526ec4d3b41406$export$b3f2e2de3a8baa1e(content, $from.depth - depth, $to.depth - depth);
      }
      /**
      Replace the part of the document between the given positions with
      the given slice. The slice must 'fit', meaning its open sides
      must be able to connect to the surrounding content, and its
      content nodes must be valid children for the node they are placed
      into. If any of this is violated, an error of type
      [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
      */ replace(from, to, slice) {
          return $59526ec4d3b41406$var$replace(this.resolve(from), this.resolve(to), slice);
      }
      /**
      Find the node directly after the given position.
      */ nodeAt(pos) {
          for(let node = this;;){
              let { index: index, offset: offset } = node.content.findIndex(pos);
              node = node.maybeChild(index);
              if (!node) return null;
              if (offset == pos || node.isText) return node;
              pos -= offset + 1;
          }
      }
      /**
      Find the (direct) child node after the given offset, if any,
      and return it along with its index and offset relative to this
      node.
      */ childAfter(pos) {
          let { index: index, offset: offset } = this.content.findIndex(pos);
          return {
              node: this.content.maybeChild(index),
              index: index,
              offset: offset
          };
      }
      /**
      Find the (direct) child node before the given offset, if any,
      and return it along with its index and offset relative to this
      node.
      */ childBefore(pos) {
          if (pos == 0) return {
              node: null,
              index: 0,
              offset: 0
          };
          let { index: index, offset: offset } = this.content.findIndex(pos);
          if (offset < pos) return {
              node: this.content.child(index),
              index: index,
              offset: offset
          };
          let node = this.content.child(index - 1);
          return {
              node: node,
              index: index - 1,
              offset: offset - node.nodeSize
          };
      }
      /**
      Resolve the given position in the document, returning an
      [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
      */ resolve(pos) {
          return $59526ec4d3b41406$export$b2a42f82e59e4b19.resolveCached(this, pos);
      }
      /**
      @internal
      */ resolveNoCache(pos) {
          return $59526ec4d3b41406$export$b2a42f82e59e4b19.resolve(this, pos);
      }
      /**
      Test whether a given mark or mark type occurs in this document
      between the two given positions.
      */ rangeHasMark(from, to, type) {
          let found = false;
          if (to > from) this.nodesBetween(from, to, (node)=>{
              if (type.isInSet(node.marks)) found = true;
              return !found;
          });
          return found;
      }
      /**
      True when this is a block (non-inline node)
      */ get isBlock() {
          return this.type.isBlock;
      }
      /**
      True when this is a textblock node, a block node with inline
      content.
      */ get isTextblock() {
          return this.type.isTextblock;
      }
      /**
      True when this node allows inline content.
      */ get inlineContent() {
          return this.type.inlineContent;
      }
      /**
      True when this is an inline node (a text node or a node that can
      appear among text).
      */ get isInline() {
          return this.type.isInline;
      }
      /**
      True when this is a text node.
      */ get isText() {
          return this.type.isText;
      }
      /**
      True when this is a leaf node.
      */ get isLeaf() {
          return this.type.isLeaf;
      }
      /**
      True when this is an atom, i.e. when it does not have directly
      editable content. This is usually the same as `isLeaf`, but can
      be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
      on a node's spec (typically used when the node is displayed as
      an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
      */ get isAtom() {
          return this.type.isAtom;
      }
      /**
      Return a string representation of this node for debugging
      purposes.
      */ toString() {
          if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
          let name = this.type.name;
          if (this.content.size) name += "(" + this.content.toStringInner() + ")";
          return $59526ec4d3b41406$var$wrapMarks(this.marks, name);
      }
      /**
      Get the content match in this node at the given index.
      */ contentMatchAt(index) {
          let match = this.type.contentMatch.matchFragment(this.content, 0, index);
          if (!match) throw new Error("Called contentMatchAt on a node with invalid content");
          return match;
      }
      /**
      Test whether replacing the range between `from` and `to` (by
      child index) with the given replacement fragment (which defaults
      to the empty fragment) would leave the node's content valid. You
      can optionally pass `start` and `end` indices into the
      replacement fragment.
      */ canReplace(from, to, replacement = $59526ec4d3b41406$export$ffb0004e005737fa.empty, start = 0, end = replacement.childCount) {
          let one = this.contentMatchAt(from).matchFragment(replacement, start, end);
          let two = one && one.matchFragment(this.content, to);
          if (!two || !two.validEnd) return false;
          for(let i = start; i < end; i++)if (!this.type.allowsMarks(replacement.child(i).marks)) return false;
          return true;
      }
      /**
      Test whether replacing the range `from` to `to` (by index) with
      a node of the given type would leave the node's content valid.
      */ canReplaceWith(from, to, type, marks) {
          if (marks && !this.type.allowsMarks(marks)) return false;
          let start = this.contentMatchAt(from).matchType(type);
          let end = start && start.matchFragment(this.content, to);
          return end ? end.validEnd : false;
      }
      /**
      Test whether the given node's content could be appended to this
      node. If that node is empty, this will only return true if there
      is at least one node type that can appear in both nodes (to avoid
      merging completely incompatible nodes).
      */ canAppend(other) {
          if (other.content.size) return this.canReplace(this.childCount, this.childCount, other.content);
          else return this.type.compatibleContent(other.type);
      }
      /**
      Check whether this node and its descendants conform to the
      schema, and raise error when they do not.
      */ check() {
          this.type.checkContent(this.content);
          let copy = $59526ec4d3b41406$export$c9d15bcfc6d42044.none;
          for(let i = 0; i < this.marks.length; i++)copy = this.marks[i].addToSet(copy);
          if (!$59526ec4d3b41406$export$c9d15bcfc6d42044.sameSet(copy, this.marks)) throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((m)=>m.type.name)}`);
          this.content.forEach((node)=>node.check());
      }
      /**
      Return a JSON-serializeable representation of this node.
      */ toJSON() {
          let obj = {
              type: this.type.name
          };
          for(let _ in this.attrs){
              obj.attrs = this.attrs;
              break;
          }
          if (this.content.size) obj.content = this.content.toJSON();
          if (this.marks.length) obj.marks = this.marks.map((n)=>n.toJSON());
          return obj;
      }
      /**
      Deserialize a node from its JSON representation.
      */ static fromJSON(schema, json) {
          if (!json) throw new RangeError("Invalid input for Node.fromJSON");
          let marks = null;
          if (json.marks) {
              if (!Array.isArray(json.marks)) throw new RangeError("Invalid mark data for Node.fromJSON");
              marks = json.marks.map(schema.markFromJSON);
          }
          if (json.type == "text") {
              if (typeof json.text != "string") throw new RangeError("Invalid text node in JSON");
              return schema.text(json.text, marks);
          }
          let content = $59526ec4d3b41406$export$ffb0004e005737fa.fromJSON(schema, json.content);
          return schema.nodeType(json.type).create(json.attrs, content, marks);
      }
  }
  $59526ec4d3b41406$export$85c928794f8d04d4.prototype.text = undefined;
  class $59526ec4d3b41406$var$TextNode extends $59526ec4d3b41406$export$85c928794f8d04d4 {
      /**
      @internal
      */ constructor(type, attrs, content, marks){
          super(type, attrs, null, marks);
          if (!content) throw new RangeError("Empty text nodes are not allowed");
          this.text = content;
      }
      toString() {
          if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
          return $59526ec4d3b41406$var$wrapMarks(this.marks, JSON.stringify(this.text));
      }
      get textContent() {
          return this.text;
      }
      textBetween(from, to) {
          return this.text.slice(from, to);
      }
      get nodeSize() {
          return this.text.length;
      }
      mark(marks) {
          return marks == this.marks ? this : new $59526ec4d3b41406$var$TextNode(this.type, this.attrs, this.text, marks);
      }
      withText(text) {
          if (text == this.text) return this;
          return new $59526ec4d3b41406$var$TextNode(this.type, this.attrs, text, this.marks);
      }
      cut(from = 0, to = this.text.length) {
          if (from == 0 && to == this.text.length) return this;
          return this.withText(this.text.slice(from, to));
      }
      eq(other) {
          return this.sameMarkup(other) && this.text == other.text;
      }
      toJSON() {
          let base = super.toJSON();
          base.text = this.text;
          return base;
      }
  }
  function $59526ec4d3b41406$var$wrapMarks(marks, str) {
      for(let i = marks.length - 1; i >= 0; i--)str = marks[i].type.name + "(" + str + ")";
      return str;
  }
  /**
  Instances of this class represent a match state of a node type's
  [content expression](https://prosemirror.net/docs/ref/#model.NodeSpec.content), and can be used to
  find out whether further content matches here, and whether a given
  position is a valid end of the node.
  */ class $59526ec4d3b41406$export$364ed450558d7ec4 {
      /**
      @internal
      */ constructor(/**
      True when this match state represents a valid end of the node.
      */ validEnd){
          this.validEnd = validEnd;
          /**
          @internal
          */ this.next = [];
          /**
          @internal
          */ this.wrapCache = [];
      }
      /**
      @internal
      */ static parse(string, nodeTypes) {
          let stream = new $59526ec4d3b41406$var$TokenStream(string, nodeTypes);
          if (stream.next == null) return $59526ec4d3b41406$export$364ed450558d7ec4.empty;
          let expr = $59526ec4d3b41406$var$parseExpr(stream);
          if (stream.next) stream.err("Unexpected trailing text");
          let match = $59526ec4d3b41406$var$dfa($59526ec4d3b41406$var$nfa(expr));
          $59526ec4d3b41406$var$checkForDeadEnds(match, stream);
          return match;
      }
      /**
      Match a node type, returning a match after that node if
      successful.
      */ matchType(type) {
          for(let i = 0; i < this.next.length; i++)if (this.next[i].type == type) return this.next[i].next;
          return null;
      }
      /**
      Try to match a fragment. Returns the resulting match when
      successful.
      */ matchFragment(frag, start = 0, end = frag.childCount) {
          let cur = this;
          for(let i = start; cur && i < end; i++)cur = cur.matchType(frag.child(i).type);
          return cur;
      }
      /**
      @internal
      */ get inlineContent() {
          return this.next.length != 0 && this.next[0].type.isInline;
      }
      /**
      Get the first matching node type at this match position that can
      be generated.
      */ get defaultType() {
          for(let i = 0; i < this.next.length; i++){
              let { type: type } = this.next[i];
              if (!(type.isText || type.hasRequiredAttrs())) return type;
          }
          return null;
      }
      /**
      @internal
      */ compatible(other) {
          for(let i = 0; i < this.next.length; i++)for(let j = 0; j < other.next.length; j++)if (this.next[i].type == other.next[j].type) return true;
          return false;
      }
      /**
      Try to match the given fragment, and if that fails, see if it can
      be made to match by inserting nodes in front of it. When
      successful, return a fragment of inserted nodes (which may be
      empty if nothing had to be inserted). When `toEnd` is true, only
      return a fragment if the resulting match goes to the end of the
      content expression.
      */ fillBefore(after, toEnd = false, startIndex = 0) {
          let seen = [
              this
          ];
          function search(match, types) {
              let finished = match.matchFragment(after, startIndex);
              if (finished && (!toEnd || finished.validEnd)) return $59526ec4d3b41406$export$ffb0004e005737fa.from(types.map((tp)=>tp.createAndFill()));
              for(let i = 0; i < match.next.length; i++){
                  let { type: type, next: next } = match.next[i];
                  if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) == -1) {
                      seen.push(next);
                      let found = search(next, types.concat(type));
                      if (found) return found;
                  }
              }
              return null;
          }
          return search(this, []);
      }
      /**
      Find a set of wrapping node types that would allow a node of the
      given type to appear at this position. The result may be empty
      (when it fits directly) and will be null when no such wrapping
      exists.
      */ findWrapping(target) {
          for(let i = 0; i < this.wrapCache.length; i += 2)if (this.wrapCache[i] == target) return this.wrapCache[i + 1];
          let computed = this.computeWrapping(target);
          this.wrapCache.push(target, computed);
          return computed;
      }
      /**
      @internal
      */ computeWrapping(target) {
          let seen = Object.create(null), active = [
              {
                  match: this,
                  type: null,
                  via: null
              }
          ];
          while(active.length){
              let current = active.shift(), match = current.match;
              if (match.matchType(target)) {
                  let result = [];
                  for(let obj = current; obj.type; obj = obj.via)result.push(obj.type);
                  return result.reverse();
              }
              for(let i = 0; i < match.next.length; i++){
                  let { type: type, next: next } = match.next[i];
                  if (!type.isLeaf && !type.hasRequiredAttrs() && !(type.name in seen) && (!current.type || next.validEnd)) {
                      active.push({
                          match: type.contentMatch,
                          type: type,
                          via: current
                      });
                      seen[type.name] = true;
                  }
              }
          }
          return null;
      }
      /**
      The number of outgoing edges this node has in the finite
      automaton that describes the content expression.
      */ get edgeCount() {
          return this.next.length;
      }
      /**
      Get the _n_​th outgoing edge from this node in the finite
      automaton that describes the content expression.
      */ edge(n) {
          if (n >= this.next.length) throw new RangeError(`There's no ${n}th edge in this content match`);
          return this.next[n];
      }
      /**
      @internal
      */ toString() {
          let seen = [];
          function scan(m) {
              seen.push(m);
              for(let i = 0; i < m.next.length; i++)if (seen.indexOf(m.next[i].next) == -1) scan(m.next[i].next);
          }
          scan(this);
          return seen.map((m, i)=>{
              let out = i + (m.validEnd ? "*" : " ") + " ";
              for(let i = 0; i < m.next.length; i++)out += (i ? ", " : "") + m.next[i].type.name + "->" + seen.indexOf(m.next[i].next);
              return out;
          }).join("\n");
      }
  }
  /**
  @internal
  */ $59526ec4d3b41406$export$364ed450558d7ec4.empty = new $59526ec4d3b41406$export$364ed450558d7ec4(true);
  class $59526ec4d3b41406$var$TokenStream {
      constructor(string, nodeTypes){
          this.string = string;
          this.nodeTypes = nodeTypes;
          this.inline = null;
          this.pos = 0;
          this.tokens = string.split(/\s*(?=\b|\W|$)/);
          if (this.tokens[this.tokens.length - 1] == "") this.tokens.pop();
          if (this.tokens[0] == "") this.tokens.shift();
      }
      get next() {
          return this.tokens[this.pos];
      }
      eat(tok) {
          return this.next == tok && (this.pos++ || true);
      }
      err(str) {
          throw new SyntaxError(str + " (in content expression '" + this.string + "')");
      }
  }
  function $59526ec4d3b41406$var$parseExpr(stream) {
      let exprs = [];
      do exprs.push($59526ec4d3b41406$var$parseExprSeq(stream));
      while (stream.eat("|"));
      return exprs.length == 1 ? exprs[0] : {
          type: "choice",
          exprs: exprs
      };
  }
  function $59526ec4d3b41406$var$parseExprSeq(stream) {
      let exprs = [];
      do exprs.push($59526ec4d3b41406$var$parseExprSubscript(stream));
      while (stream.next && stream.next != ")" && stream.next != "|");
      return exprs.length == 1 ? exprs[0] : {
          type: "seq",
          exprs: exprs
      };
  }
  function $59526ec4d3b41406$var$parseExprSubscript(stream) {
      let expr = $59526ec4d3b41406$var$parseExprAtom(stream);
      for(;;){
          if (stream.eat("+")) expr = {
              type: "plus",
              expr: expr
          };
          else if (stream.eat("*")) expr = {
              type: "star",
              expr: expr
          };
          else if (stream.eat("?")) expr = {
              type: "opt",
              expr: expr
          };
          else if (stream.eat("{")) expr = $59526ec4d3b41406$var$parseExprRange(stream, expr);
          else break;
      }
      return expr;
  }
  function $59526ec4d3b41406$var$parseNum(stream) {
      if (/\D/.test(stream.next)) stream.err("Expected number, got '" + stream.next + "'");
      let result = Number(stream.next);
      stream.pos++;
      return result;
  }
  function $59526ec4d3b41406$var$parseExprRange(stream, expr) {
      let min = $59526ec4d3b41406$var$parseNum(stream), max = min;
      if (stream.eat(",")) {
          if (stream.next != "}") max = $59526ec4d3b41406$var$parseNum(stream);
          else max = -1;
      }
      if (!stream.eat("}")) stream.err("Unclosed braced range");
      return {
          type: "range",
          min: min,
          max: max,
          expr: expr
      };
  }
  function $59526ec4d3b41406$var$resolveName(stream, name) {
      let types = stream.nodeTypes, type = types[name];
      if (type) return [
          type
      ];
      let result = [];
      for(let typeName in types){
          let type = types[typeName];
          if (type.groups.indexOf(name) > -1) result.push(type);
      }
      if (result.length == 0) stream.err("No node type or group '" + name + "' found");
      return result;
  }
  function $59526ec4d3b41406$var$parseExprAtom(stream) {
      if (stream.eat("(")) {
          let expr = $59526ec4d3b41406$var$parseExpr(stream);
          if (!stream.eat(")")) stream.err("Missing closing paren");
          return expr;
      } else if (!/\W/.test(stream.next)) {
          let exprs = $59526ec4d3b41406$var$resolveName(stream, stream.next).map((type)=>{
              if (stream.inline == null) stream.inline = type.isInline;
              else if (stream.inline != type.isInline) stream.err("Mixing inline and block content");
              return {
                  type: "name",
                  value: type
              };
          });
          stream.pos++;
          return exprs.length == 1 ? exprs[0] : {
              type: "choice",
              exprs: exprs
          };
      } else stream.err("Unexpected token '" + stream.next + "'");
  }
  /**
  Construct an NFA from an expression as returned by the parser. The
  NFA is represented as an array of states, which are themselves
  arrays of edges, which are `{term, to}` objects. The first state is
  the entry state and the last node is the success state.
  
  Note that unlike typical NFAs, the edge ordering in this one is
  significant, in that it is used to contruct filler content when
  necessary.
  */ function $59526ec4d3b41406$var$nfa(expr) {
      let nfa = [
          []
      ];
      connect(compile(expr, 0), node());
      return nfa;
      function node() {
          return nfa.push([]) - 1;
      }
      function edge(from, to, term) {
          let edge = {
              term: term,
              to: to
          };
          nfa[from].push(edge);
          return edge;
      }
      function connect(edges, to) {
          edges.forEach((edge)=>edge.to = to);
      }
      function compile(expr, from) {
          if (expr.type == "choice") return expr.exprs.reduce((out, expr)=>out.concat(compile(expr, from)), []);
          else if (expr.type == "seq") for(let i = 0;; i++){
              let next = compile(expr.exprs[i], from);
              if (i == expr.exprs.length - 1) return next;
              connect(next, from = node());
          }
          else if (expr.type == "star") {
              let loop = node();
              edge(from, loop);
              connect(compile(expr.expr, loop), loop);
              return [
                  edge(loop)
              ];
          } else if (expr.type == "plus") {
              let loop = node();
              connect(compile(expr.expr, from), loop);
              connect(compile(expr.expr, loop), loop);
              return [
                  edge(loop)
              ];
          } else if (expr.type == "opt") return [
              edge(from)
          ].concat(compile(expr.expr, from));
          else if (expr.type == "range") {
              let cur = from;
              for(let i = 0; i < expr.min; i++){
                  let next = node();
                  connect(compile(expr.expr, cur), next);
                  cur = next;
              }
              if (expr.max == -1) connect(compile(expr.expr, cur), cur);
              else for(let i = expr.min; i < expr.max; i++){
                  let next = node();
                  edge(cur, next);
                  connect(compile(expr.expr, cur), next);
                  cur = next;
              }
              return [
                  edge(cur)
              ];
          } else if (expr.type == "name") return [
              edge(from, undefined, expr.value)
          ];
          else throw new Error("Unknown expr type");
      }
  }
  function $59526ec4d3b41406$var$cmp(a, b) {
      return b - a;
  }
  // Get the set of nodes reachable by null edges from `node`. Omit
  // nodes with only a single null-out-edge, since they may lead to
  // needless duplicated nodes.
  function $59526ec4d3b41406$var$nullFrom(nfa, node) {
      let result = [];
      scan(node);
      return result.sort($59526ec4d3b41406$var$cmp);
      function scan(node) {
          let edges = nfa[node];
          if (edges.length == 1 && !edges[0].term) return scan(edges[0].to);
          result.push(node);
          for(let i = 0; i < edges.length; i++){
              let { term: term, to: to } = edges[i];
              if (!term && result.indexOf(to) == -1) scan(to);
          }
      }
  }
  // Compiles an NFA as produced by `nfa` into a DFA, modeled as a set
  // of state objects (`ContentMatch` instances) with transitions
  // between them.
  function $59526ec4d3b41406$var$dfa(nfa) {
      let labeled = Object.create(null);
      return explore($59526ec4d3b41406$var$nullFrom(nfa, 0));
      function explore(states) {
          let out = [];
          states.forEach((node)=>{
              nfa[node].forEach(({ term: term, to: to })=>{
                  if (!term) return;
                  let set;
                  for(let i = 0; i < out.length; i++)if (out[i][0] == term) set = out[i][1];
                  $59526ec4d3b41406$var$nullFrom(nfa, to).forEach((node)=>{
                      if (!set) out.push([
                          term,
                          set = []
                      ]);
                      if (set.indexOf(node) == -1) set.push(node);
                  });
              });
          });
          let state = labeled[states.join(",")] = new $59526ec4d3b41406$export$364ed450558d7ec4(states.indexOf(nfa.length - 1) > -1);
          for(let i = 0; i < out.length; i++){
              let states = out[i][1].sort($59526ec4d3b41406$var$cmp);
              state.next.push({
                  type: out[i][0],
                  next: labeled[states.join(",")] || explore(states)
              });
          }
          return state;
      }
  }
  function $59526ec4d3b41406$var$checkForDeadEnds(match, stream) {
      for(let i = 0, work = [
          match
      ]; i < work.length; i++){
          let state = work[i], dead = !state.validEnd, nodes = [];
          for(let j = 0; j < state.next.length; j++){
              let { type: type, next: next } = state.next[j];
              nodes.push(type.name);
              if (dead && !(type.isText || type.hasRequiredAttrs())) dead = false;
              if (work.indexOf(next) == -1) work.push(next);
          }
          if (dead) stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
      }
  }
  // For node types where all attrs have a default value (or which don't
  // have any attributes), build up a single reusable default attribute
  // object, and use it for all nodes that don't specify specific
  // attributes.
  function $59526ec4d3b41406$var$defaultAttrs(attrs) {
      let defaults = Object.create(null);
      for(let attrName in attrs){
          let attr = attrs[attrName];
          if (!attr.hasDefault) return null;
          defaults[attrName] = attr.default;
      }
      return defaults;
  }
  function $59526ec4d3b41406$var$computeAttrs(attrs, value) {
      let built = Object.create(null);
      for(let name in attrs){
          let given = value && value[name];
          if (given === undefined) {
              let attr = attrs[name];
              if (attr.hasDefault) given = attr.default;
              else throw new RangeError("No value supplied for attribute " + name);
          }
          built[name] = given;
      }
      return built;
  }
  function $59526ec4d3b41406$var$initAttrs(attrs) {
      let result = Object.create(null);
      if (attrs) for(let name in attrs)result[name] = new $59526ec4d3b41406$var$Attribute(attrs[name]);
      return result;
  }
  /**
  Node types are objects allocated once per `Schema` and used to
  [tag](https://prosemirror.net/docs/ref/#model.Node.type) `Node` instances. They contain information
  about the node type, such as its name and what kind of node it
  represents.
  */ class $59526ec4d3b41406$export$f06e977173f1857c {
      /**
      @internal
      */ constructor(/**
      The name the node type has in this schema.
      */ name, /**
      A link back to the `Schema` the node type belongs to.
      */ schema, /**
      The spec that this type is based on
      */ spec){
          this.name = name;
          this.schema = schema;
          this.spec = spec;
          /**
          The set of marks allowed in this node. `null` means all marks
          are allowed.
          */ this.markSet = null;
          this.groups = spec.group ? spec.group.split(" ") : [];
          this.attrs = $59526ec4d3b41406$var$initAttrs(spec.attrs);
          this.defaultAttrs = $59526ec4d3b41406$var$defaultAttrs(this.attrs);
          this.contentMatch = null;
          this.inlineContent = null;
          this.isBlock = !(spec.inline || name == "text");
          this.isText = name == "text";
      }
      /**
      True if this is an inline type.
      */ get isInline() {
          return !this.isBlock;
      }
      /**
      True if this is a textblock type, a block that contains inline
      content.
      */ get isTextblock() {
          return this.isBlock && this.inlineContent;
      }
      /**
      True for node types that allow no content.
      */ get isLeaf() {
          return this.contentMatch == $59526ec4d3b41406$export$364ed450558d7ec4.empty;
      }
      /**
      True when this node is an atom, i.e. when it does not have
      directly editable content.
      */ get isAtom() {
          return this.isLeaf || !!this.spec.atom;
      }
      /**
      The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
      */ get whitespace() {
          return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
      }
      /**
      Tells you whether this node type has any required attributes.
      */ hasRequiredAttrs() {
          for(let n in this.attrs)if (this.attrs[n].isRequired) return true;
          return false;
      }
      /**
      Indicates whether this node allows some of the same content as
      the given node type.
      */ compatibleContent(other) {
          return this == other || this.contentMatch.compatible(other.contentMatch);
      }
      /**
      @internal
      */ computeAttrs(attrs) {
          if (!attrs && this.defaultAttrs) return this.defaultAttrs;
          else return $59526ec4d3b41406$var$computeAttrs(this.attrs, attrs);
      }
      /**
      Create a `Node` of this type. The given attributes are
      checked and defaulted (you can pass `null` to use the type's
      defaults entirely, if no required attributes exist). `content`
      may be a `Fragment`, a node, an array of nodes, or
      `null`. Similarly `marks` may be `null` to default to the empty
      set of marks.
      */ create(attrs = null, content, marks) {
          if (this.isText) throw new Error("NodeType.create can't construct text nodes");
          return new $59526ec4d3b41406$export$85c928794f8d04d4(this, this.computeAttrs(attrs), $59526ec4d3b41406$export$ffb0004e005737fa.from(content), $59526ec4d3b41406$export$c9d15bcfc6d42044.setFrom(marks));
      }
      /**
      Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
      against the node type's content restrictions, and throw an error
      if it doesn't match.
      */ createChecked(attrs = null, content, marks) {
          content = $59526ec4d3b41406$export$ffb0004e005737fa.from(content);
          this.checkContent(content);
          return new $59526ec4d3b41406$export$85c928794f8d04d4(this, this.computeAttrs(attrs), content, $59526ec4d3b41406$export$c9d15bcfc6d42044.setFrom(marks));
      }
      /**
      Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
      necessary to add nodes to the start or end of the given fragment
      to make it fit the node. If no fitting wrapping can be found,
      return null. Note that, due to the fact that required nodes can
      always be created, this will always succeed if you pass null or
      `Fragment.empty` as content.
      */ createAndFill(attrs = null, content, marks) {
          attrs = this.computeAttrs(attrs);
          content = $59526ec4d3b41406$export$ffb0004e005737fa.from(content);
          if (content.size) {
              let before = this.contentMatch.fillBefore(content);
              if (!before) return null;
              content = before.append(content);
          }
          let matched = this.contentMatch.matchFragment(content);
          let after = matched && matched.fillBefore($59526ec4d3b41406$export$ffb0004e005737fa.empty, true);
          if (!after) return null;
          return new $59526ec4d3b41406$export$85c928794f8d04d4(this, attrs, content.append(after), $59526ec4d3b41406$export$c9d15bcfc6d42044.setFrom(marks));
      }
      /**
      Returns true if the given fragment is valid content for this node
      type with the given attributes.
      */ validContent(content) {
          let result = this.contentMatch.matchFragment(content);
          if (!result || !result.validEnd) return false;
          for(let i = 0; i < content.childCount; i++)if (!this.allowsMarks(content.child(i).marks)) return false;
          return true;
      }
      /**
      Throws a RangeError if the given fragment is not valid content for this
      node type.
      @internal
      */ checkContent(content) {
          if (!this.validContent(content)) throw new RangeError(`Invalid content for node ${this.name}: ${content.toString().slice(0, 50)}`);
      }
      /**
      Check whether the given mark type is allowed in this node.
      */ allowsMarkType(markType) {
          return this.markSet == null || this.markSet.indexOf(markType) > -1;
      }
      /**
      Test whether the given set of marks are allowed in this node.
      */ allowsMarks(marks) {
          if (this.markSet == null) return true;
          for(let i = 0; i < marks.length; i++)if (!this.allowsMarkType(marks[i].type)) return false;
          return true;
      }
      /**
      Removes the marks that are not allowed in this node from the given set.
      */ allowedMarks(marks) {
          if (this.markSet == null) return marks;
          let copy;
          for(let i = 0; i < marks.length; i++){
              if (!this.allowsMarkType(marks[i].type)) {
                  if (!copy) copy = marks.slice(0, i);
              } else if (copy) copy.push(marks[i]);
          }
          return !copy ? marks : copy.length ? copy : $59526ec4d3b41406$export$c9d15bcfc6d42044.none;
      }
      /**
      @internal
      */ static compile(nodes, schema) {
          let result = Object.create(null);
          nodes.forEach((name, spec)=>result[name] = new $59526ec4d3b41406$export$f06e977173f1857c(name, schema, spec));
          let topType = schema.spec.topNode || "doc";
          if (!result[topType]) throw new RangeError("Schema is missing its top node type ('" + topType + "')");
          if (!result.text) throw new RangeError("Every schema needs a 'text' type");
          for(let _ in result.text.attrs)throw new RangeError("The text node type should not have attributes");
          return result;
      }
  }
  // Attribute descriptors
  class $59526ec4d3b41406$var$Attribute {
      constructor(options){
          this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
          this.default = options.default;
      }
      get isRequired() {
          return !this.hasDefault;
      }
  }
  // Marks
  /**
  Like nodes, marks (which are associated with nodes to signify
  things like emphasis or being part of a link) are
  [tagged](https://prosemirror.net/docs/ref/#model.Mark.type) with type objects, which are
  instantiated once per `Schema`.
  */ class $59526ec4d3b41406$export$b6a78689043c6521 {
      /**
      @internal
      */ constructor(/**
      The name of the mark type.
      */ name, /**
      @internal
      */ rank, /**
      The schema that this mark type instance is part of.
      */ schema, /**
      The spec on which the type is based.
      */ spec){
          this.name = name;
          this.rank = rank;
          this.schema = schema;
          this.spec = spec;
          this.attrs = $59526ec4d3b41406$var$initAttrs(spec.attrs);
          this.excluded = null;
          let defaults = $59526ec4d3b41406$var$defaultAttrs(this.attrs);
          this.instance = defaults ? new $59526ec4d3b41406$export$c9d15bcfc6d42044(this, defaults) : null;
      }
      /**
      Create a mark of this type. `attrs` may be `null` or an object
      containing only some of the mark's attributes. The others, if
      they have defaults, will be added.
      */ create(attrs = null) {
          if (!attrs && this.instance) return this.instance;
          return new $59526ec4d3b41406$export$c9d15bcfc6d42044(this, $59526ec4d3b41406$var$computeAttrs(this.attrs, attrs));
      }
      /**
      @internal
      */ static compile(marks, schema) {
          let result = Object.create(null), rank = 0;
          marks.forEach((name, spec)=>result[name] = new $59526ec4d3b41406$export$b6a78689043c6521(name, rank++, schema, spec));
          return result;
      }
      /**
      When there is a mark of this type in the given set, a new set
      without it is returned. Otherwise, the input set is returned.
      */ removeFromSet(set) {
          for(var i = 0; i < set.length; i++)if (set[i].type == this) {
              set = set.slice(0, i).concat(set.slice(i + 1));
              i--;
          }
          return set;
      }
      /**
      Tests whether there is a mark of this type in the given set.
      */ isInSet(set) {
          for(let i = 0; i < set.length; i++)if (set[i].type == this) return set[i];
      }
      /**
      Queries whether a given mark type is
      [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
      */ excludes(other) {
          return this.excluded.indexOf(other) > -1;
      }
  }
  /**
  A document schema. Holds [node](https://prosemirror.net/docs/ref/#model.NodeType) and [mark
  type](https://prosemirror.net/docs/ref/#model.MarkType) objects for the nodes and marks that may
  occur in conforming documents, and provides functionality for
  creating and deserializing such documents.
  
  When given, the type parameters provide the names of the nodes and
  marks in this schema.
  */ class $59526ec4d3b41406$export$19342e026b58ebb7 {
      /**
      Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
      */ constructor(spec){
          /**
          An object for storing whatever values modules may want to
          compute and cache per schema. (If you want to store something
          in it, try to use property names unlikely to clash.)
          */ this.cached = Object.create(null);
          let instanceSpec = this.spec = {};
          for(let prop in spec)instanceSpec[prop] = spec[prop];
          instanceSpec.nodes = (0, $a48802960d5588da$export$2e2bcd8739ae039).from(spec.nodes), instanceSpec.marks = (0, $a48802960d5588da$export$2e2bcd8739ae039).from(spec.marks || {}), this.nodes = $59526ec4d3b41406$export$f06e977173f1857c.compile(this.spec.nodes, this);
          this.marks = $59526ec4d3b41406$export$b6a78689043c6521.compile(this.spec.marks, this);
          let contentExprCache = Object.create(null);
          for(let prop in this.nodes){
              if (prop in this.marks) throw new RangeError(prop + " can not be both a node and a mark");
              let type = this.nodes[prop], contentExpr = type.spec.content || "", markExpr = type.spec.marks;
              type.contentMatch = contentExprCache[contentExpr] || (contentExprCache[contentExpr] = $59526ec4d3b41406$export$364ed450558d7ec4.parse(contentExpr, this.nodes));
              type.inlineContent = type.contentMatch.inlineContent;
              type.markSet = markExpr == "_" ? null : markExpr ? $59526ec4d3b41406$var$gatherMarks(this, markExpr.split(" ")) : markExpr == "" || !type.inlineContent ? [] : null;
          }
          for(let prop in this.marks){
              let type = this.marks[prop], excl = type.spec.excludes;
              type.excluded = excl == null ? [
                  type
              ] : excl == "" ? [] : $59526ec4d3b41406$var$gatherMarks(this, excl.split(" "));
          }
          this.nodeFromJSON = this.nodeFromJSON.bind(this);
          this.markFromJSON = this.markFromJSON.bind(this);
          this.topNodeType = this.nodes[this.spec.topNode || "doc"];
          this.cached.wrappings = Object.create(null);
      }
      /**
      Create a node in this schema. The `type` may be a string or a
      `NodeType` instance. Attributes will be extended with defaults,
      `content` may be a `Fragment`, `null`, a `Node`, or an array of
      nodes.
      */ node(type, attrs = null, content, marks) {
          if (typeof type == "string") type = this.nodeType(type);
          else if (!(type instanceof $59526ec4d3b41406$export$f06e977173f1857c)) throw new RangeError("Invalid node type: " + type);
          else if (type.schema != this) throw new RangeError("Node type from different schema used (" + type.name + ")");
          return type.createChecked(attrs, content, marks);
      }
      /**
      Create a text node in the schema. Empty text nodes are not
      allowed.
      */ text(text, marks) {
          let type = this.nodes.text;
          return new $59526ec4d3b41406$var$TextNode(type, type.defaultAttrs, text, $59526ec4d3b41406$export$c9d15bcfc6d42044.setFrom(marks));
      }
      /**
      Create a mark with the given type and attributes.
      */ mark(type, attrs) {
          if (typeof type == "string") type = this.marks[type];
          return type.create(attrs);
      }
      /**
      Deserialize a node from its JSON representation. This method is
      bound.
      */ nodeFromJSON(json) {
          return $59526ec4d3b41406$export$85c928794f8d04d4.fromJSON(this, json);
      }
      /**
      Deserialize a mark from its JSON representation. This method is
      bound.
      */ markFromJSON(json) {
          return $59526ec4d3b41406$export$c9d15bcfc6d42044.fromJSON(this, json);
      }
      /**
      @internal
      */ nodeType(name) {
          let found = this.nodes[name];
          if (!found) throw new RangeError("Unknown node type: " + name);
          return found;
      }
  }
  function $59526ec4d3b41406$var$gatherMarks(schema, marks) {
      let found = [];
      for(let i = 0; i < marks.length; i++){
          let name = marks[i], mark = schema.marks[name], ok = mark;
          if (mark) found.push(mark);
          else for(let prop in schema.marks){
              let mark = schema.marks[prop];
              if (name == "_" || mark.spec.group && mark.spec.group.split(" ").indexOf(name) > -1) found.push(ok = mark);
          }
          if (!ok) throw new SyntaxError("Unknown mark type: '" + marks[i] + "'");
      }
      return found;
  }
  /**
  A DOM parser represents a strategy for parsing DOM content into a
  ProseMirror document conforming to a given schema. Its behavior is
  defined by an array of [rules](https://prosemirror.net/docs/ref/#model.ParseRule).
  */ class $59526ec4d3b41406$export$1059c6e7d2ce5669 {
      /**
      Create a parser that targets the given schema, using the given
      parsing rules.
      */ constructor(/**
      The schema into which the parser parses.
      */ schema, /**
      The set of [parse rules](https://prosemirror.net/docs/ref/#model.ParseRule) that the parser
      uses, in order of precedence.
      */ rules){
          this.schema = schema;
          this.rules = rules;
          /**
          @internal
          */ this.tags = [];
          /**
          @internal
          */ this.styles = [];
          rules.forEach((rule)=>{
              if (rule.tag) this.tags.push(rule);
              else if (rule.style) this.styles.push(rule);
          });
          // Only normalize list elements when lists in the schema can't directly contain themselves
          this.normalizeLists = !this.tags.some((r)=>{
              if (!/^(ul|ol)\b/.test(r.tag) || !r.node) return false;
              let node = schema.nodes[r.node];
              return node.contentMatch.matchType(node);
          });
      }
      /**
      Parse a document from the content of a DOM node.
      */ parse(dom, options = {}) {
          let context = new $59526ec4d3b41406$var$ParseContext(this, options, false);
          context.addAll(dom, options.from, options.to);
          return context.finish();
      }
      /**
      Parses the content of the given DOM node, like
      [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
      options. But unlike that method, which produces a whole node,
      this one returns a slice that is open at the sides, meaning that
      the schema constraints aren't applied to the start of nodes to
      the left of the input and the end of nodes at the end.
      */ parseSlice(dom, options = {}) {
          let context = new $59526ec4d3b41406$var$ParseContext(this, options, true);
          context.addAll(dom, options.from, options.to);
          return $59526ec4d3b41406$export$b3f2e2de3a8baa1e.maxOpen(context.finish());
      }
      /**
      @internal
      */ matchTag(dom, context, after) {
          for(let i = after ? this.tags.indexOf(after) + 1 : 0; i < this.tags.length; i++){
              let rule = this.tags[i];
              if ($59526ec4d3b41406$var$matches(dom, rule.tag) && (rule.namespace === undefined || dom.namespaceURI == rule.namespace) && (!rule.context || context.matchesContext(rule.context))) {
                  if (rule.getAttrs) {
                      let result = rule.getAttrs(dom);
                      if (result === false) continue;
                      rule.attrs = result || undefined;
                  }
                  return rule;
              }
          }
      }
      /**
      @internal
      */ matchStyle(prop, value, context, after) {
          for(let i = after ? this.styles.indexOf(after) + 1 : 0; i < this.styles.length; i++){
              let rule = this.styles[i], style = rule.style;
              if (style.indexOf(prop) != 0 || rule.context && !context.matchesContext(rule.context) || // Test that the style string either precisely matches the prop,
              // or has an '=' sign after the prop, followed by the given
              // value.
              style.length > prop.length && (style.charCodeAt(prop.length) != 61 || style.slice(prop.length + 1) != value)) continue;
              if (rule.getAttrs) {
                  let result = rule.getAttrs(value);
                  if (result === false) continue;
                  rule.attrs = result || undefined;
              }
              return rule;
          }
      }
      /**
      @internal
      */ static schemaRules(schema) {
          let result = [];
          function insert(rule) {
              let priority = rule.priority == null ? 50 : rule.priority, i = 0;
              for(; i < result.length; i++){
                  let next = result[i], nextPriority = next.priority == null ? 50 : next.priority;
                  if (nextPriority < priority) break;
              }
              result.splice(i, 0, rule);
          }
          for(let name in schema.marks){
              let rules = schema.marks[name].spec.parseDOM;
              if (rules) rules.forEach((rule)=>{
                  insert(rule = $59526ec4d3b41406$var$copy(rule));
                  if (!(rule.mark || rule.ignore || rule.clearMark)) rule.mark = name;
              });
          }
          for(let name in schema.nodes){
              let rules = schema.nodes[name].spec.parseDOM;
              if (rules) rules.forEach((rule)=>{
                  insert(rule = $59526ec4d3b41406$var$copy(rule));
                  if (!(rule.node || rule.ignore || rule.mark)) rule.node = name;
              });
          }
          return result;
      }
      /**
      Construct a DOM parser using the parsing rules listed in a
      schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
      [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
      */ static fromSchema(schema) {
          return schema.cached.domParser || (schema.cached.domParser = new $59526ec4d3b41406$export$1059c6e7d2ce5669(schema, $59526ec4d3b41406$export$1059c6e7d2ce5669.schemaRules(schema)));
      }
  }
  const $59526ec4d3b41406$var$blockTags = {
      address: true,
      article: true,
      aside: true,
      blockquote: true,
      canvas: true,
      dd: true,
      div: true,
      dl: true,
      fieldset: true,
      figcaption: true,
      figure: true,
      footer: true,
      form: true,
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      h5: true,
      h6: true,
      header: true,
      hgroup: true,
      hr: true,
      li: true,
      noscript: true,
      ol: true,
      output: true,
      p: true,
      pre: true,
      section: true,
      table: true,
      tfoot: true,
      ul: true
  };
  const $59526ec4d3b41406$var$ignoreTags = {
      head: true,
      noscript: true,
      object: true,
      script: true,
      style: true,
      title: true
  };
  const $59526ec4d3b41406$var$listTags = {
      ol: true,
      ul: true
  };
  // Using a bitfield for node context options
  const $59526ec4d3b41406$var$OPT_PRESERVE_WS = 1, $59526ec4d3b41406$var$OPT_PRESERVE_WS_FULL = 2, $59526ec4d3b41406$var$OPT_OPEN_LEFT = 4;
  function $59526ec4d3b41406$var$wsOptionsFor(type, preserveWhitespace, base) {
      if (preserveWhitespace != null) return (preserveWhitespace ? $59526ec4d3b41406$var$OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? $59526ec4d3b41406$var$OPT_PRESERVE_WS_FULL : 0);
      return type && type.whitespace == "pre" ? $59526ec4d3b41406$var$OPT_PRESERVE_WS | $59526ec4d3b41406$var$OPT_PRESERVE_WS_FULL : base & ~$59526ec4d3b41406$var$OPT_OPEN_LEFT;
  }
  class $59526ec4d3b41406$var$NodeContext {
      constructor(type, attrs, // Marks applied to this node itself
      marks, // Marks that can't apply here, but will be used in children if possible
      pendingMarks, solid, match, options){
          this.type = type;
          this.attrs = attrs;
          this.marks = marks;
          this.pendingMarks = pendingMarks;
          this.solid = solid;
          this.options = options;
          this.content = [];
          // Marks applied to the node's children
          this.activeMarks = $59526ec4d3b41406$export$c9d15bcfc6d42044.none;
          // Nested Marks with same type
          this.stashMarks = [];
          this.match = match || (options & $59526ec4d3b41406$var$OPT_OPEN_LEFT ? null : type.contentMatch);
      }
      findWrapping(node) {
          if (!this.match) {
              if (!this.type) return [];
              let fill = this.type.contentMatch.fillBefore($59526ec4d3b41406$export$ffb0004e005737fa.from(node));
              if (fill) this.match = this.type.contentMatch.matchFragment(fill);
              else {
                  let start = this.type.contentMatch, wrap;
                  if (wrap = start.findWrapping(node.type)) {
                      this.match = start;
                      return wrap;
                  } else return null;
              }
          }
          return this.match.findWrapping(node.type);
      }
      finish(openEnd) {
          if (!(this.options & $59526ec4d3b41406$var$OPT_PRESERVE_WS)) {
              let last = this.content[this.content.length - 1], m;
              if (last && last.isText && (m = /[ \t\r\n\u000c]+$/.exec(last.text))) {
                  let text = last;
                  if (last.text.length == m[0].length) this.content.pop();
                  else this.content[this.content.length - 1] = text.withText(text.text.slice(0, text.text.length - m[0].length));
              }
          }
          let content = $59526ec4d3b41406$export$ffb0004e005737fa.from(this.content);
          if (!openEnd && this.match) content = content.append(this.match.fillBefore($59526ec4d3b41406$export$ffb0004e005737fa.empty, true));
          return this.type ? this.type.create(this.attrs, content, this.marks) : content;
      }
      popFromStashMark(mark) {
          for(let i = this.stashMarks.length - 1; i >= 0; i--)if (mark.eq(this.stashMarks[i])) return this.stashMarks.splice(i, 1)[0];
      }
      applyPending(nextType) {
          for(let i = 0, pending = this.pendingMarks; i < pending.length; i++){
              let mark = pending[i];
              if ((this.type ? this.type.allowsMarkType(mark.type) : $59526ec4d3b41406$var$markMayApply(mark.type, nextType)) && !mark.isInSet(this.activeMarks)) {
                  this.activeMarks = mark.addToSet(this.activeMarks);
                  this.pendingMarks = mark.removeFromSet(this.pendingMarks);
              }
          }
      }
      inlineContext(node) {
          if (this.type) return this.type.inlineContent;
          if (this.content.length) return this.content[0].isInline;
          return node.parentNode && !$59526ec4d3b41406$var$blockTags.hasOwnProperty(node.parentNode.nodeName.toLowerCase());
      }
  }
  class $59526ec4d3b41406$var$ParseContext {
      constructor(// The parser we are using.
      parser, // The options passed to this parse.
      options, isOpen){
          this.parser = parser;
          this.options = options;
          this.isOpen = isOpen;
          this.open = 0;
          let topNode = options.topNode, topContext;
          let topOptions = $59526ec4d3b41406$var$wsOptionsFor(null, options.preserveWhitespace, 0) | (isOpen ? $59526ec4d3b41406$var$OPT_OPEN_LEFT : 0);
          if (topNode) topContext = new $59526ec4d3b41406$var$NodeContext(topNode.type, topNode.attrs, $59526ec4d3b41406$export$c9d15bcfc6d42044.none, $59526ec4d3b41406$export$c9d15bcfc6d42044.none, true, options.topMatch || topNode.type.contentMatch, topOptions);
          else if (isOpen) topContext = new $59526ec4d3b41406$var$NodeContext(null, null, $59526ec4d3b41406$export$c9d15bcfc6d42044.none, $59526ec4d3b41406$export$c9d15bcfc6d42044.none, true, null, topOptions);
          else topContext = new $59526ec4d3b41406$var$NodeContext(parser.schema.topNodeType, null, $59526ec4d3b41406$export$c9d15bcfc6d42044.none, $59526ec4d3b41406$export$c9d15bcfc6d42044.none, true, null, topOptions);
          this.nodes = [
              topContext
          ];
          this.find = options.findPositions;
          this.needsBlock = false;
      }
      get top() {
          return this.nodes[this.open];
      }
      // Add a DOM node to the content. Text is inserted as text node,
      // otherwise, the node is passed to `addElement` or, if it has a
      // `style` attribute, `addElementWithStyles`.
      addDOM(dom) {
          if (dom.nodeType == 3) this.addTextNode(dom);
          else if (dom.nodeType == 1) this.addElement(dom);
      }
      withStyleRules(dom, f) {
          let style = dom.getAttribute("style");
          if (!style) return f();
          let marks = this.readStyles($59526ec4d3b41406$var$parseStyles(style));
          if (!marks) return; // A style with ignore: true
          let [addMarks, removeMarks] = marks, top = this.top;
          for(let i = 0; i < removeMarks.length; i++)this.removePendingMark(removeMarks[i], top);
          for(let i = 0; i < addMarks.length; i++)this.addPendingMark(addMarks[i]);
          f();
          for(let i = 0; i < addMarks.length; i++)this.removePendingMark(addMarks[i], top);
          for(let i = 0; i < removeMarks.length; i++)this.addPendingMark(removeMarks[i]);
      }
      addTextNode(dom) {
          let value = dom.nodeValue;
          let top = this.top;
          if (top.options & $59526ec4d3b41406$var$OPT_PRESERVE_WS_FULL || top.inlineContext(dom) || /[^ \t\r\n\u000c]/.test(value)) {
              if (!(top.options & $59526ec4d3b41406$var$OPT_PRESERVE_WS)) {
                  value = value.replace(/[ \t\r\n\u000c]+/g, " ");
                  // If this starts with whitespace, and there is no node before it, or
                  // a hard break, or a text node that ends with whitespace, strip the
                  // leading space.
                  if (/^[ \t\r\n\u000c]/.test(value) && this.open == this.nodes.length - 1) {
                      let nodeBefore = top.content[top.content.length - 1];
                      let domNodeBefore = dom.previousSibling;
                      if (!nodeBefore || domNodeBefore && domNodeBefore.nodeName == "BR" || nodeBefore.isText && /[ \t\r\n\u000c]$/.test(nodeBefore.text)) value = value.slice(1);
                  }
              } else if (!(top.options & $59526ec4d3b41406$var$OPT_PRESERVE_WS_FULL)) value = value.replace(/\r?\n|\r/g, " ");
              else value = value.replace(/\r\n?/g, "\n");
              if (value) this.insertNode(this.parser.schema.text(value));
              this.findInText(dom);
          } else this.findInside(dom);
      }
      // Try to find a handler for the given tag and use that to parse. If
      // none is found, the element's content nodes are added directly.
      addElement(dom, matchAfter) {
          let name = dom.nodeName.toLowerCase(), ruleID;
          if ($59526ec4d3b41406$var$listTags.hasOwnProperty(name) && this.parser.normalizeLists) $59526ec4d3b41406$var$normalizeList(dom);
          let rule = this.options.ruleFromNode && this.options.ruleFromNode(dom) || (ruleID = this.parser.matchTag(dom, this, matchAfter));
          if (rule ? rule.ignore : $59526ec4d3b41406$var$ignoreTags.hasOwnProperty(name)) {
              this.findInside(dom);
              this.ignoreFallback(dom);
          } else if (!rule || rule.skip || rule.closeParent) {
              if (rule && rule.closeParent) this.open = Math.max(0, this.open - 1);
              else if (rule && rule.skip.nodeType) dom = rule.skip;
              let sync, top = this.top, oldNeedsBlock = this.needsBlock;
              if ($59526ec4d3b41406$var$blockTags.hasOwnProperty(name)) {
                  if (top.content.length && top.content[0].isInline && this.open) {
                      this.open--;
                      top = this.top;
                  }
                  sync = true;
                  if (!top.type) this.needsBlock = true;
              } else if (!dom.firstChild) {
                  this.leafFallback(dom);
                  return;
              }
              if (rule && rule.skip) this.addAll(dom);
              else this.withStyleRules(dom, ()=>this.addAll(dom));
              if (sync) this.sync(top);
              this.needsBlock = oldNeedsBlock;
          } else this.withStyleRules(dom, ()=>{
              this.addElementByRule(dom, rule, rule.consuming === false ? ruleID : undefined);
          });
      }
      // Called for leaf DOM nodes that would otherwise be ignored
      leafFallback(dom) {
          if (dom.nodeName == "BR" && this.top.type && this.top.type.inlineContent) this.addTextNode(dom.ownerDocument.createTextNode("\n"));
      }
      // Called for ignored nodes
      ignoreFallback(dom) {
          // Ignored BR nodes should at least create an inline context
          if (dom.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent)) this.findPlace(this.parser.schema.text("-"));
      }
      // Run any style parser associated with the node's styles. Either
      // return an array of marks, or null to indicate some of the styles
      // had a rule with `ignore` set.
      readStyles(styles) {
          let add = $59526ec4d3b41406$export$c9d15bcfc6d42044.none, remove = $59526ec4d3b41406$export$c9d15bcfc6d42044.none;
          for(let i = 0; i < styles.length; i += 2)for(let after = undefined;;){
              let rule = this.parser.matchStyle(styles[i], styles[i + 1], this, after);
              if (!rule) break;
              if (rule.ignore) return null;
              if (rule.clearMark) this.top.pendingMarks.concat(this.top.activeMarks).forEach((m)=>{
                  if (rule.clearMark(m)) remove = m.addToSet(remove);
              });
              else add = this.parser.schema.marks[rule.mark].create(rule.attrs).addToSet(add);
              if (rule.consuming === false) after = rule;
              else break;
          }
          return [
              add,
              remove
          ];
      }
      // Look up a handler for the given node. If none are found, return
      // false. Otherwise, apply it, use its return value to drive the way
      // the node's content is wrapped, and return true.
      addElementByRule(dom, rule, continueAfter) {
          let sync, nodeType, mark;
          if (rule.node) {
              nodeType = this.parser.schema.nodes[rule.node];
              if (!nodeType.isLeaf) sync = this.enter(nodeType, rule.attrs || null, rule.preserveWhitespace);
              else if (!this.insertNode(nodeType.create(rule.attrs))) this.leafFallback(dom);
          } else {
              let markType = this.parser.schema.marks[rule.mark];
              mark = markType.create(rule.attrs);
              this.addPendingMark(mark);
          }
          let startIn = this.top;
          if (nodeType && nodeType.isLeaf) this.findInside(dom);
          else if (continueAfter) this.addElement(dom, continueAfter);
          else if (rule.getContent) {
              this.findInside(dom);
              rule.getContent(dom, this.parser.schema).forEach((node)=>this.insertNode(node));
          } else {
              let contentDOM = dom;
              if (typeof rule.contentElement == "string") contentDOM = dom.querySelector(rule.contentElement);
              else if (typeof rule.contentElement == "function") contentDOM = rule.contentElement(dom);
              else if (rule.contentElement) contentDOM = rule.contentElement;
              this.findAround(dom, contentDOM, true);
              this.addAll(contentDOM);
          }
          if (sync && this.sync(startIn)) this.open--;
          if (mark) this.removePendingMark(mark, startIn);
      }
      // Add all child nodes between `startIndex` and `endIndex` (or the
      // whole node, if not given). If `sync` is passed, use it to
      // synchronize after every block element.
      addAll(parent, startIndex, endIndex) {
          let index = startIndex || 0;
          for(let dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild, end = endIndex == null ? null : parent.childNodes[endIndex]; dom != end; dom = dom.nextSibling, ++index){
              this.findAtPoint(parent, index);
              this.addDOM(dom);
          }
          this.findAtPoint(parent, index);
      }
      // Try to find a way to fit the given node type into the current
      // context. May add intermediate wrappers and/or leave non-solid
      // nodes that we're in.
      findPlace(node) {
          let route, sync;
          for(let depth = this.open; depth >= 0; depth--){
              let cx = this.nodes[depth];
              let found = cx.findWrapping(node);
              if (found && (!route || route.length > found.length)) {
                  route = found;
                  sync = cx;
                  if (!found.length) break;
              }
              if (cx.solid) break;
          }
          if (!route) return false;
          this.sync(sync);
          for(let i = 0; i < route.length; i++)this.enterInner(route[i], null, false);
          return true;
      }
      // Try to insert the given node, adjusting the context when needed.
      insertNode(node) {
          if (node.isInline && this.needsBlock && !this.top.type) {
              let block = this.textblockFromContext();
              if (block) this.enterInner(block);
          }
          if (this.findPlace(node)) {
              this.closeExtra();
              let top = this.top;
              top.applyPending(node.type);
              if (top.match) top.match = top.match.matchType(node.type);
              let marks = top.activeMarks;
              for(let i = 0; i < node.marks.length; i++)if (!top.type || top.type.allowsMarkType(node.marks[i].type)) marks = node.marks[i].addToSet(marks);
              top.content.push(node.mark(marks));
              return true;
          }
          return false;
      }
      // Try to start a node of the given type, adjusting the context when
      // necessary.
      enter(type, attrs, preserveWS) {
          let ok = this.findPlace(type.create(attrs));
          if (ok) this.enterInner(type, attrs, true, preserveWS);
          return ok;
      }
      // Open a node of the given type
      enterInner(type, attrs = null, solid = false, preserveWS) {
          this.closeExtra();
          let top = this.top;
          top.applyPending(type);
          top.match = top.match && top.match.matchType(type);
          let options = $59526ec4d3b41406$var$wsOptionsFor(type, preserveWS, top.options);
          if (top.options & $59526ec4d3b41406$var$OPT_OPEN_LEFT && top.content.length == 0) options |= $59526ec4d3b41406$var$OPT_OPEN_LEFT;
          this.nodes.push(new $59526ec4d3b41406$var$NodeContext(type, attrs, top.activeMarks, top.pendingMarks, solid, null, options));
          this.open++;
      }
      // Make sure all nodes above this.open are finished and added to
      // their parents
      closeExtra(openEnd = false) {
          let i = this.nodes.length - 1;
          if (i > this.open) {
              for(; i > this.open; i--)this.nodes[i - 1].content.push(this.nodes[i].finish(openEnd));
              this.nodes.length = this.open + 1;
          }
      }
      finish() {
          this.open = 0;
          this.closeExtra(this.isOpen);
          return this.nodes[0].finish(this.isOpen || this.options.topOpen);
      }
      sync(to) {
          for(let i = this.open; i >= 0; i--)if (this.nodes[i] == to) {
              this.open = i;
              return true;
          }
          return false;
      }
      get currentPos() {
          this.closeExtra();
          let pos = 0;
          for(let i = this.open; i >= 0; i--){
              let content = this.nodes[i].content;
              for(let j = content.length - 1; j >= 0; j--)pos += content[j].nodeSize;
              if (i) pos++;
          }
          return pos;
      }
      findAtPoint(parent, offset) {
          if (this.find) {
              for(let i = 0; i < this.find.length; i++)if (this.find[i].node == parent && this.find[i].offset == offset) this.find[i].pos = this.currentPos;
          }
      }
      findInside(parent) {
          if (this.find) {
              for(let i = 0; i < this.find.length; i++)if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) this.find[i].pos = this.currentPos;
          }
      }
      findAround(parent, content, before) {
          if (parent != content && this.find) {
              for(let i = 0; i < this.find.length; i++)if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) {
                  let pos = content.compareDocumentPosition(this.find[i].node);
                  if (pos & (before ? 2 : 4)) this.find[i].pos = this.currentPos;
              }
          }
      }
      findInText(textNode) {
          if (this.find) {
              for(let i = 0; i < this.find.length; i++)if (this.find[i].node == textNode) this.find[i].pos = this.currentPos - (textNode.nodeValue.length - this.find[i].offset);
          }
      }
      // Determines whether the given context string matches this context.
      matchesContext(context) {
          if (context.indexOf("|") > -1) return context.split(/\s*\|\s*/).some(this.matchesContext, this);
          let parts = context.split("/");
          let option = this.options.context;
          let useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
          let minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
          let match = (i, depth)=>{
              for(; i >= 0; i--){
                  let part = parts[i];
                  if (part == "") {
                      if (i == parts.length - 1 || i == 0) continue;
                      for(; depth >= minDepth; depth--)if (match(i - 1, depth)) return true;
                      return false;
                  } else {
                      let next = depth > 0 || depth == 0 && useRoot ? this.nodes[depth].type : option && depth >= minDepth ? option.node(depth - minDepth).type : null;
                      if (!next || next.name != part && next.groups.indexOf(part) == -1) return false;
                      depth--;
                  }
              }
              return true;
          };
          return match(parts.length - 1, this.open);
      }
      textblockFromContext() {
          let $context = this.options.context;
          if ($context) for(let d = $context.depth; d >= 0; d--){
              let deflt = $context.node(d).contentMatchAt($context.indexAfter(d)).defaultType;
              if (deflt && deflt.isTextblock && deflt.defaultAttrs) return deflt;
          }
          for(let name in this.parser.schema.nodes){
              let type = this.parser.schema.nodes[name];
              if (type.isTextblock && type.defaultAttrs) return type;
          }
      }
      addPendingMark(mark) {
          let found = $59526ec4d3b41406$var$findSameMarkInSet(mark, this.top.pendingMarks);
          if (found) this.top.stashMarks.push(found);
          this.top.pendingMarks = mark.addToSet(this.top.pendingMarks);
      }
      removePendingMark(mark, upto) {
          for(let depth = this.open; depth >= 0; depth--){
              let level = this.nodes[depth];
              let found = level.pendingMarks.lastIndexOf(mark);
              if (found > -1) level.pendingMarks = mark.removeFromSet(level.pendingMarks);
              else {
                  level.activeMarks = mark.removeFromSet(level.activeMarks);
                  let stashMark = level.popFromStashMark(mark);
                  if (stashMark && level.type && level.type.allowsMarkType(stashMark.type)) level.activeMarks = stashMark.addToSet(level.activeMarks);
              }
              if (level == upto) break;
          }
      }
  }
  // Kludge to work around directly nested list nodes produced by some
  // tools and allowed by browsers to mean that the nested list is
  // actually part of the list item above it.
  function $59526ec4d3b41406$var$normalizeList(dom) {
      for(let child = dom.firstChild, prevItem = null; child; child = child.nextSibling){
          let name = child.nodeType == 1 ? child.nodeName.toLowerCase() : null;
          if (name && $59526ec4d3b41406$var$listTags.hasOwnProperty(name) && prevItem) {
              prevItem.appendChild(child);
              child = prevItem;
          } else if (name == "li") prevItem = child;
          else if (name) prevItem = null;
      }
  }
  // Apply a CSS selector.
  function $59526ec4d3b41406$var$matches(dom, selector) {
      return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector);
  }
  // Tokenize a style attribute into property/value pairs.
  function $59526ec4d3b41406$var$parseStyles(style) {
      let re = /\s*([\w-]+)\s*:\s*([^;]+)/g, m, result = [];
      while(m = re.exec(style))result.push(m[1], m[2].trim());
      return result;
  }
  function $59526ec4d3b41406$var$copy(obj) {
      let copy = {};
      for(let prop in obj)copy[prop] = obj[prop];
      return copy;
  }
  // Used when finding a mark at the top level of a fragment parse.
  // Checks whether it would be reasonable to apply a given mark type to
  // a given node, by looking at the way the mark occurs in the schema.
  function $59526ec4d3b41406$var$markMayApply(markType, nodeType) {
      let nodes = nodeType.schema.nodes;
      for(let name in nodes){
          let parent = nodes[name];
          if (!parent.allowsMarkType(markType)) continue;
          let seen = [], scan = (match)=>{
              seen.push(match);
              for(let i = 0; i < match.edgeCount; i++){
                  let { type: type, next: next } = match.edge(i);
                  if (type == nodeType) return true;
                  if (seen.indexOf(next) < 0 && scan(next)) return true;
              }
          };
          if (scan(parent.contentMatch)) return true;
      }
  }
  function $59526ec4d3b41406$var$findSameMarkInSet(mark, set) {
      for(let i = 0; i < set.length; i++){
          if (mark.eq(set[i])) return set[i];
      }
  }
  /**
  A DOM serializer knows how to convert ProseMirror nodes and
  marks of various types to DOM nodes.
  */ class $59526ec4d3b41406$export$3476b78f8f5a8b72 {
      /**
      Create a serializer. `nodes` should map node names to functions
      that take a node and return a description of the corresponding
      DOM. `marks` does the same for mark names, but also gets an
      argument that tells it whether the mark's content is block or
      inline content (for typical use, it'll always be inline). A mark
      serializer may be `null` to indicate that marks of that type
      should not be serialized.
      */ constructor(/**
      The node serialization functions.
      */ nodes, /**
      The mark serialization functions.
      */ marks){
          this.nodes = nodes;
          this.marks = marks;
      }
      /**
      Serialize the content of this fragment to a DOM fragment. When
      not in the browser, the `document` option, containing a DOM
      document, should be passed so that the serializer can create
      nodes.
      */ serializeFragment(fragment, options = {}, target) {
          if (!target) target = $59526ec4d3b41406$var$doc(options).createDocumentFragment();
          let top = target, active = [];
          fragment.forEach((node)=>{
              if (active.length || node.marks.length) {
                  let keep = 0, rendered = 0;
                  while(keep < active.length && rendered < node.marks.length){
                      let next = node.marks[rendered];
                      if (!this.marks[next.type.name]) {
                          rendered++;
                          continue;
                      }
                      if (!next.eq(active[keep][0]) || next.type.spec.spanning === false) break;
                      keep++;
                      rendered++;
                  }
                  while(keep < active.length)top = active.pop()[1];
                  while(rendered < node.marks.length){
                      let add = node.marks[rendered++];
                      let markDOM = this.serializeMark(add, node.isInline, options);
                      if (markDOM) {
                          active.push([
                              add,
                              top
                          ]);
                          top.appendChild(markDOM.dom);
                          top = markDOM.contentDOM || markDOM.dom;
                      }
                  }
              }
              top.appendChild(this.serializeNodeInner(node, options));
          });
          return target;
      }
      /**
      @internal
      */ serializeNodeInner(node, options) {
          let { dom: dom, contentDOM: contentDOM } = $59526ec4d3b41406$export$3476b78f8f5a8b72.renderSpec($59526ec4d3b41406$var$doc(options), this.nodes[node.type.name](node));
          if (contentDOM) {
              if (node.isLeaf) throw new RangeError("Content hole not allowed in a leaf node spec");
              this.serializeFragment(node.content, options, contentDOM);
          }
          return dom;
      }
      /**
      Serialize this node to a DOM node. This can be useful when you
      need to serialize a part of a document, as opposed to the whole
      document. To serialize a whole document, use
      [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
      its [content](https://prosemirror.net/docs/ref/#model.Node.content).
      */ serializeNode(node, options = {}) {
          let dom = this.serializeNodeInner(node, options);
          for(let i = node.marks.length - 1; i >= 0; i--){
              let wrap = this.serializeMark(node.marks[i], node.isInline, options);
              if (wrap) {
                  (wrap.contentDOM || wrap.dom).appendChild(dom);
                  dom = wrap.dom;
              }
          }
          return dom;
      }
      /**
      @internal
      */ serializeMark(mark, inline, options = {}) {
          let toDOM = this.marks[mark.type.name];
          return toDOM && $59526ec4d3b41406$export$3476b78f8f5a8b72.renderSpec($59526ec4d3b41406$var$doc(options), toDOM(mark, inline));
      }
      /**
      Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
      the spec has a hole (zero) in it, `contentDOM` will point at the
      node with the hole.
      */ static renderSpec(doc, structure, xmlNS = null) {
          if (typeof structure == "string") return {
              dom: doc.createTextNode(structure)
          };
          if (structure.nodeType != null) return {
              dom: structure
          };
          if (structure.dom && structure.dom.nodeType != null) return structure;
          let tagName = structure[0], space = tagName.indexOf(" ");
          if (space > 0) {
              xmlNS = tagName.slice(0, space);
              tagName = tagName.slice(space + 1);
          }
          let contentDOM;
          let dom = xmlNS ? doc.createElementNS(xmlNS, tagName) : doc.createElement(tagName);
          let attrs = structure[1], start = 1;
          if (attrs && typeof attrs == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
              start = 2;
              for(let name in attrs)if (attrs[name] != null) {
                  let space = name.indexOf(" ");
                  if (space > 0) dom.setAttributeNS(name.slice(0, space), name.slice(space + 1), attrs[name]);
                  else dom.setAttribute(name, attrs[name]);
              }
          }
          for(let i = start; i < structure.length; i++){
              let child = structure[i];
              if (child === 0) {
                  if (i < structure.length - 1 || i > start) throw new RangeError("Content hole must be the only child of its parent node");
                  return {
                      dom: dom,
                      contentDOM: dom
                  };
              } else {
                  let { dom: inner, contentDOM: innerContent } = $59526ec4d3b41406$export$3476b78f8f5a8b72.renderSpec(doc, child, xmlNS);
                  dom.appendChild(inner);
                  if (innerContent) {
                      if (contentDOM) throw new RangeError("Multiple content holes");
                      contentDOM = innerContent;
                  }
              }
          }
          return {
              dom: dom,
              contentDOM: contentDOM
          };
      }
      /**
      Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
      properties in a schema's node and mark specs.
      */ static fromSchema(schema) {
          return schema.cached.domSerializer || (schema.cached.domSerializer = new $59526ec4d3b41406$export$3476b78f8f5a8b72(this.nodesFromSchema(schema), this.marksFromSchema(schema)));
      }
      /**
      Gather the serializers in a schema's node specs into an object.
      This can be useful as a base to build a custom serializer from.
      */ static nodesFromSchema(schema) {
          let result = $59526ec4d3b41406$var$gatherToDOM(schema.nodes);
          if (!result.text) result.text = (node)=>node.text;
          return result;
      }
      /**
      Gather the serializers in a schema's mark specs into an object.
      */ static marksFromSchema(schema) {
          return $59526ec4d3b41406$var$gatherToDOM(schema.marks);
      }
  }
  function $59526ec4d3b41406$var$gatherToDOM(obj) {
      let result = {};
      for(let name in obj){
          let toDOM = obj[name].spec.toDOM;
          if (toDOM) result[name] = toDOM;
      }
      return result;
  }
  function $59526ec4d3b41406$var$doc(options) {
      return options.document || window.document;
  }
  
  
  var $77b6a7383a1cf23c$exports = {};
  
  $parcel$export($77b6a7383a1cf23c$exports, "MapResult", () => $77b6a7383a1cf23c$export$c77c9be41668e9b4);
  $parcel$export($77b6a7383a1cf23c$exports, "StepMap", () => $77b6a7383a1cf23c$export$c53d01c3ab9721b3);
  $parcel$export($77b6a7383a1cf23c$exports, "Mapping", () => $77b6a7383a1cf23c$export$f5f785078011b62);
  $parcel$export($77b6a7383a1cf23c$exports, "Step", () => $77b6a7383a1cf23c$export$fd55ce593607084a);
  $parcel$export($77b6a7383a1cf23c$exports, "StepResult", () => $77b6a7383a1cf23c$export$8ebf1578a4199c09);
  $parcel$export($77b6a7383a1cf23c$exports, "AddMarkStep", () => $77b6a7383a1cf23c$export$d24ba56b0e3464a9);
  $parcel$export($77b6a7383a1cf23c$exports, "RemoveMarkStep", () => $77b6a7383a1cf23c$export$94150db1311f67a9);
  $parcel$export($77b6a7383a1cf23c$exports, "AddNodeMarkStep", () => $77b6a7383a1cf23c$export$adefd16c402fee4e);
  $parcel$export($77b6a7383a1cf23c$exports, "RemoveNodeMarkStep", () => $77b6a7383a1cf23c$export$fdf7d1dc10724da2);
  $parcel$export($77b6a7383a1cf23c$exports, "ReplaceStep", () => $77b6a7383a1cf23c$export$5c860b2e74034756);
  $parcel$export($77b6a7383a1cf23c$exports, "ReplaceAroundStep", () => $77b6a7383a1cf23c$export$444ba800d6024a98);
  $parcel$export($77b6a7383a1cf23c$exports, "liftTarget", () => $77b6a7383a1cf23c$export$f1508b72cc76a09e);
  $parcel$export($77b6a7383a1cf23c$exports, "findWrapping", () => $77b6a7383a1cf23c$export$118cb9a83e81ba37);
  $parcel$export($77b6a7383a1cf23c$exports, "canSplit", () => $77b6a7383a1cf23c$export$5aaf008897aef029);
  $parcel$export($77b6a7383a1cf23c$exports, "canJoin", () => $77b6a7383a1cf23c$export$f15f89fd9d8cc98a);
  $parcel$export($77b6a7383a1cf23c$exports, "joinPoint", () => $77b6a7383a1cf23c$export$41b1d4cb5ceb3147);
  $parcel$export($77b6a7383a1cf23c$exports, "insertPoint", () => $77b6a7383a1cf23c$export$64cb316d02de1dd1);
  $parcel$export($77b6a7383a1cf23c$exports, "dropPoint", () => $77b6a7383a1cf23c$export$2819d598d048fc9c);
  $parcel$export($77b6a7383a1cf23c$exports, "replaceStep", () => $77b6a7383a1cf23c$export$ed6ac67359824afd);
  $parcel$export($77b6a7383a1cf23c$exports, "AttrStep", () => $77b6a7383a1cf23c$export$626399c38172f669);
  $parcel$export($77b6a7383a1cf23c$exports, "TransformError", () => $77b6a7383a1cf23c$export$88cc3a1dfce48dd3);
  $parcel$export($77b6a7383a1cf23c$exports, "Transform", () => $77b6a7383a1cf23c$export$563a914cafbdc389);
  
  // Recovery values encode a range index and an offset. They are
  // represented as numbers, because tons of them will be created when
  // mapping, for example, a large number of decorations. The number's
  // lower 16 bits provide the index, the remaining bits the offset.
  //
  // Note: We intentionally don't use bit shift operators to en- and
  // decode these, since those clip to 32 bits, which we might in rare
  // cases want to overflow. A 64-bit float can represent 48-bit
  // integers precisely.
  const $77b6a7383a1cf23c$var$lower16 = 0xffff;
  const $77b6a7383a1cf23c$var$factor16 = Math.pow(2, 16);
  function $77b6a7383a1cf23c$var$makeRecover(index, offset) {
      return index + offset * $77b6a7383a1cf23c$var$factor16;
  }
  function $77b6a7383a1cf23c$var$recoverIndex(value) {
      return value & $77b6a7383a1cf23c$var$lower16;
  }
  function $77b6a7383a1cf23c$var$recoverOffset(value) {
      return (value - (value & $77b6a7383a1cf23c$var$lower16)) / $77b6a7383a1cf23c$var$factor16;
  }
  const $77b6a7383a1cf23c$var$DEL_BEFORE = 1, $77b6a7383a1cf23c$var$DEL_AFTER = 2, $77b6a7383a1cf23c$var$DEL_ACROSS = 4, $77b6a7383a1cf23c$var$DEL_SIDE = 8;
  /**
  An object representing a mapped position with extra
  information.
  */ class $77b6a7383a1cf23c$export$c77c9be41668e9b4 {
      /**
      @internal
      */ constructor(/**
      The mapped version of the position.
      */ pos, /**
      @internal
      */ delInfo, /**
      @internal
      */ recover){
          this.pos = pos;
          this.delInfo = delInfo;
          this.recover = recover;
      }
      /**
      Tells you whether the position was deleted, that is, whether the
      step removed the token on the side queried (via the `assoc`)
      argument from the document.
      */ get deleted() {
          return (this.delInfo & $77b6a7383a1cf23c$var$DEL_SIDE) > 0;
      }
      /**
      Tells you whether the token before the mapped position was deleted.
      */ get deletedBefore() {
          return (this.delInfo & ($77b6a7383a1cf23c$var$DEL_BEFORE | $77b6a7383a1cf23c$var$DEL_ACROSS)) > 0;
      }
      /**
      True when the token after the mapped position was deleted.
      */ get deletedAfter() {
          return (this.delInfo & ($77b6a7383a1cf23c$var$DEL_AFTER | $77b6a7383a1cf23c$var$DEL_ACROSS)) > 0;
      }
      /**
      Tells whether any of the steps mapped through deletes across the
      position (including both the token before and after the
      position).
      */ get deletedAcross() {
          return (this.delInfo & $77b6a7383a1cf23c$var$DEL_ACROSS) > 0;
      }
  }
  /**
  A map describing the deletions and insertions made by a step, which
  can be used to find the correspondence between positions in the
  pre-step version of a document and the same position in the
  post-step version.
  */ class $77b6a7383a1cf23c$export$c53d01c3ab9721b3 {
      /**
      Create a position map. The modifications to the document are
      represented as an array of numbers, in which each group of three
      represents a modified chunk as `[start, oldSize, newSize]`.
      */ constructor(/**
      @internal
      */ ranges, /**
      @internal
      */ inverted = false){
          this.ranges = ranges;
          this.inverted = inverted;
          if (!ranges.length && $77b6a7383a1cf23c$export$c53d01c3ab9721b3.empty) return $77b6a7383a1cf23c$export$c53d01c3ab9721b3.empty;
      }
      /**
      @internal
      */ recover(value) {
          let diff = 0, index = $77b6a7383a1cf23c$var$recoverIndex(value);
          if (!this.inverted) for(let i = 0; i < index; i++)diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
          return this.ranges[index * 3] + diff + $77b6a7383a1cf23c$var$recoverOffset(value);
      }
      mapResult(pos, assoc = 1) {
          return this._map(pos, assoc, false);
      }
      map(pos, assoc = 1) {
          return this._map(pos, assoc, true);
      }
      /**
      @internal
      */ _map(pos, assoc, simple) {
          let diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
          for(let i = 0; i < this.ranges.length; i += 3){
              let start = this.ranges[i] - (this.inverted ? diff : 0);
              if (start > pos) break;
              let oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex], end = start + oldSize;
              if (pos <= end) {
                  let side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
                  let result = start + diff + (side < 0 ? 0 : newSize);
                  if (simple) return result;
                  let recover = pos == (assoc < 0 ? start : end) ? null : $77b6a7383a1cf23c$var$makeRecover(i / 3, pos - start);
                  let del = pos == start ? $77b6a7383a1cf23c$var$DEL_AFTER : pos == end ? $77b6a7383a1cf23c$var$DEL_BEFORE : $77b6a7383a1cf23c$var$DEL_ACROSS;
                  if (assoc < 0 ? pos != start : pos != end) del |= $77b6a7383a1cf23c$var$DEL_SIDE;
                  return new $77b6a7383a1cf23c$export$c77c9be41668e9b4(result, del, recover);
              }
              diff += newSize - oldSize;
          }
          return simple ? pos + diff : new $77b6a7383a1cf23c$export$c77c9be41668e9b4(pos + diff, 0, null);
      }
      /**
      @internal
      */ touches(pos, recover) {
          let diff = 0, index = $77b6a7383a1cf23c$var$recoverIndex(recover);
          let oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
          for(let i = 0; i < this.ranges.length; i += 3){
              let start = this.ranges[i] - (this.inverted ? diff : 0);
              if (start > pos) break;
              let oldSize = this.ranges[i + oldIndex], end = start + oldSize;
              if (pos <= end && i == index * 3) return true;
              diff += this.ranges[i + newIndex] - oldSize;
          }
          return false;
      }
      /**
      Calls the given function on each of the changed ranges included in
      this map.
      */ forEach(f) {
          let oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
          for(let i = 0, diff = 0; i < this.ranges.length; i += 3){
              let start = this.ranges[i], oldStart = start - (this.inverted ? diff : 0), newStart = start + (this.inverted ? 0 : diff);
              let oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex];
              f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
              diff += newSize - oldSize;
          }
      }
      /**
      Create an inverted version of this map. The result can be used to
      map positions in the post-step document to the pre-step document.
      */ invert() {
          return new $77b6a7383a1cf23c$export$c53d01c3ab9721b3(this.ranges, !this.inverted);
      }
      /**
      @internal
      */ toString() {
          return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
      }
      /**
      Create a map that moves all positions by offset `n` (which may be
      negative). This can be useful when applying steps meant for a
      sub-document to a larger document, or vice-versa.
      */ static offset(n) {
          return n == 0 ? $77b6a7383a1cf23c$export$c53d01c3ab9721b3.empty : new $77b6a7383a1cf23c$export$c53d01c3ab9721b3(n < 0 ? [
              0,
              -n,
              0
          ] : [
              0,
              0,
              n
          ]);
      }
  }
  /**
  A StepMap that contains no changed ranges.
  */ $77b6a7383a1cf23c$export$c53d01c3ab9721b3.empty = new $77b6a7383a1cf23c$export$c53d01c3ab9721b3([]);
  /**
  A mapping represents a pipeline of zero or more [step
  maps](https://prosemirror.net/docs/ref/#transform.StepMap). It has special provisions for losslessly
  handling mapping positions through a series of steps in which some
  steps are inverted versions of earlier steps. (This comes up when
  ‘[rebasing](/docs/guide/#transform.rebasing)’ steps for
  collaboration or history management.)
  */ class $77b6a7383a1cf23c$export$f5f785078011b62 {
      /**
      Create a new mapping with the given position maps.
      */ constructor(/**
      The step maps in this mapping.
      */ maps = [], /**
      @internal
      */ mirror, /**
      The starting position in the `maps` array, used when `map` or
      `mapResult` is called.
      */ from = 0, /**
      The end position in the `maps` array.
      */ to = maps.length){
          this.maps = maps;
          this.mirror = mirror;
          this.from = from;
          this.to = to;
      }
      /**
      Create a mapping that maps only through a part of this one.
      */ slice(from = 0, to = this.maps.length) {
          return new $77b6a7383a1cf23c$export$f5f785078011b62(this.maps, this.mirror, from, to);
      }
      /**
      @internal
      */ copy() {
          return new $77b6a7383a1cf23c$export$f5f785078011b62(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
      }
      /**
      Add a step map to the end of this mapping. If `mirrors` is
      given, it should be the index of the step map that is the mirror
      image of this one.
      */ appendMap(map, mirrors) {
          this.to = this.maps.push(map);
          if (mirrors != null) this.setMirror(this.maps.length - 1, mirrors);
      }
      /**
      Add all the step maps in a given mapping to this one (preserving
      mirroring information).
      */ appendMapping(mapping) {
          for(let i = 0, startSize = this.maps.length; i < mapping.maps.length; i++){
              let mirr = mapping.getMirror(i);
              this.appendMap(mapping.maps[i], mirr != null && mirr < i ? startSize + mirr : undefined);
          }
      }
      /**
      Finds the offset of the step map that mirrors the map at the
      given offset, in this mapping (as per the second argument to
      `appendMap`).
      */ getMirror(n) {
          if (this.mirror) {
              for(let i = 0; i < this.mirror.length; i++)if (this.mirror[i] == n) return this.mirror[i + (i % 2 ? -1 : 1)];
          }
      }
      /**
      @internal
      */ setMirror(n, m) {
          if (!this.mirror) this.mirror = [];
          this.mirror.push(n, m);
      }
      /**
      Append the inverse of the given mapping to this one.
      */ appendMappingInverted(mapping) {
          for(let i = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i >= 0; i--){
              let mirr = mapping.getMirror(i);
              this.appendMap(mapping.maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : undefined);
          }
      }
      /**
      Create an inverted version of this mapping.
      */ invert() {
          let inverse = new $77b6a7383a1cf23c$export$f5f785078011b62;
          inverse.appendMappingInverted(this);
          return inverse;
      }
      /**
      Map a position through this mapping.
      */ map(pos, assoc = 1) {
          if (this.mirror) return this._map(pos, assoc, true);
          for(let i = this.from; i < this.to; i++)pos = this.maps[i].map(pos, assoc);
          return pos;
      }
      /**
      Map a position through this mapping, returning a mapping
      result.
      */ mapResult(pos, assoc = 1) {
          return this._map(pos, assoc, false);
      }
      /**
      @internal
      */ _map(pos, assoc, simple) {
          let delInfo = 0;
          for(let i = this.from; i < this.to; i++){
              let map = this.maps[i], result = map.mapResult(pos, assoc);
              if (result.recover != null) {
                  let corr = this.getMirror(i);
                  if (corr != null && corr > i && corr < this.to) {
                      i = corr;
                      pos = this.maps[corr].recover(result.recover);
                      continue;
                  }
              }
              delInfo |= result.delInfo;
              pos = result.pos;
          }
          return simple ? pos : new $77b6a7383a1cf23c$export$c77c9be41668e9b4(pos, delInfo, null);
      }
  }
  const $77b6a7383a1cf23c$var$stepsByID = Object.create(null);
  /**
  A step object represents an atomic change. It generally applies
  only to the document it was created for, since the positions
  stored in it will only make sense for that document.
  
  New steps are defined by creating classes that extend `Step`,
  overriding the `apply`, `invert`, `map`, `getMap` and `fromJSON`
  methods, and registering your class with a unique
  JSON-serialization identifier using
  [`Step.jsonID`](https://prosemirror.net/docs/ref/#transform.Step^jsonID).
  */ class $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Get the step map that represents the changes made by this step,
      and which can be used to transform between positions in the old
      and the new document.
      */ getMap() {
          return $77b6a7383a1cf23c$export$c53d01c3ab9721b3.empty;
      }
      /**
      Try to merge this step with another one, to be applied directly
      after it. Returns the merged step when possible, null if the
      steps can't be merged.
      */ merge(other) {
          return null;
      }
      /**
      Deserialize a step from its JSON representation. Will call
      through to the step class' own implementation of this method.
      */ static fromJSON(schema, json) {
          if (!json || !json.stepType) throw new RangeError("Invalid input for Step.fromJSON");
          let type = $77b6a7383a1cf23c$var$stepsByID[json.stepType];
          if (!type) throw new RangeError(`No step type ${json.stepType} defined`);
          return type.fromJSON(schema, json);
      }
      /**
      To be able to serialize steps to JSON, each step needs a string
      ID to attach to its JSON representation. Use this method to
      register an ID for your step classes. Try to pick something
      that's unlikely to clash with steps from other modules.
      */ static jsonID(id, stepClass) {
          if (id in $77b6a7383a1cf23c$var$stepsByID) throw new RangeError("Duplicate use of step JSON ID " + id);
          $77b6a7383a1cf23c$var$stepsByID[id] = stepClass;
          stepClass.prototype.jsonID = id;
          return stepClass;
      }
  }
  /**
  The result of [applying](https://prosemirror.net/docs/ref/#transform.Step.apply) a step. Contains either a
  new document or a failure value.
  */ class $77b6a7383a1cf23c$export$8ebf1578a4199c09 {
      /**
      @internal
      */ constructor(/**
      The transformed document, if successful.
      */ doc, /**
      The failure message, if unsuccessful.
      */ failed){
          this.doc = doc;
          this.failed = failed;
      }
      /**
      Create a successful step result.
      */ static ok(doc) {
          return new $77b6a7383a1cf23c$export$8ebf1578a4199c09(doc, null);
      }
      /**
      Create a failed step result.
      */ static fail(message) {
          return new $77b6a7383a1cf23c$export$8ebf1578a4199c09(null, message);
      }
      /**
      Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
      arguments. Create a successful result if it succeeds, and a
      failed one if it throws a `ReplaceError`.
      */ static fromReplace(doc, from, to, slice) {
          try {
              return $77b6a7383a1cf23c$export$8ebf1578a4199c09.ok(doc.replace(from, to, slice));
          } catch (e) {
              if (e instanceof (0, $59526ec4d3b41406$export$6de0e778727af3f2)) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail(e.message);
              throw e;
          }
      }
  }
  function $77b6a7383a1cf23c$var$mapFragment(fragment, f, parent) {
      let mapped = [];
      for(let i = 0; i < fragment.childCount; i++){
          let child = fragment.child(i);
          if (child.content.size) child = child.copy($77b6a7383a1cf23c$var$mapFragment(child.content, f, child));
          if (child.isInline) child = f(child, parent, i);
          mapped.push(child);
      }
      return (0, $59526ec4d3b41406$export$ffb0004e005737fa).fromArray(mapped);
  }
  /**
  Add a mark to all inline content between two positions.
  */ class $77b6a7383a1cf23c$export$d24ba56b0e3464a9 extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Create a mark step.
      */ constructor(/**
      The start of the marked range.
      */ from, /**
      The end of the marked range.
      */ to, /**
      The mark to add.
      */ mark){
          super();
          this.from = from;
          this.to = to;
          this.mark = mark;
      }
      apply(doc) {
          let oldSlice = doc.slice(this.from, this.to), $from = doc.resolve(this.from);
          let parent = $from.node($from.sharedDepth(this.to));
          let slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$mapFragment(oldSlice.content, (node, parent)=>{
              if (!node.isAtom || !parent.type.allowsMarkType(this.mark.type)) return node;
              return node.mark(this.mark.addToSet(node.marks));
          }, parent), oldSlice.openStart, oldSlice.openEnd);
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.from, this.to, slice);
      }
      invert() {
          return new $77b6a7383a1cf23c$export$94150db1311f67a9(this.from, this.to, this.mark);
      }
      map(mapping) {
          let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
          if (from.deleted && to.deleted || from.pos >= to.pos) return null;
          return new $77b6a7383a1cf23c$export$d24ba56b0e3464a9(from.pos, to.pos, this.mark);
      }
      merge(other) {
          if (other instanceof $77b6a7383a1cf23c$export$d24ba56b0e3464a9 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) return new $77b6a7383a1cf23c$export$d24ba56b0e3464a9(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
          return null;
      }
      toJSON() {
          return {
              stepType: "addMark",
              mark: this.mark.toJSON(),
              from: this.from,
              to: this.to
          };
      }
      /**
      @internal
      */ static fromJSON(schema, json) {
          if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for AddMarkStep.fromJSON");
          return new $77b6a7383a1cf23c$export$d24ba56b0e3464a9(json.from, json.to, schema.markFromJSON(json.mark));
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("addMark", $77b6a7383a1cf23c$export$d24ba56b0e3464a9);
  /**
  Remove a mark from all inline content between two positions.
  */ class $77b6a7383a1cf23c$export$94150db1311f67a9 extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Create a mark-removing step.
      */ constructor(/**
      The start of the unmarked range.
      */ from, /**
      The end of the unmarked range.
      */ to, /**
      The mark to remove.
      */ mark){
          super();
          this.from = from;
          this.to = to;
          this.mark = mark;
      }
      apply(doc) {
          let oldSlice = doc.slice(this.from, this.to);
          let slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$mapFragment(oldSlice.content, (node)=>{
              return node.mark(this.mark.removeFromSet(node.marks));
          }, doc), oldSlice.openStart, oldSlice.openEnd);
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.from, this.to, slice);
      }
      invert() {
          return new $77b6a7383a1cf23c$export$d24ba56b0e3464a9(this.from, this.to, this.mark);
      }
      map(mapping) {
          let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
          if (from.deleted && to.deleted || from.pos >= to.pos) return null;
          return new $77b6a7383a1cf23c$export$94150db1311f67a9(from.pos, to.pos, this.mark);
      }
      merge(other) {
          if (other instanceof $77b6a7383a1cf23c$export$94150db1311f67a9 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) return new $77b6a7383a1cf23c$export$94150db1311f67a9(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
          return null;
      }
      toJSON() {
          return {
              stepType: "removeMark",
              mark: this.mark.toJSON(),
              from: this.from,
              to: this.to
          };
      }
      /**
      @internal
      */ static fromJSON(schema, json) {
          if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
          return new $77b6a7383a1cf23c$export$94150db1311f67a9(json.from, json.to, schema.markFromJSON(json.mark));
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("removeMark", $77b6a7383a1cf23c$export$94150db1311f67a9);
  /**
  Add a mark to a specific node.
  */ class $77b6a7383a1cf23c$export$adefd16c402fee4e extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Create a node mark step.
      */ constructor(/**
      The position of the target node.
      */ pos, /**
      The mark to add.
      */ mark){
          super();
          this.pos = pos;
          this.mark = mark;
      }
      apply(doc) {
          let node = doc.nodeAt(this.pos);
          if (!node) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("No node at mark step's position");
          let updated = node.type.create(node.attrs, null, this.mark.addToSet(node.marks));
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.pos, this.pos + 1, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(updated), 0, node.isLeaf ? 0 : 1));
      }
      invert(doc) {
          let node = doc.nodeAt(this.pos);
          if (node) {
              let newSet = this.mark.addToSet(node.marks);
              if (newSet.length == node.marks.length) {
                  for(let i = 0; i < node.marks.length; i++)if (!node.marks[i].isInSet(newSet)) return new $77b6a7383a1cf23c$export$adefd16c402fee4e(this.pos, node.marks[i]);
                  return new $77b6a7383a1cf23c$export$adefd16c402fee4e(this.pos, this.mark);
              }
          }
          return new $77b6a7383a1cf23c$export$fdf7d1dc10724da2(this.pos, this.mark);
      }
      map(mapping) {
          let pos = mapping.mapResult(this.pos, 1);
          return pos.deletedAfter ? null : new $77b6a7383a1cf23c$export$adefd16c402fee4e(pos.pos, this.mark);
      }
      toJSON() {
          return {
              stepType: "addNodeMark",
              pos: this.pos,
              mark: this.mark.toJSON()
          };
      }
      /**
      @internal
      */ static fromJSON(schema, json) {
          if (typeof json.pos != "number") throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
          return new $77b6a7383a1cf23c$export$adefd16c402fee4e(json.pos, schema.markFromJSON(json.mark));
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("addNodeMark", $77b6a7383a1cf23c$export$adefd16c402fee4e);
  /**
  Remove a mark from a specific node.
  */ class $77b6a7383a1cf23c$export$fdf7d1dc10724da2 extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Create a mark-removing step.
      */ constructor(/**
      The position of the target node.
      */ pos, /**
      The mark to remove.
      */ mark){
          super();
          this.pos = pos;
          this.mark = mark;
      }
      apply(doc) {
          let node = doc.nodeAt(this.pos);
          if (!node) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("No node at mark step's position");
          let updated = node.type.create(node.attrs, null, this.mark.removeFromSet(node.marks));
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.pos, this.pos + 1, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(updated), 0, node.isLeaf ? 0 : 1));
      }
      invert(doc) {
          let node = doc.nodeAt(this.pos);
          if (!node || !this.mark.isInSet(node.marks)) return this;
          return new $77b6a7383a1cf23c$export$adefd16c402fee4e(this.pos, this.mark);
      }
      map(mapping) {
          let pos = mapping.mapResult(this.pos, 1);
          return pos.deletedAfter ? null : new $77b6a7383a1cf23c$export$fdf7d1dc10724da2(pos.pos, this.mark);
      }
      toJSON() {
          return {
              stepType: "removeNodeMark",
              pos: this.pos,
              mark: this.mark.toJSON()
          };
      }
      /**
      @internal
      */ static fromJSON(schema, json) {
          if (typeof json.pos != "number") throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
          return new $77b6a7383a1cf23c$export$fdf7d1dc10724da2(json.pos, schema.markFromJSON(json.mark));
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("removeNodeMark", $77b6a7383a1cf23c$export$fdf7d1dc10724da2);
  /**
  Replace a part of the document with a slice of new content.
  */ class $77b6a7383a1cf23c$export$5c860b2e74034756 extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      The given `slice` should fit the 'gap' between `from` and
      `to`—the depths must line up, and the surrounding nodes must be
      able to be joined with the open sides of the slice. When
      `structure` is true, the step will fail if the content between
      from and to is not just a sequence of closing and then opening
      tokens (this is to guard against rebased replace steps
      overwriting something they weren't supposed to).
      */ constructor(/**
      The start position of the replaced range.
      */ from, /**
      The end position of the replaced range.
      */ to, /**
      The slice to insert.
      */ slice, /**
      @internal
      */ structure = false){
          super();
          this.from = from;
          this.to = to;
          this.slice = slice;
          this.structure = structure;
      }
      apply(doc) {
          if (this.structure && $77b6a7383a1cf23c$var$contentBetween(doc, this.from, this.to)) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("Structure replace would overwrite content");
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.from, this.to, this.slice);
      }
      getMap() {
          return new $77b6a7383a1cf23c$export$c53d01c3ab9721b3([
              this.from,
              this.to - this.from,
              this.slice.size
          ]);
      }
      invert(doc) {
          return new $77b6a7383a1cf23c$export$5c860b2e74034756(this.from, this.from + this.slice.size, doc.slice(this.from, this.to));
      }
      map(mapping) {
          let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
          if (from.deletedAcross && to.deletedAcross) return null;
          return new $77b6a7383a1cf23c$export$5c860b2e74034756(from.pos, Math.max(from.pos, to.pos), this.slice);
      }
      merge(other) {
          if (!(other instanceof $77b6a7383a1cf23c$export$5c860b2e74034756) || other.structure || this.structure) return null;
          if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
              let slice = this.slice.size + other.slice.size == 0 ? (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty : new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
              return new $77b6a7383a1cf23c$export$5c860b2e74034756(this.from, this.to + (other.to - other.from), slice, this.structure);
          } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
              let slice = this.slice.size + other.slice.size == 0 ? (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty : new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
              return new $77b6a7383a1cf23c$export$5c860b2e74034756(other.from, this.to, slice, this.structure);
          } else return null;
      }
      toJSON() {
          let json = {
              stepType: "replace",
              from: this.from,
              to: this.to
          };
          if (this.slice.size) json.slice = this.slice.toJSON();
          if (this.structure) json.structure = true;
          return json;
      }
      /**
      @internal
      */ static fromJSON(schema, json) {
          if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for ReplaceStep.fromJSON");
          return new $77b6a7383a1cf23c$export$5c860b2e74034756(json.from, json.to, (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).fromJSON(schema, json.slice), !!json.structure);
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("replace", $77b6a7383a1cf23c$export$5c860b2e74034756);
  /**
  Replace a part of the document with a slice of content, but
  preserve a range of the replaced content by moving it into the
  slice.
  */ class $77b6a7383a1cf23c$export$444ba800d6024a98 extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Create a replace-around step with the given range and gap.
      `insert` should be the point in the slice into which the content
      of the gap should be moved. `structure` has the same meaning as
      it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
      */ constructor(/**
      The start position of the replaced range.
      */ from, /**
      The end position of the replaced range.
      */ to, /**
      The start of preserved range.
      */ gapFrom, /**
      The end of preserved range.
      */ gapTo, /**
      The slice to insert.
      */ slice, /**
      The position in the slice where the preserved range should be
      inserted.
      */ insert, /**
      @internal
      */ structure = false){
          super();
          this.from = from;
          this.to = to;
          this.gapFrom = gapFrom;
          this.gapTo = gapTo;
          this.slice = slice;
          this.insert = insert;
          this.structure = structure;
      }
      apply(doc) {
          if (this.structure && ($77b6a7383a1cf23c$var$contentBetween(doc, this.from, this.gapFrom) || $77b6a7383a1cf23c$var$contentBetween(doc, this.gapTo, this.to))) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("Structure gap-replace would overwrite content");
          let gap = doc.slice(this.gapFrom, this.gapTo);
          if (gap.openStart || gap.openEnd) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("Gap is not a flat range");
          let inserted = this.slice.insertAt(this.insert, gap.content);
          if (!inserted) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("Content does not fit in gap");
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.from, this.to, inserted);
      }
      getMap() {
          return new $77b6a7383a1cf23c$export$c53d01c3ab9721b3([
              this.from,
              this.gapFrom - this.from,
              this.insert,
              this.gapTo,
              this.to - this.gapTo,
              this.slice.size - this.insert
          ]);
      }
      invert(doc) {
          let gap = this.gapTo - this.gapFrom;
          return new $77b6a7383a1cf23c$export$444ba800d6024a98(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
      }
      map(mapping) {
          let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
          let gapFrom = mapping.map(this.gapFrom, -1), gapTo = mapping.map(this.gapTo, 1);
          if (from.deletedAcross && to.deletedAcross || gapFrom < from.pos || gapTo > to.pos) return null;
          return new $77b6a7383a1cf23c$export$444ba800d6024a98(from.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
      }
      toJSON() {
          let json = {
              stepType: "replaceAround",
              from: this.from,
              to: this.to,
              gapFrom: this.gapFrom,
              gapTo: this.gapTo,
              insert: this.insert
          };
          if (this.slice.size) json.slice = this.slice.toJSON();
          if (this.structure) json.structure = true;
          return json;
      }
      /**
      @internal
      */ static fromJSON(schema, json) {
          if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number") throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
          return new $77b6a7383a1cf23c$export$444ba800d6024a98(json.from, json.to, json.gapFrom, json.gapTo, (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).fromJSON(schema, json.slice), json.insert, !!json.structure);
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("replaceAround", $77b6a7383a1cf23c$export$444ba800d6024a98);
  function $77b6a7383a1cf23c$var$contentBetween(doc, from, to) {
      let $from = doc.resolve(from), dist = to - from, depth = $from.depth;
      while(dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount){
          depth--;
          dist--;
      }
      if (dist > 0) {
          let next = $from.node(depth).maybeChild($from.indexAfter(depth));
          while(dist > 0){
              if (!next || next.isLeaf) return true;
              next = next.firstChild;
              dist--;
          }
      }
      return false;
  }
  function $77b6a7383a1cf23c$var$addMark(tr, from, to, mark) {
      let removed = [], added = [];
      let removing, adding;
      tr.doc.nodesBetween(from, to, (node, pos, parent)=>{
          if (!node.isInline) return;
          let marks = node.marks;
          if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
              let start = Math.max(pos, from), end = Math.min(pos + node.nodeSize, to);
              let newSet = mark.addToSet(marks);
              for(let i = 0; i < marks.length; i++)if (!marks[i].isInSet(newSet)) {
                  if (removing && removing.to == start && removing.mark.eq(marks[i])) removing.to = end;
                  else removed.push(removing = new $77b6a7383a1cf23c$export$94150db1311f67a9(start, end, marks[i]));
              }
              if (adding && adding.to == start) adding.to = end;
              else added.push(adding = new $77b6a7383a1cf23c$export$d24ba56b0e3464a9(start, end, mark));
          }
      });
      removed.forEach((s)=>tr.step(s));
      added.forEach((s)=>tr.step(s));
  }
  function $77b6a7383a1cf23c$var$removeMark(tr, from, to, mark) {
      let matched = [], step = 0;
      tr.doc.nodesBetween(from, to, (node, pos)=>{
          if (!node.isInline) return;
          step++;
          let toRemove = null;
          if (mark instanceof (0, $59526ec4d3b41406$export$b6a78689043c6521)) {
              let set = node.marks, found;
              while(found = mark.isInSet(set)){
                  (toRemove || (toRemove = [])).push(found);
                  set = found.removeFromSet(set);
              }
          } else if (mark) {
              if (mark.isInSet(node.marks)) toRemove = [
                  mark
              ];
          } else toRemove = node.marks;
          if (toRemove && toRemove.length) {
              let end = Math.min(pos + node.nodeSize, to);
              for(let i = 0; i < toRemove.length; i++){
                  let style = toRemove[i], found;
                  for(let j = 0; j < matched.length; j++){
                      let m = matched[j];
                      if (m.step == step - 1 && style.eq(matched[j].style)) found = m;
                  }
                  if (found) {
                      found.to = end;
                      found.step = step;
                  } else matched.push({
                      style: style,
                      from: Math.max(pos, from),
                      to: end,
                      step: step
                  });
              }
          }
      });
      matched.forEach((m)=>tr.step(new $77b6a7383a1cf23c$export$94150db1311f67a9(m.from, m.to, m.style)));
  }
  function $77b6a7383a1cf23c$var$clearIncompatible(tr, pos, parentType, match = parentType.contentMatch) {
      let node = tr.doc.nodeAt(pos);
      let replSteps = [], cur = pos + 1;
      for(let i = 0; i < node.childCount; i++){
          let child = node.child(i), end = cur + child.nodeSize;
          let allowed = match.matchType(child.type);
          if (!allowed) replSteps.push(new $77b6a7383a1cf23c$export$5c860b2e74034756(cur, end, (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty));
          else {
              match = allowed;
              for(let j = 0; j < child.marks.length; j++)if (!parentType.allowsMarkType(child.marks[j].type)) tr.step(new $77b6a7383a1cf23c$export$94150db1311f67a9(cur, end, child.marks[j]));
              if (child.isText && !parentType.spec.code) {
                  let m, newline = /\r?\n|\r/g, slice;
                  while(m = newline.exec(child.text)){
                      if (!slice) slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(parentType.schema.text(" ", parentType.allowedMarks(child.marks))), 0, 0);
                      replSteps.push(new $77b6a7383a1cf23c$export$5c860b2e74034756(cur + m.index, cur + m.index + m[0].length, slice));
                  }
              }
          }
          cur = end;
      }
      if (!match.validEnd) {
          let fill = match.fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, true);
          tr.replace(cur, cur, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(fill, 0, 0));
      }
      for(let i = replSteps.length - 1; i >= 0; i--)tr.step(replSteps[i]);
  }
  function $77b6a7383a1cf23c$var$canCut(node, start, end) {
      return (start == 0 || node.canReplace(start, node.childCount)) && (end == node.childCount || node.canReplace(0, end));
  }
  /**
  Try to find a target depth to which the content in the given range
  can be lifted. Will not go across
  [isolating](https://prosemirror.net/docs/ref/#model.NodeSpec.isolating) parent nodes.
  */ function $77b6a7383a1cf23c$export$f1508b72cc76a09e(range) {
      let parent = range.parent;
      let content = parent.content.cutByIndex(range.startIndex, range.endIndex);
      for(let depth = range.depth;; --depth){
          let node = range.$from.node(depth);
          let index = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
          if (depth < range.depth && node.canReplace(index, endIndex, content)) return depth;
          if (depth == 0 || node.type.spec.isolating || !$77b6a7383a1cf23c$var$canCut(node, index, endIndex)) break;
      }
      return null;
  }
  function $77b6a7383a1cf23c$var$lift(tr, range, target) {
      let { $from: $from, $to: $to, depth: depth } = range;
      let gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
      let start = gapStart, end = gapEnd;
      let before = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, openStart = 0;
      for(let d = depth, splitting = false; d > target; d--)if (splitting || $from.index(d) > 0) {
          splitting = true;
          before = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from($from.node(d).copy(before));
          openStart++;
      } else start--;
      let after = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, openEnd = 0;
      for(let d = depth, splitting = false; d > target; d--)if (splitting || $to.after(d + 1) < $to.end(d)) {
          splitting = true;
          after = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from($to.node(d).copy(after));
          openEnd++;
      } else end++;
      tr.step(new $77b6a7383a1cf23c$export$444ba800d6024a98(start, end, gapStart, gapEnd, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(before.append(after), openStart, openEnd), before.size - openStart, true));
  }
  /**
  Try to find a valid way to wrap the content in the given range in a
  node of the given type. May introduce extra nodes around and inside
  the wrapper node, if necessary. Returns null if no valid wrapping
  could be found. When `innerRange` is given, that range's content is
  used as the content to fit into the wrapping, instead of the
  content of `range`.
  */ function $77b6a7383a1cf23c$export$118cb9a83e81ba37(range, nodeType, attrs = null, innerRange = range) {
      let around = $77b6a7383a1cf23c$var$findWrappingOutside(range, nodeType);
      let inner = around && $77b6a7383a1cf23c$var$findWrappingInside(innerRange, nodeType);
      if (!inner) return null;
      return around.map($77b6a7383a1cf23c$var$withAttrs).concat({
          type: nodeType,
          attrs: attrs
      }).concat(inner.map($77b6a7383a1cf23c$var$withAttrs));
  }
  function $77b6a7383a1cf23c$var$withAttrs(type) {
      return {
          type: type,
          attrs: null
      };
  }
  function $77b6a7383a1cf23c$var$findWrappingOutside(range, type) {
      let { parent: parent, startIndex: startIndex, endIndex: endIndex } = range;
      let around = parent.contentMatchAt(startIndex).findWrapping(type);
      if (!around) return null;
      let outer = around.length ? around[0] : type;
      return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
  }
  function $77b6a7383a1cf23c$var$findWrappingInside(range, type) {
      let { parent: parent, startIndex: startIndex, endIndex: endIndex } = range;
      let inner = parent.child(startIndex);
      let inside = type.contentMatch.findWrapping(inner.type);
      if (!inside) return null;
      let lastType = inside.length ? inside[inside.length - 1] : type;
      let innerMatch = lastType.contentMatch;
      for(let i = startIndex; innerMatch && i < endIndex; i++)innerMatch = innerMatch.matchType(parent.child(i).type);
      if (!innerMatch || !innerMatch.validEnd) return null;
      return inside;
  }
  function $77b6a7383a1cf23c$var$wrap(tr, range, wrappers) {
      let content = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
      for(let i = wrappers.length - 1; i >= 0; i--){
          if (content.size) {
              let match = wrappers[i].type.contentMatch.matchFragment(content);
              if (!match || !match.validEnd) throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
          }
          content = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(wrappers[i].type.create(wrappers[i].attrs, content));
      }
      let start = range.start, end = range.end;
      tr.step(new $77b6a7383a1cf23c$export$444ba800d6024a98(start, end, start, end, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(content, 0, 0), wrappers.length, true));
  }
  function $77b6a7383a1cf23c$var$setBlockType(tr, from, to, type, attrs) {
      if (!type.isTextblock) throw new RangeError("Type given to setBlockType should be a textblock");
      let mapFrom = tr.steps.length;
      tr.doc.nodesBetween(from, to, (node, pos)=>{
          if (node.isTextblock && !node.hasMarkup(type, attrs) && $77b6a7383a1cf23c$var$canChangeType(tr.doc, tr.mapping.slice(mapFrom).map(pos), type)) {
              // Ensure all markup that isn't allowed in the new node type is cleared
              tr.clearIncompatible(tr.mapping.slice(mapFrom).map(pos, 1), type);
              let mapping = tr.mapping.slice(mapFrom);
              let startM = mapping.map(pos, 1), endM = mapping.map(pos + node.nodeSize, 1);
              tr.step(new $77b6a7383a1cf23c$export$444ba800d6024a98(startM, endM, startM + 1, endM - 1, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(type.create(attrs, null, node.marks)), 0, 0), 1, true));
              return false;
          }
      });
  }
  function $77b6a7383a1cf23c$var$canChangeType(doc, pos, type) {
      let $pos = doc.resolve(pos), index = $pos.index();
      return $pos.parent.canReplaceWith(index, index + 1, type);
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */ function $77b6a7383a1cf23c$var$setNodeMarkup(tr, pos, type, attrs, marks) {
      let node = tr.doc.nodeAt(pos);
      if (!node) throw new RangeError("No node at given position");
      if (!type) type = node.type;
      let newNode = type.create(attrs, null, marks || node.marks);
      if (node.isLeaf) return tr.replaceWith(pos, pos + node.nodeSize, newNode);
      if (!type.validContent(node.content)) throw new RangeError("Invalid content for node type " + type.name);
      tr.step(new $77b6a7383a1cf23c$export$444ba800d6024a98(pos, pos + node.nodeSize, pos + 1, pos + node.nodeSize - 1, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(newNode), 0, 0), 1, true));
  }
  /**
  Check whether splitting at the given position is allowed.
  */ function $77b6a7383a1cf23c$export$5aaf008897aef029(doc, pos, depth = 1, typesAfter) {
      let $pos = doc.resolve(pos), base = $pos.depth - depth;
      let innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
      if (base < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount))) return false;
      for(let d = $pos.depth - 1, i = depth - 2; d > base; d--, i--){
          let node = $pos.node(d), index = $pos.index(d);
          if (node.type.spec.isolating) return false;
          let rest = node.content.cutByIndex(index, node.childCount);
          let overrideChild = typesAfter && typesAfter[i + 1];
          if (overrideChild) rest = rest.replaceChild(0, overrideChild.type.create(overrideChild.attrs));
          let after = typesAfter && typesAfter[i] || node;
          if (!node.canReplace(index + 1, node.childCount) || !after.type.validContent(rest)) return false;
      }
      let index = $pos.indexAfter(base);
      let baseType = typesAfter && typesAfter[0];
      return $pos.node(base).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type);
  }
  function $77b6a7383a1cf23c$var$split(tr, pos, depth = 1, typesAfter) {
      let $pos = tr.doc.resolve(pos), before = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, after = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
      for(let d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--){
          before = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from($pos.node(d).copy(before));
          let typeAfter = typesAfter && typesAfter[i];
          after = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after));
      }
      tr.step(new $77b6a7383a1cf23c$export$5c860b2e74034756(pos, pos, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(before.append(after), depth, depth), true));
  }
  /**
  Test whether the blocks before and after a given position can be
  joined.
  */ function $77b6a7383a1cf23c$export$f15f89fd9d8cc98a(doc, pos) {
      let $pos = doc.resolve(pos), index = $pos.index();
      return $77b6a7383a1cf23c$var$joinable($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index, index + 1);
  }
  function $77b6a7383a1cf23c$var$joinable(a, b) {
      return !!(a && b && !a.isLeaf && a.canAppend(b));
  }
  /**
  Find an ancestor of the given position that can be joined to the
  block before (or after if `dir` is positive). Returns the joinable
  point, if any.
  */ function $77b6a7383a1cf23c$export$41b1d4cb5ceb3147(doc, pos, dir = -1) {
      let $pos = doc.resolve(pos);
      for(let d = $pos.depth;; d--){
          let before, after, index = $pos.index(d);
          if (d == $pos.depth) {
              before = $pos.nodeBefore;
              after = $pos.nodeAfter;
          } else if (dir > 0) {
              before = $pos.node(d + 1);
              index++;
              after = $pos.node(d).maybeChild(index);
          } else {
              before = $pos.node(d).maybeChild(index - 1);
              after = $pos.node(d + 1);
          }
          if (before && !before.isTextblock && $77b6a7383a1cf23c$var$joinable(before, after) && $pos.node(d).canReplace(index, index + 1)) return pos;
          if (d == 0) break;
          pos = dir < 0 ? $pos.before(d) : $pos.after(d);
      }
  }
  function $77b6a7383a1cf23c$var$join(tr, pos, depth) {
      let step = new $77b6a7383a1cf23c$export$5c860b2e74034756(pos - depth, pos + depth, (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty, true);
      tr.step(step);
  }
  /**
  Try to find a point where a node of the given type can be inserted
  near `pos`, by searching up the node hierarchy when `pos` itself
  isn't a valid place but is at the start or end of a node. Return
  null if no position was found.
  */ function $77b6a7383a1cf23c$export$64cb316d02de1dd1(doc, pos, nodeType) {
      let $pos = doc.resolve(pos);
      if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType)) return pos;
      if ($pos.parentOffset == 0) for(let d = $pos.depth - 1; d >= 0; d--){
          let index = $pos.index(d);
          if ($pos.node(d).canReplaceWith(index, index, nodeType)) return $pos.before(d + 1);
          if (index > 0) return null;
      }
      if ($pos.parentOffset == $pos.parent.content.size) for(let d = $pos.depth - 1; d >= 0; d--){
          let index = $pos.indexAfter(d);
          if ($pos.node(d).canReplaceWith(index, index, nodeType)) return $pos.after(d + 1);
          if (index < $pos.node(d).childCount) return null;
      }
      return null;
  }
  /**
  Finds a position at or around the given position where the given
  slice can be inserted. Will look at parent nodes' nearest boundary
  and try there, even if the original position wasn't directly at the
  start or end of that node. Returns null when no position was found.
  */ function $77b6a7383a1cf23c$export$2819d598d048fc9c(doc, pos, slice) {
      let $pos = doc.resolve(pos);
      if (!slice.content.size) return pos;
      let content = slice.content;
      for(let i = 0; i < slice.openStart; i++)content = content.firstChild.content;
      for(let pass = 1; pass <= (slice.openStart == 0 && slice.size ? 2 : 1); pass++)for(let d = $pos.depth; d >= 0; d--){
          let bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
          let insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
          let parent = $pos.node(d), fits = false;
          if (pass == 1) fits = parent.canReplace(insertPos, insertPos, content);
          else {
              let wrapping = parent.contentMatchAt(insertPos).findWrapping(content.firstChild.type);
              fits = wrapping && parent.canReplaceWith(insertPos, insertPos, wrapping[0]);
          }
          if (fits) return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
      }
      return null;
  }
  /**
  ‘Fit’ a slice into a given position in the document, producing a
  [step](https://prosemirror.net/docs/ref/#transform.Step) that inserts it. Will return null if
  there's no meaningful way to insert the slice here, or inserting it
  would be a no-op (an empty slice over an empty range).
  */ function $77b6a7383a1cf23c$export$ed6ac67359824afd(doc, from, to = from, slice = (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
      if (from == to && !slice.size) return null;
      let $from = doc.resolve(from), $to = doc.resolve(to);
      // Optimization -- avoid work if it's obvious that it's not needed.
      if ($77b6a7383a1cf23c$var$fitsTrivially($from, $to, slice)) return new $77b6a7383a1cf23c$export$5c860b2e74034756(from, to, slice);
      return new $77b6a7383a1cf23c$var$Fitter($from, $to, slice).fit();
  }
  function $77b6a7383a1cf23c$var$fitsTrivially($from, $to, slice) {
      return !slice.openStart && !slice.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice.content);
  }
  // Algorithm for 'placing' the elements of a slice into a gap:
  //
  // We consider the content of each node that is open to the left to be
  // independently placeable. I.e. in <p("foo"), p("bar")>, when the
  // paragraph on the left is open, "foo" can be placed (somewhere on
  // the left side of the replacement gap) independently from p("bar").
  //
  // This class tracks the state of the placement progress in the
  // following properties:
  //
  //  - `frontier` holds a stack of `{type, match}` objects that
  //    represent the open side of the replacement. It starts at
  //    `$from`, then moves forward as content is placed, and is finally
  //    reconciled with `$to`.
  //
  //  - `unplaced` is a slice that represents the content that hasn't
  //    been placed yet.
  //
  //  - `placed` is a fragment of placed content. Its open-start value
  //    is implicit in `$from`, and its open-end value in `frontier`.
  class $77b6a7383a1cf23c$var$Fitter {
      constructor($from, $to, unplaced){
          this.$from = $from;
          this.$to = $to;
          this.unplaced = unplaced;
          this.frontier = [];
          this.placed = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
          for(let i = 0; i <= $from.depth; i++){
              let node = $from.node(i);
              this.frontier.push({
                  type: node.type,
                  match: node.contentMatchAt($from.indexAfter(i))
              });
          }
          for(let i = $from.depth; i > 0; i--)this.placed = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from($from.node(i).copy(this.placed));
      }
      get depth() {
          return this.frontier.length - 1;
      }
      fit() {
          // As long as there's unplaced content, try to place some of it.
          // If that fails, either increase the open score of the unplaced
          // slice, or drop nodes from it, and then try again.
          while(this.unplaced.size){
              let fit = this.findFittable();
              if (fit) this.placeNodes(fit);
              else this.openMore() || this.dropNode();
          }
          // When there's inline content directly after the frontier _and_
          // directly after `this.$to`, we must generate a `ReplaceAround`
          // step that pulls that content into the node after the frontier.
          // That means the fitting must be done to the end of the textblock
          // node after `this.$to`, not `this.$to` itself.
          let moveInline = this.mustMoveInline(), placedSize = this.placed.size - this.depth - this.$from.depth;
          let $from = this.$from, $to = this.close(moveInline < 0 ? this.$to : $from.doc.resolve(moveInline));
          if (!$to) return null;
          // If closing to `$to` succeeded, create a step
          let content = this.placed, openStart = $from.depth, openEnd = $to.depth;
          while(openStart && openEnd && content.childCount == 1){
              content = content.firstChild.content;
              openStart--;
              openEnd--;
          }
          let slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(content, openStart, openEnd);
          if (moveInline > -1) return new $77b6a7383a1cf23c$export$444ba800d6024a98($from.pos, moveInline, this.$to.pos, this.$to.end(), slice, placedSize);
          if (slice.size || $from.pos != this.$to.pos) return new $77b6a7383a1cf23c$export$5c860b2e74034756($from.pos, $to.pos, slice);
          return null;
      }
      // Find a position on the start spine of `this.unplaced` that has
      // content that can be moved somewhere on the frontier. Returns two
      // depths, one for the slice and one for the frontier.
      findFittable() {
          let startDepth = this.unplaced.openStart;
          for(let cur = this.unplaced.content, d = 0, openEnd = this.unplaced.openEnd; d < startDepth; d++){
              let node = cur.firstChild;
              if (cur.childCount > 1) openEnd = 0;
              if (node.type.spec.isolating && openEnd <= d) {
                  startDepth = d;
                  break;
              }
              cur = node.content;
          }
          // Only try wrapping nodes (pass 2) after finding a place without
          // wrapping failed.
          for(let pass = 1; pass <= 2; pass++)for(let sliceDepth = pass == 1 ? startDepth : this.unplaced.openStart; sliceDepth >= 0; sliceDepth--){
              let fragment, parent = null;
              if (sliceDepth) {
                  parent = $77b6a7383a1cf23c$var$contentAt(this.unplaced.content, sliceDepth - 1).firstChild;
                  fragment = parent.content;
              } else fragment = this.unplaced.content;
              let first = fragment.firstChild;
              for(let frontierDepth = this.depth; frontierDepth >= 0; frontierDepth--){
                  let { type: type, match: match } = this.frontier[frontierDepth], wrap, inject = null;
                  // In pass 1, if the next node matches, or there is no next
                  // node but the parents look compatible, we've found a
                  // place.
                  if (pass == 1 && (first ? match.matchType(first.type) || (inject = match.fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(first), false)) : parent && type.compatibleContent(parent.type))) return {
                      sliceDepth: sliceDepth,
                      frontierDepth: frontierDepth,
                      parent: parent,
                      inject: inject
                  };
                  else if (pass == 2 && first && (wrap = match.findWrapping(first.type))) return {
                      sliceDepth: sliceDepth,
                      frontierDepth: frontierDepth,
                      parent: parent,
                      wrap: wrap
                  };
                  // Don't continue looking further up if the parent node
                  // would fit here.
                  if (parent && match.matchType(parent.type)) break;
              }
          }
      }
      openMore() {
          let { content: content, openStart: openStart, openEnd: openEnd } = this.unplaced;
          let inner = $77b6a7383a1cf23c$var$contentAt(content, openStart);
          if (!inner.childCount || inner.firstChild.isLeaf) return false;
          this.unplaced = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(content, openStart + 1, Math.max(openEnd, inner.size + openStart >= content.size - openEnd ? openStart + 1 : 0));
          return true;
      }
      dropNode() {
          let { content: content, openStart: openStart, openEnd: openEnd } = this.unplaced;
          let inner = $77b6a7383a1cf23c$var$contentAt(content, openStart);
          if (inner.childCount <= 1 && openStart > 0) {
              let openAtEnd = content.size - openStart <= openStart + inner.size;
              this.unplaced = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$dropFromFragment(content, openStart - 1, 1), openStart - 1, openAtEnd ? openStart - 1 : openEnd);
          } else this.unplaced = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$dropFromFragment(content, openStart, 1), openStart, openEnd);
      }
      // Move content from the unplaced slice at `sliceDepth` to the
      // frontier node at `frontierDepth`. Close that frontier node when
      // applicable.
      placeNodes({ sliceDepth: sliceDepth, frontierDepth: frontierDepth, parent: parent, inject: inject, wrap: wrap }) {
          while(this.depth > frontierDepth)this.closeFrontierNode();
          if (wrap) for(let i = 0; i < wrap.length; i++)this.openFrontierNode(wrap[i]);
          let slice = this.unplaced, fragment = parent ? parent.content : slice.content;
          let openStart = slice.openStart - sliceDepth;
          let taken = 0, add = [];
          let { match: match, type: type } = this.frontier[frontierDepth];
          if (inject) {
              for(let i = 0; i < inject.childCount; i++)add.push(inject.child(i));
              match = match.matchFragment(inject);
          }
          // Computes the amount of (end) open nodes at the end of the
          // fragment. When 0, the parent is open, but no more. When
          // negative, nothing is open.
          let openEndCount = fragment.size + sliceDepth - (slice.content.size - slice.openEnd);
          // Scan over the fragment, fitting as many child nodes as
          // possible.
          while(taken < fragment.childCount){
              let next = fragment.child(taken), matches = match.matchType(next.type);
              if (!matches) break;
              taken++;
              if (taken > 1 || openStart == 0 || next.content.size) {
                  match = matches;
                  add.push($77b6a7383a1cf23c$var$closeNodeStart(next.mark(type.allowedMarks(next.marks)), taken == 1 ? openStart : 0, taken == fragment.childCount ? openEndCount : -1));
              }
          }
          let toEnd = taken == fragment.childCount;
          if (!toEnd) openEndCount = -1;
          this.placed = $77b6a7383a1cf23c$var$addToFragment(this.placed, frontierDepth, (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(add));
          this.frontier[frontierDepth].match = match;
          // If the parent types match, and the entire node was moved, and
          // it's not open, close this frontier node right away.
          if (toEnd && openEndCount < 0 && parent && parent.type == this.frontier[this.depth].type && this.frontier.length > 1) this.closeFrontierNode();
          // Add new frontier nodes for any open nodes at the end.
          for(let i = 0, cur = fragment; i < openEndCount; i++){
              let node = cur.lastChild;
              this.frontier.push({
                  type: node.type,
                  match: node.contentMatchAt(node.childCount)
              });
              cur = node.content;
          }
          // Update `this.unplaced`. Drop the entire node from which we
          // placed it we got to its end, otherwise just drop the placed
          // nodes.
          this.unplaced = !toEnd ? new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$dropFromFragment(slice.content, sliceDepth, taken), slice.openStart, slice.openEnd) : sliceDepth == 0 ? (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty : new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$dropFromFragment(slice.content, sliceDepth - 1, 1), sliceDepth - 1, openEndCount < 0 ? slice.openEnd : sliceDepth - 1);
      }
      mustMoveInline() {
          if (!this.$to.parent.isTextblock) return -1;
          let top = this.frontier[this.depth], level;
          if (!top.type.isTextblock || !$77b6a7383a1cf23c$var$contentAfterFits(this.$to, this.$to.depth, top.type, top.match, false) || this.$to.depth == this.depth && (level = this.findCloseLevel(this.$to)) && level.depth == this.depth) return -1;
          let { depth: depth } = this.$to, after = this.$to.after(depth);
          while(depth > 1 && after == this.$to.end(--depth))++after;
          return after;
      }
      findCloseLevel($to) {
          scan: for(let i = Math.min(this.depth, $to.depth); i >= 0; i--){
              let { match: match, type: type } = this.frontier[i];
              let dropInner = i < $to.depth && $to.end(i + 1) == $to.pos + ($to.depth - (i + 1));
              let fit = $77b6a7383a1cf23c$var$contentAfterFits($to, i, type, match, dropInner);
              if (!fit) continue;
              for(let d = i - 1; d >= 0; d--){
                  let { match: match, type: type } = this.frontier[d];
                  let matches = $77b6a7383a1cf23c$var$contentAfterFits($to, d, type, match, true);
                  if (!matches || matches.childCount) continue scan;
              }
              return {
                  depth: i,
                  fit: fit,
                  move: dropInner ? $to.doc.resolve($to.after(i + 1)) : $to
              };
          }
      }
      close($to) {
          let close = this.findCloseLevel($to);
          if (!close) return null;
          while(this.depth > close.depth)this.closeFrontierNode();
          if (close.fit.childCount) this.placed = $77b6a7383a1cf23c$var$addToFragment(this.placed, close.depth, close.fit);
          $to = close.move;
          for(let d = close.depth + 1; d <= $to.depth; d++){
              let node = $to.node(d), add = node.type.contentMatch.fillBefore(node.content, true, $to.index(d));
              this.openFrontierNode(node.type, node.attrs, add);
          }
          return $to;
      }
      openFrontierNode(type, attrs = null, content) {
          let top = this.frontier[this.depth];
          top.match = top.match.matchType(type);
          this.placed = $77b6a7383a1cf23c$var$addToFragment(this.placed, this.depth, (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(type.create(attrs, content)));
          this.frontier.push({
              type: type,
              match: type.contentMatch
          });
      }
      closeFrontierNode() {
          let open = this.frontier.pop();
          let add = open.match.fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, true);
          if (add.childCount) this.placed = $77b6a7383a1cf23c$var$addToFragment(this.placed, this.frontier.length, add);
      }
  }
  function $77b6a7383a1cf23c$var$dropFromFragment(fragment, depth, count) {
      if (depth == 0) return fragment.cutByIndex(count, fragment.childCount);
      return fragment.replaceChild(0, fragment.firstChild.copy($77b6a7383a1cf23c$var$dropFromFragment(fragment.firstChild.content, depth - 1, count)));
  }
  function $77b6a7383a1cf23c$var$addToFragment(fragment, depth, content) {
      if (depth == 0) return fragment.append(content);
      return fragment.replaceChild(fragment.childCount - 1, fragment.lastChild.copy($77b6a7383a1cf23c$var$addToFragment(fragment.lastChild.content, depth - 1, content)));
  }
  function $77b6a7383a1cf23c$var$contentAt(fragment, depth) {
      for(let i = 0; i < depth; i++)fragment = fragment.firstChild.content;
      return fragment;
  }
  function $77b6a7383a1cf23c$var$closeNodeStart(node, openStart, openEnd) {
      if (openStart <= 0) return node;
      let frag = node.content;
      if (openStart > 1) frag = frag.replaceChild(0, $77b6a7383a1cf23c$var$closeNodeStart(frag.firstChild, openStart - 1, frag.childCount == 1 ? openEnd - 1 : 0));
      if (openStart > 0) {
          frag = node.type.contentMatch.fillBefore(frag).append(frag);
          if (openEnd <= 0) frag = frag.append(node.type.contentMatch.matchFragment(frag).fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, true));
      }
      return node.copy(frag);
  }
  function $77b6a7383a1cf23c$var$contentAfterFits($to, depth, type, match, open) {
      let node = $to.node(depth), index = open ? $to.indexAfter(depth) : $to.index(depth);
      if (index == node.childCount && !type.compatibleContent(node.type)) return null;
      let fit = match.fillBefore(node.content, true, index);
      return fit && !$77b6a7383a1cf23c$var$invalidMarks(type, node.content, index) ? fit : null;
  }
  function $77b6a7383a1cf23c$var$invalidMarks(type, fragment, start) {
      for(let i = start; i < fragment.childCount; i++)if (!type.allowsMarks(fragment.child(i).marks)) return true;
      return false;
  }
  function $77b6a7383a1cf23c$var$definesContent(type) {
      return type.spec.defining || type.spec.definingForContent;
  }
  function $77b6a7383a1cf23c$var$replaceRange(tr, from, to, slice) {
      if (!slice.size) return tr.deleteRange(from, to);
      let $from = tr.doc.resolve(from), $to = tr.doc.resolve(to);
      if ($77b6a7383a1cf23c$var$fitsTrivially($from, $to, slice)) return tr.step(new $77b6a7383a1cf23c$export$5c860b2e74034756(from, to, slice));
      let targetDepths = $77b6a7383a1cf23c$var$coveredDepths($from, tr.doc.resolve(to));
      // Can't replace the whole document, so remove 0 if it's present
      if (targetDepths[targetDepths.length - 1] == 0) targetDepths.pop();
      // Negative numbers represent not expansion over the whole node at
      // that depth, but replacing from $from.before(-D) to $to.pos.
      let preferredTarget = -($from.depth + 1);
      targetDepths.unshift(preferredTarget);
      // This loop picks a preferred target depth, if one of the covering
      // depths is not outside of a defining node, and adds negative
      // depths for any depth that has $from at its start and does not
      // cross a defining node.
      for(let d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--){
          let spec = $from.node(d).type.spec;
          if (spec.defining || spec.definingAsContext || spec.isolating) break;
          if (targetDepths.indexOf(d) > -1) preferredTarget = d;
          else if ($from.before(d) == pos) targetDepths.splice(1, 0, -d);
      }
      // Try to fit each possible depth of the slice into each possible
      // target depth, starting with the preferred depths.
      let preferredTargetIndex = targetDepths.indexOf(preferredTarget);
      let leftNodes = [], preferredDepth = slice.openStart;
      for(let content = slice.content, i = 0;; i++){
          let node = content.firstChild;
          leftNodes.push(node);
          if (i == slice.openStart) break;
          content = node.content;
      }
      // Back up preferredDepth to cover defining textblocks directly
      // above it, possibly skipping a non-defining textblock.
      for(let d = preferredDepth - 1; d >= 0; d--){
          let type = leftNodes[d].type, def = $77b6a7383a1cf23c$var$definesContent(type);
          if (def && $from.node(preferredTargetIndex).type != type) preferredDepth = d;
          else if (def || !type.isTextblock) break;
      }
      for(let j = slice.openStart; j >= 0; j--){
          let openDepth = (j + preferredDepth + 1) % (slice.openStart + 1);
          let insert = leftNodes[openDepth];
          if (!insert) continue;
          for(let i = 0; i < targetDepths.length; i++){
              // Loop over possible expansion levels, starting with the
              // preferred one
              let targetDepth = targetDepths[(i + preferredTargetIndex) % targetDepths.length], expand = true;
              if (targetDepth < 0) {
                  expand = false;
                  targetDepth = -targetDepth;
              }
              let parent = $from.node(targetDepth - 1), index = $from.index(targetDepth - 1);
              if (parent.canReplaceWith(index, index, insert.type, insert.marks)) return tr.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($77b6a7383a1cf23c$var$closeFragment(slice.content, 0, slice.openStart, openDepth), openDepth, slice.openEnd));
          }
      }
      let startSteps = tr.steps.length;
      for(let i = targetDepths.length - 1; i >= 0; i--){
          tr.replace(from, to, slice);
          if (tr.steps.length > startSteps) break;
          let depth = targetDepths[i];
          if (depth < 0) continue;
          from = $from.before(depth);
          to = $to.after(depth);
      }
  }
  function $77b6a7383a1cf23c$var$closeFragment(fragment, depth, oldOpen, newOpen, parent) {
      if (depth < oldOpen) {
          let first = fragment.firstChild;
          fragment = fragment.replaceChild(0, first.copy($77b6a7383a1cf23c$var$closeFragment(first.content, depth + 1, oldOpen, newOpen, first)));
      }
      if (depth > newOpen) {
          let match = parent.contentMatchAt(0);
          let start = match.fillBefore(fragment).append(fragment);
          fragment = start.append(match.matchFragment(start).fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, true));
      }
      return fragment;
  }
  function $77b6a7383a1cf23c$var$replaceRangeWith(tr, from, to, node) {
      if (!node.isInline && from == to && tr.doc.resolve(from).parent.content.size) {
          let point = $77b6a7383a1cf23c$export$64cb316d02de1dd1(tr.doc, from, node.type);
          if (point != null) from = to = point;
      }
      tr.replaceRange(from, to, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(node), 0, 0));
  }
  function $77b6a7383a1cf23c$var$deleteRange(tr, from, to) {
      let $from = tr.doc.resolve(from), $to = tr.doc.resolve(to);
      let covered = $77b6a7383a1cf23c$var$coveredDepths($from, $to);
      for(let i = 0; i < covered.length; i++){
          let depth = covered[i], last = i == covered.length - 1;
          if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd) return tr.delete($from.start(depth), $to.end(depth));
          if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) return tr.delete($from.before(depth), $to.after(depth));
      }
      for(let d = 1; d <= $from.depth && d <= $to.depth; d++){
          if (from - $from.start(d) == $from.depth - d && to > $from.end(d) && $to.end(d) - to != $to.depth - d) return tr.delete($from.before(d), to);
      }
      tr.delete(from, to);
  }
  // Returns an array of all depths for which $from - $to spans the
  // whole content of the nodes at that depth.
  function $77b6a7383a1cf23c$var$coveredDepths($from, $to) {
      let result = [], minDepth = Math.min($from.depth, $to.depth);
      for(let d = minDepth; d >= 0; d--){
          let start = $from.start(d);
          if (start < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating) break;
          if (start == $to.start(d) || d == $from.depth && d == $to.depth && $from.parent.inlineContent && $to.parent.inlineContent && d && $to.start(d - 1) == start - 1) result.push(d);
      }
      return result;
  }
  /**
  Update an attribute in a specific node.
  */ class $77b6a7383a1cf23c$export$626399c38172f669 extends $77b6a7383a1cf23c$export$fd55ce593607084a {
      /**
      Construct an attribute step.
      */ constructor(/**
      The position of the target node.
      */ pos, /**
      The attribute to set.
      */ attr, // The attribute's new value.
      value){
          super();
          this.pos = pos;
          this.attr = attr;
          this.value = value;
      }
      apply(doc) {
          let node = doc.nodeAt(this.pos);
          if (!node) return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fail("No node at attribute step's position");
          let attrs = Object.create(null);
          for(let name in node.attrs)attrs[name] = node.attrs[name];
          attrs[this.attr] = this.value;
          let updated = node.type.create(attrs, null, node.marks);
          return $77b6a7383a1cf23c$export$8ebf1578a4199c09.fromReplace(doc, this.pos, this.pos + 1, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(updated), 0, node.isLeaf ? 0 : 1));
      }
      getMap() {
          return $77b6a7383a1cf23c$export$c53d01c3ab9721b3.empty;
      }
      invert(doc) {
          return new $77b6a7383a1cf23c$export$626399c38172f669(this.pos, this.attr, doc.nodeAt(this.pos).attrs[this.attr]);
      }
      map(mapping) {
          let pos = mapping.mapResult(this.pos, 1);
          return pos.deletedAfter ? null : new $77b6a7383a1cf23c$export$626399c38172f669(pos.pos, this.attr, this.value);
      }
      toJSON() {
          return {
              stepType: "attr",
              pos: this.pos,
              attr: this.attr,
              value: this.value
          };
      }
      static fromJSON(schema, json) {
          if (typeof json.pos != "number" || typeof json.attr != "string") throw new RangeError("Invalid input for AttrStep.fromJSON");
          return new $77b6a7383a1cf23c$export$626399c38172f669(json.pos, json.attr, json.value);
      }
  }
  $77b6a7383a1cf23c$export$fd55ce593607084a.jsonID("attr", $77b6a7383a1cf23c$export$626399c38172f669);
  /**
  @internal
  */ let $77b6a7383a1cf23c$export$88cc3a1dfce48dd3 = class extends Error {
  };
  $77b6a7383a1cf23c$export$88cc3a1dfce48dd3 = function TransformError(message) {
      let err = Error.call(this, message);
      err.__proto__ = TransformError.prototype;
      return err;
  };
  $77b6a7383a1cf23c$export$88cc3a1dfce48dd3.prototype = Object.create(Error.prototype);
  $77b6a7383a1cf23c$export$88cc3a1dfce48dd3.prototype.constructor = $77b6a7383a1cf23c$export$88cc3a1dfce48dd3;
  $77b6a7383a1cf23c$export$88cc3a1dfce48dd3.prototype.name = "TransformError";
  /**
  Abstraction to build up and track an array of
  [steps](https://prosemirror.net/docs/ref/#transform.Step) representing a document transformation.
  
  Most transforming methods return the `Transform` object itself, so
  that they can be chained.
  */ class $77b6a7383a1cf23c$export$563a914cafbdc389 {
      /**
      Create a transform that starts with the given document.
      */ constructor(/**
      The current document (the result of applying the steps in the
      transform).
      */ doc){
          this.doc = doc;
          /**
          The steps in this transform.
          */ this.steps = [];
          /**
          The documents before each of the steps.
          */ this.docs = [];
          /**
          A mapping with the maps for each of the steps in this transform.
          */ this.mapping = new $77b6a7383a1cf23c$export$f5f785078011b62;
      }
      /**
      The starting document.
      */ get before() {
          return this.docs.length ? this.docs[0] : this.doc;
      }
      /**
      Apply a new step in this transform, saving the result. Throws an
      error when the step fails.
      */ step(step) {
          let result = this.maybeStep(step);
          if (result.failed) throw new $77b6a7383a1cf23c$export$88cc3a1dfce48dd3(result.failed);
          return this;
      }
      /**
      Try to apply a step in this transformation, ignoring it if it
      fails. Returns the step result.
      */ maybeStep(step) {
          let result = step.apply(this.doc);
          if (!result.failed) this.addStep(step, result.doc);
          return result;
      }
      /**
      True when the document has been changed (when there are any
      steps).
      */ get docChanged() {
          return this.steps.length > 0;
      }
      /**
      @internal
      */ addStep(step, doc) {
          this.docs.push(this.doc);
          this.steps.push(step);
          this.mapping.appendMap(step.getMap());
          this.doc = doc;
      }
      /**
      Replace the part of the document between `from` and `to` with the
      given `slice`.
      */ replace(from, to = from, slice = (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
          let step = $77b6a7383a1cf23c$export$ed6ac67359824afd(this.doc, from, to, slice);
          if (step) this.step(step);
          return this;
      }
      /**
      Replace the given range with the given content, which may be a
      fragment, node, or array of nodes.
      */ replaceWith(from, to, content) {
          return this.replace(from, to, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(content), 0, 0));
      }
      /**
      Delete the content between the given positions.
      */ delete(from, to) {
          return this.replace(from, to, (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty);
      }
      /**
      Insert the given content at the given position.
      */ insert(pos, content) {
          return this.replaceWith(pos, pos, content);
      }
      /**
      Replace a range of the document with a given slice, using
      `from`, `to`, and the slice's
      [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
      than fixed start and end points. This method may grow the
      replaced area or close open nodes in the slice in order to get a
      fit that is more in line with WYSIWYG expectations, by dropping
      fully covered parent nodes of the replaced region when they are
      marked [non-defining as
      context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
      open parent node from the slice that _is_ marked as [defining
      its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
      
      This is the method, for example, to handle paste. The similar
      [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
      primitive tool which will _not_ move the start and end of its given
      range, and is useful in situations where you need more precise
      control over what happens.
      */ replaceRange(from, to, slice) {
          $77b6a7383a1cf23c$var$replaceRange(this, from, to, slice);
          return this;
      }
      /**
      Replace the given range with a node, but use `from` and `to` as
      hints, rather than precise positions. When from and to are the same
      and are at the start or end of a parent node in which the given
      node doesn't fit, this method may _move_ them out towards a parent
      that does allow the given node to be placed. When the given range
      completely covers a parent node, this method may completely replace
      that parent node.
      */ replaceRangeWith(from, to, node) {
          $77b6a7383a1cf23c$var$replaceRangeWith(this, from, to, node);
          return this;
      }
      /**
      Delete the given range, expanding it to cover fully covered
      parent nodes until a valid replace is found.
      */ deleteRange(from, to) {
          $77b6a7383a1cf23c$var$deleteRange(this, from, to);
          return this;
      }
      /**
      Split the content in the given range off from its parent, if there
      is sibling content before or after it, and move it up the tree to
      the depth specified by `target`. You'll probably want to use
      [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
      sure the lift is valid.
      */ lift(range, target) {
          $77b6a7383a1cf23c$var$lift(this, range, target);
          return this;
      }
      /**
      Join the blocks around the given position. If depth is 2, their
      last and first siblings are also joined, and so on.
      */ join(pos, depth = 1) {
          $77b6a7383a1cf23c$var$join(this, pos, depth);
          return this;
      }
      /**
      Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
      The wrappers are assumed to be valid in this position, and should
      probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
      */ wrap(range, wrappers) {
          $77b6a7383a1cf23c$var$wrap(this, range, wrappers);
          return this;
      }
      /**
      Set the type of all textblocks (partly) between `from` and `to` to
      the given node type with the given attributes.
      */ setBlockType(from, to = from, type, attrs = null) {
          $77b6a7383a1cf23c$var$setBlockType(this, from, to, type, attrs);
          return this;
      }
      /**
      Change the type, attributes, and/or marks of the node at `pos`.
      When `type` isn't given, the existing node type is preserved,
      */ setNodeMarkup(pos, type, attrs = null, marks) {
          $77b6a7383a1cf23c$var$setNodeMarkup(this, pos, type, attrs, marks);
          return this;
      }
      /**
      Set a single attribute on a given node to a new value.
      */ setNodeAttribute(pos, attr, value) {
          this.step(new $77b6a7383a1cf23c$export$626399c38172f669(pos, attr, value));
          return this;
      }
      /**
      Add a mark to the node at position `pos`.
      */ addNodeMark(pos, mark) {
          this.step(new $77b6a7383a1cf23c$export$adefd16c402fee4e(pos, mark));
          return this;
      }
      /**
      Remove a mark (or a mark of the given type) from the node at
      position `pos`.
      */ removeNodeMark(pos, mark) {
          if (!(mark instanceof (0, $59526ec4d3b41406$export$c9d15bcfc6d42044))) {
              let node = this.doc.nodeAt(pos);
              if (!node) throw new RangeError("No node at position " + pos);
              mark = mark.isInSet(node.marks);
              if (!mark) return this;
          }
          this.step(new $77b6a7383a1cf23c$export$fdf7d1dc10724da2(pos, mark));
          return this;
      }
      /**
      Split the node at the given position, and optionally, if `depth` is
      greater than one, any number of nodes above that. By default, the
      parts split off will inherit the node type of the original node.
      This can be changed by passing an array of types and attributes to
      use after the split.
      */ split(pos, depth = 1, typesAfter) {
          $77b6a7383a1cf23c$var$split(this, pos, depth, typesAfter);
          return this;
      }
      /**
      Add the given mark to the inline content between `from` and `to`.
      */ addMark(from, to, mark) {
          $77b6a7383a1cf23c$var$addMark(this, from, to, mark);
          return this;
      }
      /**
      Remove marks from inline nodes between `from` and `to`. When
      `mark` is a single mark, remove precisely that mark. When it is
      a mark type, remove all marks of that type. When it is null,
      remove all marks of any type.
      */ removeMark(from, to, mark) {
          $77b6a7383a1cf23c$var$removeMark(this, from, to, mark);
          return this;
      }
      /**
      Removes all marks and nodes from the content of the node at
      `pos` that don't match the given new parent node type. Accepts
      an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
      third argument.
      */ clearIncompatible(pos, parentType, match) {
          $77b6a7383a1cf23c$var$clearIncompatible(this, pos, parentType, match);
          return this;
      }
  }
  
  
  const $fc1204d3bb8e8da9$var$classesById = Object.create(null);
  /**
  Superclass for editor selections. Every selection type should
  extend this. Should not be instantiated directly.
  */ class $fc1204d3bb8e8da9$export$52baac22726c72bf {
      /**
      Initialize a selection with the head and anchor and ranges. If no
      ranges are given, constructs a single range across `$anchor` and
      `$head`.
      */ constructor(/**
      The resolved anchor of the selection (the side that stays in
      place when the selection is modified).
      */ $anchor, /**
      The resolved head of the selection (the side that moves when
      the selection is modified).
      */ $head, ranges){
          this.$anchor = $anchor;
          this.$head = $head;
          this.ranges = ranges || [
              new $fc1204d3bb8e8da9$export$7bd1839c3c5d5bd4($anchor.min($head), $anchor.max($head))
          ];
      }
      /**
      The selection's anchor, as an unresolved position.
      */ get anchor() {
          return this.$anchor.pos;
      }
      /**
      The selection's head.
      */ get head() {
          return this.$head.pos;
      }
      /**
      The lower bound of the selection's main range.
      */ get from() {
          return this.$from.pos;
      }
      /**
      The upper bound of the selection's main range.
      */ get to() {
          return this.$to.pos;
      }
      /**
      The resolved lower  bound of the selection's main range.
      */ get $from() {
          return this.ranges[0].$from;
      }
      /**
      The resolved upper bound of the selection's main range.
      */ get $to() {
          return this.ranges[0].$to;
      }
      /**
      Indicates whether the selection contains any content.
      */ get empty() {
          let ranges = this.ranges;
          for(let i = 0; i < ranges.length; i++)if (ranges[i].$from.pos != ranges[i].$to.pos) return false;
          return true;
      }
      /**
      Get the content of this selection as a slice.
      */ content() {
          return this.$from.doc.slice(this.from, this.to, true);
      }
      /**
      Replace the selection with a slice or, if no slice is given,
      delete the selection. Will append to the given transaction.
      */ replace(tr, content = (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
          // Put the new selection at the position after the inserted
          // content. When that ended in an inline node, search backwards,
          // to get the position after that node. If not, search forward.
          let lastNode = content.content.lastChild, lastParent = null;
          for(let i = 0; i < content.openEnd; i++){
              lastParent = lastNode;
              lastNode = lastNode.lastChild;
          }
          let mapFrom = tr.steps.length, ranges = this.ranges;
          for(let i = 0; i < ranges.length; i++){
              let { $from: $from, $to: $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
              tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i ? (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty : content);
              if (i == 0) $fc1204d3bb8e8da9$var$selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
          }
      }
      /**
      Replace the selection with the given node, appending the changes
      to the given transaction.
      */ replaceWith(tr, node) {
          let mapFrom = tr.steps.length, ranges = this.ranges;
          for(let i = 0; i < ranges.length; i++){
              let { $from: $from, $to: $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
              let from = mapping.map($from.pos), to = mapping.map($to.pos);
              if (i) tr.deleteRange(from, to);
              else {
                  tr.replaceRangeWith(from, to, node);
                  $fc1204d3bb8e8da9$var$selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
              }
          }
      }
      /**
      Find a valid cursor or leaf node selection starting at the given
      position and searching back if `dir` is negative, and forward if
      positive. When `textOnly` is true, only consider cursor
      selections. Will return null when no valid selection position is
      found.
      */ static findFrom($pos, dir, textOnly = false) {
          let inner = $pos.parent.inlineContent ? new $fc1204d3bb8e8da9$export$c2b25f346d19bcbb($pos) : $fc1204d3bb8e8da9$var$findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
          if (inner) return inner;
          for(let depth = $pos.depth - 1; depth >= 0; depth--){
              let found = dir < 0 ? $fc1204d3bb8e8da9$var$findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : $fc1204d3bb8e8da9$var$findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
              if (found) return found;
          }
          return null;
      }
      /**
      Find a valid cursor or leaf node selection near the given
      position. Searches forward first by default, but if `bias` is
      negative, it will search backwards first.
      */ static near($pos, bias = 1) {
          return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95($pos.node(0));
      }
      /**
      Find the cursor or leaf node selection closest to the start of
      the given document. Will return an
      [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
      exists.
      */ static atStart(doc) {
          return $fc1204d3bb8e8da9$var$findSelectionIn(doc, doc, 0, 0, 1) || new $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95(doc);
      }
      /**
      Find the cursor or leaf node selection closest to the end of the
      given document.
      */ static atEnd(doc) {
          return $fc1204d3bb8e8da9$var$findSelectionIn(doc, doc, doc.content.size, doc.childCount, -1) || new $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95(doc);
      }
      /**
      Deserialize the JSON representation of a selection. Must be
      implemented for custom classes (as a static class method).
      */ static fromJSON(doc, json) {
          if (!json || !json.type) throw new RangeError("Invalid input for Selection.fromJSON");
          let cls = $fc1204d3bb8e8da9$var$classesById[json.type];
          if (!cls) throw new RangeError(`No selection type ${json.type} defined`);
          return cls.fromJSON(doc, json);
      }
      /**
      To be able to deserialize selections from JSON, custom selection
      classes must register themselves with an ID string, so that they
      can be disambiguated. Try to pick something that's unlikely to
      clash with classes from other modules.
      */ static jsonID(id, selectionClass) {
          if (id in $fc1204d3bb8e8da9$var$classesById) throw new RangeError("Duplicate use of selection JSON ID " + id);
          $fc1204d3bb8e8da9$var$classesById[id] = selectionClass;
          selectionClass.prototype.jsonID = id;
          return selectionClass;
      }
      /**
      Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
      which is a value that can be mapped without having access to a
      current document, and later resolved to a real selection for a
      given document again. (This is used mostly by the history to
      track and restore old selections.) The default implementation of
      this method just converts the selection to a text selection and
      returns the bookmark for that.
      */ getBookmark() {
          return $fc1204d3bb8e8da9$export$c2b25f346d19bcbb.between(this.$anchor, this.$head).getBookmark();
      }
  }
  $fc1204d3bb8e8da9$export$52baac22726c72bf.prototype.visible = true;
  /**
  Represents a selected range in a document.
  */ class $fc1204d3bb8e8da9$export$7bd1839c3c5d5bd4 {
      /**
      Create a range.
      */ constructor(/**
      The lower bound of the range.
      */ $from, /**
      The upper bound of the range.
      */ $to){
          this.$from = $from;
          this.$to = $to;
      }
  }
  let $fc1204d3bb8e8da9$var$warnedAboutTextSelection = false;
  function $fc1204d3bb8e8da9$var$checkTextSelection($pos) {
      if (!$fc1204d3bb8e8da9$var$warnedAboutTextSelection && !$pos.parent.inlineContent) {
          $fc1204d3bb8e8da9$var$warnedAboutTextSelection = true;
          console["warn"]("TextSelection endpoint not pointing into a node with inline content (" + $pos.parent.type.name + ")");
      }
  }
  /**
  A text selection represents a classical editor selection, with a
  head (the moving side) and anchor (immobile side), both of which
  point into textblock nodes. It can be empty (a regular cursor
  position).
  */ class $fc1204d3bb8e8da9$export$c2b25f346d19bcbb extends $fc1204d3bb8e8da9$export$52baac22726c72bf {
      /**
      Construct a text selection between the given points.
      */ constructor($anchor, $head = $anchor){
          $fc1204d3bb8e8da9$var$checkTextSelection($anchor);
          $fc1204d3bb8e8da9$var$checkTextSelection($head);
          super($anchor, $head);
      }
      /**
      Returns a resolved position if this is a cursor selection (an
      empty text selection), and null otherwise.
      */ get $cursor() {
          return this.$anchor.pos == this.$head.pos ? this.$head : null;
      }
      map(doc, mapping) {
          let $head = doc.resolve(mapping.map(this.head));
          if (!$head.parent.inlineContent) return $fc1204d3bb8e8da9$export$52baac22726c72bf.near($head);
          let $anchor = doc.resolve(mapping.map(this.anchor));
          return new $fc1204d3bb8e8da9$export$c2b25f346d19bcbb($anchor.parent.inlineContent ? $anchor : $head, $head);
      }
      replace(tr, content = (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
          super.replace(tr, content);
          if (content == (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
              let marks = this.$from.marksAcross(this.$to);
              if (marks) tr.ensureMarks(marks);
          }
      }
      eq(other) {
          return other instanceof $fc1204d3bb8e8da9$export$c2b25f346d19bcbb && other.anchor == this.anchor && other.head == this.head;
      }
      getBookmark() {
          return new $fc1204d3bb8e8da9$var$TextBookmark(this.anchor, this.head);
      }
      toJSON() {
          return {
              type: "text",
              anchor: this.anchor,
              head: this.head
          };
      }
      /**
      @internal
      */ static fromJSON(doc, json) {
          if (typeof json.anchor != "number" || typeof json.head != "number") throw new RangeError("Invalid input for TextSelection.fromJSON");
          return new $fc1204d3bb8e8da9$export$c2b25f346d19bcbb(doc.resolve(json.anchor), doc.resolve(json.head));
      }
      /**
      Create a text selection from non-resolved positions.
      */ static create(doc, anchor, head = anchor) {
          let $anchor = doc.resolve(anchor);
          return new this($anchor, head == anchor ? $anchor : doc.resolve(head));
      }
      /**
      Return a text selection that spans the given positions or, if
      they aren't text positions, find a text selection near them.
      `bias` determines whether the method searches forward (default)
      or backwards (negative number) first. Will fall back to calling
      [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
      doesn't contain a valid text position.
      */ static between($anchor, $head, bias) {
          let dPos = $anchor.pos - $head.pos;
          if (!bias || dPos) bias = dPos >= 0 ? 1 : -1;
          if (!$head.parent.inlineContent) {
              let found = $fc1204d3bb8e8da9$export$52baac22726c72bf.findFrom($head, bias, true) || $fc1204d3bb8e8da9$export$52baac22726c72bf.findFrom($head, -bias, true);
              if (found) $head = found.$head;
              else return $fc1204d3bb8e8da9$export$52baac22726c72bf.near($head, bias);
          }
          if (!$anchor.parent.inlineContent) {
              if (dPos == 0) $anchor = $head;
              else {
                  $anchor = ($fc1204d3bb8e8da9$export$52baac22726c72bf.findFrom($anchor, -bias, true) || $fc1204d3bb8e8da9$export$52baac22726c72bf.findFrom($anchor, bias, true)).$anchor;
                  if ($anchor.pos < $head.pos != dPos < 0) $anchor = $head;
              }
          }
          return new $fc1204d3bb8e8da9$export$c2b25f346d19bcbb($anchor, $head);
      }
  }
  $fc1204d3bb8e8da9$export$52baac22726c72bf.jsonID("text", $fc1204d3bb8e8da9$export$c2b25f346d19bcbb);
  class $fc1204d3bb8e8da9$var$TextBookmark {
      constructor(anchor, head){
          this.anchor = anchor;
          this.head = head;
      }
      map(mapping) {
          return new $fc1204d3bb8e8da9$var$TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
      }
      resolve(doc) {
          return $fc1204d3bb8e8da9$export$c2b25f346d19bcbb.between(doc.resolve(this.anchor), doc.resolve(this.head));
      }
  }
  /**
  A node selection is a selection that points at a single node. All
  nodes marked [selectable](https://prosemirror.net/docs/ref/#model.NodeSpec.selectable) can be the
  target of a node selection. In such a selection, `from` and `to`
  point directly before and after the selected node, `anchor` equals
  `from`, and `head` equals `to`..
  */ class $fc1204d3bb8e8da9$export$e2940151ac854c0b extends $fc1204d3bb8e8da9$export$52baac22726c72bf {
      /**
      Create a node selection. Does not verify the validity of its
      argument.
      */ constructor($pos){
          let node = $pos.nodeAfter;
          let $end = $pos.node(0).resolve($pos.pos + node.nodeSize);
          super($pos, $end);
          this.node = node;
      }
      map(doc, mapping) {
          let { deleted: deleted, pos: pos } = mapping.mapResult(this.anchor);
          let $pos = doc.resolve(pos);
          if (deleted) return $fc1204d3bb8e8da9$export$52baac22726c72bf.near($pos);
          return new $fc1204d3bb8e8da9$export$e2940151ac854c0b($pos);
      }
      content() {
          return new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(this.node), 0, 0);
      }
      eq(other) {
          return other instanceof $fc1204d3bb8e8da9$export$e2940151ac854c0b && other.anchor == this.anchor;
      }
      toJSON() {
          return {
              type: "node",
              anchor: this.anchor
          };
      }
      getBookmark() {
          return new $fc1204d3bb8e8da9$var$NodeBookmark(this.anchor);
      }
      /**
      @internal
      */ static fromJSON(doc, json) {
          if (typeof json.anchor != "number") throw new RangeError("Invalid input for NodeSelection.fromJSON");
          return new $fc1204d3bb8e8da9$export$e2940151ac854c0b(doc.resolve(json.anchor));
      }
      /**
      Create a node selection from non-resolved positions.
      */ static create(doc, from) {
          return new $fc1204d3bb8e8da9$export$e2940151ac854c0b(doc.resolve(from));
      }
      /**
      Determines whether the given node may be selected as a node
      selection.
      */ static isSelectable(node) {
          return !node.isText && node.type.spec.selectable !== false;
      }
  }
  $fc1204d3bb8e8da9$export$e2940151ac854c0b.prototype.visible = false;
  $fc1204d3bb8e8da9$export$52baac22726c72bf.jsonID("node", $fc1204d3bb8e8da9$export$e2940151ac854c0b);
  class $fc1204d3bb8e8da9$var$NodeBookmark {
      constructor(anchor){
          this.anchor = anchor;
      }
      map(mapping) {
          let { deleted: deleted, pos: pos } = mapping.mapResult(this.anchor);
          return deleted ? new $fc1204d3bb8e8da9$var$TextBookmark(pos, pos) : new $fc1204d3bb8e8da9$var$NodeBookmark(pos);
      }
      resolve(doc) {
          let $pos = doc.resolve(this.anchor), node = $pos.nodeAfter;
          if (node && $fc1204d3bb8e8da9$export$e2940151ac854c0b.isSelectable(node)) return new $fc1204d3bb8e8da9$export$e2940151ac854c0b($pos);
          return $fc1204d3bb8e8da9$export$52baac22726c72bf.near($pos);
      }
  }
  /**
  A selection type that represents selecting the whole document
  (which can not necessarily be expressed with a text selection, when
  there are for example leaf block nodes at the start or end of the
  document).
  */ class $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95 extends $fc1204d3bb8e8da9$export$52baac22726c72bf {
      /**
      Create an all-selection over the given document.
      */ constructor(doc){
          super(doc.resolve(0), doc.resolve(doc.content.size));
      }
      replace(tr, content = (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
          if (content == (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty) {
              tr.delete(0, tr.doc.content.size);
              let sel = $fc1204d3bb8e8da9$export$52baac22726c72bf.atStart(tr.doc);
              if (!sel.eq(tr.selection)) tr.setSelection(sel);
          } else super.replace(tr, content);
      }
      toJSON() {
          return {
              type: "all"
          };
      }
      /**
      @internal
      */ static fromJSON(doc) {
          return new $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95(doc);
      }
      map(doc) {
          return new $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95(doc);
      }
      eq(other) {
          return other instanceof $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95;
      }
      getBookmark() {
          return $fc1204d3bb8e8da9$var$AllBookmark;
      }
  }
  $fc1204d3bb8e8da9$export$52baac22726c72bf.jsonID("all", $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95);
  const $fc1204d3bb8e8da9$var$AllBookmark = {
      map () {
          return this;
      },
      resolve (doc) {
          return new $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95(doc);
      }
  };
  // FIXME we'll need some awareness of text direction when scanning for selections
  // Try to find a selection inside the given node. `pos` points at the
  // position where the search starts. When `text` is true, only return
  // text selections.
  function $fc1204d3bb8e8da9$var$findSelectionIn(doc, node, pos, index, dir, text = false) {
      if (node.inlineContent) return $fc1204d3bb8e8da9$export$c2b25f346d19bcbb.create(doc, pos);
      for(let i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir){
          let child = node.child(i);
          if (!child.isAtom) {
              let inner = $fc1204d3bb8e8da9$var$findSelectionIn(doc, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text);
              if (inner) return inner;
          } else if (!text && $fc1204d3bb8e8da9$export$e2940151ac854c0b.isSelectable(child)) return $fc1204d3bb8e8da9$export$e2940151ac854c0b.create(doc, pos - (dir < 0 ? child.nodeSize : 0));
          pos += child.nodeSize * dir;
      }
      return null;
  }
  function $fc1204d3bb8e8da9$var$selectionToInsertionEnd(tr, startLen, bias) {
      let last = tr.steps.length - 1;
      if (last < startLen) return;
      let step = tr.steps[last];
      if (!(step instanceof (0, $77b6a7383a1cf23c$export$5c860b2e74034756) || step instanceof (0, $77b6a7383a1cf23c$export$444ba800d6024a98))) return;
      let map = tr.mapping.maps[last], end;
      map.forEach((_from, _to, _newFrom, newTo)=>{
          if (end == null) end = newTo;
      });
      tr.setSelection($fc1204d3bb8e8da9$export$52baac22726c72bf.near(tr.doc.resolve(end), bias));
  }
  const $fc1204d3bb8e8da9$var$UPDATED_SEL = 1, $fc1204d3bb8e8da9$var$UPDATED_MARKS = 2, $fc1204d3bb8e8da9$var$UPDATED_SCROLL = 4;
  /**
  An editor state transaction, which can be applied to a state to
  create an updated state. Use
  [`EditorState.tr`](https://prosemirror.net/docs/ref/#state.EditorState.tr) to create an instance.
  
  Transactions track changes to the document (they are a subclass of
  [`Transform`](https://prosemirror.net/docs/ref/#transform.Transform)), but also other state changes,
  like selection updates and adjustments of the set of [stored
  marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks). In addition, you can store
  metadata properties in a transaction, which are extra pieces of
  information that client code or plugins can use to describe what a
  transaction represents, so that they can update their [own
  state](https://prosemirror.net/docs/ref/#state.StateField) accordingly.
  
  The [editor view](https://prosemirror.net/docs/ref/#view.EditorView) uses a few metadata
  properties: it will attach a property `"pointer"` with the value
  `true` to selection transactions directly caused by mouse or touch
  input, a `"composition"` property holding an ID identifying the
  composition that caused it to transactions caused by composed DOM
  input, and a `"uiEvent"` property of that may be `"paste"`,
  `"cut"`, or `"drop"`.
  */ class $fc1204d3bb8e8da9$export$febc5573c75cefb0 extends (0, $77b6a7383a1cf23c$export$563a914cafbdc389) {
      /**
      @internal
      */ constructor(state){
          super(state.doc);
          // The step count for which the current selection is valid.
          this.curSelectionFor = 0;
          // Bitfield to track which aspects of the state were updated by
          // this transaction.
          this.updated = 0;
          // Object used to store metadata properties for the transaction.
          this.meta = Object.create(null);
          this.time = Date.now();
          this.curSelection = state.selection;
          this.storedMarks = state.storedMarks;
      }
      /**
      The transaction's current selection. This defaults to the editor
      selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
      transaction, but can be overwritten with
      [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
      */ get selection() {
          if (this.curSelectionFor < this.steps.length) {
              this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
              this.curSelectionFor = this.steps.length;
          }
          return this.curSelection;
      }
      /**
      Update the transaction's current selection. Will determine the
      selection that the editor gets when the transaction is applied.
      */ setSelection(selection) {
          if (selection.$from.doc != this.doc) throw new RangeError("Selection passed to setSelection must point at the current document");
          this.curSelection = selection;
          this.curSelectionFor = this.steps.length;
          this.updated = (this.updated | $fc1204d3bb8e8da9$var$UPDATED_SEL) & ~$fc1204d3bb8e8da9$var$UPDATED_MARKS;
          this.storedMarks = null;
          return this;
      }
      /**
      Whether the selection was explicitly updated by this transaction.
      */ get selectionSet() {
          return (this.updated & $fc1204d3bb8e8da9$var$UPDATED_SEL) > 0;
      }
      /**
      Set the current stored marks.
      */ setStoredMarks(marks) {
          this.storedMarks = marks;
          this.updated |= $fc1204d3bb8e8da9$var$UPDATED_MARKS;
          return this;
      }
      /**
      Make sure the current stored marks or, if that is null, the marks
      at the selection, match the given set of marks. Does nothing if
      this is already the case.
      */ ensureMarks(marks) {
          if (!(0, $59526ec4d3b41406$export$c9d15bcfc6d42044).sameSet(this.storedMarks || this.selection.$from.marks(), marks)) this.setStoredMarks(marks);
          return this;
      }
      /**
      Add a mark to the set of stored marks.
      */ addStoredMark(mark) {
          return this.ensureMarks(mark.addToSet(this.storedMarks || this.selection.$head.marks()));
      }
      /**
      Remove a mark or mark type from the set of stored marks.
      */ removeStoredMark(mark) {
          return this.ensureMarks(mark.removeFromSet(this.storedMarks || this.selection.$head.marks()));
      }
      /**
      Whether the stored marks were explicitly set for this transaction.
      */ get storedMarksSet() {
          return (this.updated & $fc1204d3bb8e8da9$var$UPDATED_MARKS) > 0;
      }
      /**
      @internal
      */ addStep(step, doc) {
          super.addStep(step, doc);
          this.updated = this.updated & ~$fc1204d3bb8e8da9$var$UPDATED_MARKS;
          this.storedMarks = null;
      }
      /**
      Update the timestamp for the transaction.
      */ setTime(time) {
          this.time = time;
          return this;
      }
      /**
      Replace the current selection with the given slice.
      */ replaceSelection(slice) {
          this.selection.replace(this, slice);
          return this;
      }
      /**
      Replace the selection with the given node. When `inheritMarks` is
      true and the content is inline, it inherits the marks from the
      place where it is inserted.
      */ replaceSelectionWith(node, inheritMarks = true) {
          let selection = this.selection;
          if (inheritMarks) node = node.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : selection.$from.marksAcross(selection.$to) || (0, $59526ec4d3b41406$export$c9d15bcfc6d42044).none));
          selection.replaceWith(this, node);
          return this;
      }
      /**
      Delete the selection.
      */ deleteSelection() {
          this.selection.replace(this);
          return this;
      }
      /**
      Replace the given range, or the selection if no range is given,
      with a text node containing the given string.
      */ insertText(text, from, to) {
          let schema = this.doc.type.schema;
          if (from == null) {
              if (!text) return this.deleteSelection();
              return this.replaceSelectionWith(schema.text(text), true);
          } else {
              if (to == null) to = from;
              to = to == null ? from : to;
              if (!text) return this.deleteRange(from, to);
              let marks = this.storedMarks;
              if (!marks) {
                  let $from = this.doc.resolve(from);
                  marks = to == from ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
              }
              this.replaceRangeWith(from, to, schema.text(text, marks));
              if (!this.selection.empty) this.setSelection($fc1204d3bb8e8da9$export$52baac22726c72bf.near(this.selection.$to));
              return this;
          }
      }
      /**
      Store a metadata property in this transaction, keyed either by
      name or by plugin.
      */ setMeta(key, value) {
          this.meta[typeof key == "string" ? key : key.key] = value;
          return this;
      }
      /**
      Retrieve a metadata property for a given name or plugin.
      */ getMeta(key) {
          return this.meta[typeof key == "string" ? key : key.key];
      }
      /**
      Returns true if this transaction doesn't contain any metadata,
      and can thus safely be extended.
      */ get isGeneric() {
          for(let _ in this.meta)return false;
          return true;
      }
      /**
      Indicate that the editor should scroll the selection into view
      when updated to the state produced by this transaction.
      */ scrollIntoView() {
          this.updated |= $fc1204d3bb8e8da9$var$UPDATED_SCROLL;
          return this;
      }
      /**
      True when this transaction has had `scrollIntoView` called on it.
      */ get scrolledIntoView() {
          return (this.updated & $fc1204d3bb8e8da9$var$UPDATED_SCROLL) > 0;
      }
  }
  function $fc1204d3bb8e8da9$var$bind(f, self) {
      return !self || !f ? f : f.bind(self);
  }
  class $fc1204d3bb8e8da9$var$FieldDesc {
      constructor(name, desc, self){
          this.name = name;
          this.init = $fc1204d3bb8e8da9$var$bind(desc.init, self);
          this.apply = $fc1204d3bb8e8da9$var$bind(desc.apply, self);
      }
  }
  const $fc1204d3bb8e8da9$var$baseFields = [
      new $fc1204d3bb8e8da9$var$FieldDesc("doc", {
          init (config) {
              return config.doc || config.schema.topNodeType.createAndFill();
          },
          apply (tr) {
              return tr.doc;
          }
      }),
      new $fc1204d3bb8e8da9$var$FieldDesc("selection", {
          init (config, instance) {
              return config.selection || $fc1204d3bb8e8da9$export$52baac22726c72bf.atStart(instance.doc);
          },
          apply (tr) {
              return tr.selection;
          }
      }),
      new $fc1204d3bb8e8da9$var$FieldDesc("storedMarks", {
          init (config) {
              return config.storedMarks || null;
          },
          apply (tr, _marks, _old, state) {
              return state.selection.$cursor ? tr.storedMarks : null;
          }
      }),
      new $fc1204d3bb8e8da9$var$FieldDesc("scrollToSelection", {
          init () {
              return 0;
          },
          apply (tr, prev) {
              return tr.scrolledIntoView ? prev + 1 : prev;
          }
      })
  ];
  // Object wrapping the part of a state object that stays the same
  // across transactions. Stored in the state's `config` property.
  class $fc1204d3bb8e8da9$var$Configuration {
      constructor(schema, plugins){
          this.schema = schema;
          this.plugins = [];
          this.pluginsByKey = Object.create(null);
          this.fields = $fc1204d3bb8e8da9$var$baseFields.slice();
          if (plugins) plugins.forEach((plugin)=>{
              if (this.pluginsByKey[plugin.key]) throw new RangeError("Adding different instances of a keyed plugin (" + plugin.key + ")");
              this.plugins.push(plugin);
              this.pluginsByKey[plugin.key] = plugin;
              if (plugin.spec.state) this.fields.push(new $fc1204d3bb8e8da9$var$FieldDesc(plugin.key, plugin.spec.state, plugin));
          });
      }
  }
  /**
  The state of a ProseMirror editor is represented by an object of
  this type. A state is a persistent data structure—it isn't
  updated, but rather a new state value is computed from an old one
  using the [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) method.
  
  A state holds a number of built-in fields, and plugins can
  [define](https://prosemirror.net/docs/ref/#state.PluginSpec.state) additional fields.
  */ class $fc1204d3bb8e8da9$export$afa855cbfaff27f2 {
      /**
      @internal
      */ constructor(/**
      @internal
      */ config){
          this.config = config;
      }
      /**
      The schema of the state's document.
      */ get schema() {
          return this.config.schema;
      }
      /**
      The plugins that are active in this state.
      */ get plugins() {
          return this.config.plugins;
      }
      /**
      Apply the given transaction to produce a new state.
      */ apply(tr) {
          return this.applyTransaction(tr).state;
      }
      /**
      @internal
      */ filterTransaction(tr, ignore = -1) {
          for(let i = 0; i < this.config.plugins.length; i++)if (i != ignore) {
              let plugin = this.config.plugins[i];
              if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this)) return false;
          }
          return true;
      }
      /**
      Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
      returns the precise transactions that were applied (which might
      be influenced by the [transaction
      hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
      plugins) along with the new state.
      */ applyTransaction(rootTr) {
          if (!this.filterTransaction(rootTr)) return {
              state: this,
              transactions: []
          };
          let trs = [
              rootTr
          ], newState = this.applyInner(rootTr), seen = null;
          // This loop repeatedly gives plugins a chance to respond to
          // transactions as new transactions are added, making sure to only
          // pass the transactions the plugin did not see before.
          for(;;){
              let haveNew = false;
              for(let i = 0; i < this.config.plugins.length; i++){
                  let plugin = this.config.plugins[i];
                  if (plugin.spec.appendTransaction) {
                      let n = seen ? seen[i].n : 0, oldState = seen ? seen[i].state : this;
                      let tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
                      if (tr && newState.filterTransaction(tr, i)) {
                          tr.setMeta("appendedTransaction", rootTr);
                          if (!seen) {
                              seen = [];
                              for(let j = 0; j < this.config.plugins.length; j++)seen.push(j < i ? {
                                  state: newState,
                                  n: trs.length
                              } : {
                                  state: this,
                                  n: 0
                              });
                          }
                          trs.push(tr);
                          newState = newState.applyInner(tr);
                          haveNew = true;
                      }
                      if (seen) seen[i] = {
                          state: newState,
                          n: trs.length
                      };
                  }
              }
              if (!haveNew) return {
                  state: newState,
                  transactions: trs
              };
          }
      }
      /**
      @internal
      */ applyInner(tr) {
          if (!tr.before.eq(this.doc)) throw new RangeError("Applying a mismatched transaction");
          let newInstance = new $fc1204d3bb8e8da9$export$afa855cbfaff27f2(this.config), fields = this.config.fields;
          for(let i = 0; i < fields.length; i++){
              let field = fields[i];
              newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
          }
          return newInstance;
      }
      /**
      Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
      */ get tr() {
          return new $fc1204d3bb8e8da9$export$febc5573c75cefb0(this);
      }
      /**
      Create a new state.
      */ static create(config) {
          let $config = new $fc1204d3bb8e8da9$var$Configuration(config.doc ? config.doc.type.schema : config.schema, config.plugins);
          let instance = new $fc1204d3bb8e8da9$export$afa855cbfaff27f2($config);
          for(let i = 0; i < $config.fields.length; i++)instance[$config.fields[i].name] = $config.fields[i].init(config, instance);
          return instance;
      }
      /**
      Create a new state based on this one, but with an adjusted set
      of active plugins. State fields that exist in both sets of
      plugins are kept unchanged. Those that no longer exist are
      dropped, and those that are new are initialized using their
      [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
      configuration object..
      */ reconfigure(config) {
          let $config = new $fc1204d3bb8e8da9$var$Configuration(this.schema, config.plugins);
          let fields = $config.fields, instance = new $fc1204d3bb8e8da9$export$afa855cbfaff27f2($config);
          for(let i = 0; i < fields.length; i++){
              let name = fields[i].name;
              instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i].init(config, instance);
          }
          return instance;
      }
      /**
      Serialize this state to JSON. If you want to serialize the state
      of plugins, pass an object mapping property names to use in the
      resulting JSON object to plugin objects. The argument may also be
      a string or number, in which case it is ignored, to support the
      way `JSON.stringify` calls `toString` methods.
      */ toJSON(pluginFields) {
          let result = {
              doc: this.doc.toJSON(),
              selection: this.selection.toJSON()
          };
          if (this.storedMarks) result.storedMarks = this.storedMarks.map((m)=>m.toJSON());
          if (pluginFields && typeof pluginFields == "object") for(let prop in pluginFields){
              if (prop == "doc" || prop == "selection") throw new RangeError("The JSON fields `doc` and `selection` are reserved");
              let plugin = pluginFields[prop], state = plugin.spec.state;
              if (state && state.toJSON) result[prop] = state.toJSON.call(plugin, this[plugin.key]);
          }
          return result;
      }
      /**
      Deserialize a JSON representation of a state. `config` should
      have at least a `schema` field, and should contain array of
      plugins to initialize the state with. `pluginFields` can be used
      to deserialize the state of plugins, by associating plugin
      instances with the property names they use in the JSON object.
      */ static fromJSON(config, json, pluginFields) {
          if (!json) throw new RangeError("Invalid input for EditorState.fromJSON");
          if (!config.schema) throw new RangeError("Required config field 'schema' missing");
          let $config = new $fc1204d3bb8e8da9$var$Configuration(config.schema, config.plugins);
          let instance = new $fc1204d3bb8e8da9$export$afa855cbfaff27f2($config);
          $config.fields.forEach((field)=>{
              if (field.name == "doc") instance.doc = (0, $59526ec4d3b41406$export$85c928794f8d04d4).fromJSON(config.schema, json.doc);
              else if (field.name == "selection") instance.selection = $fc1204d3bb8e8da9$export$52baac22726c72bf.fromJSON(instance.doc, json.selection);
              else if (field.name == "storedMarks") {
                  if (json.storedMarks) instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);
              } else {
                  if (pluginFields) for(let prop in pluginFields){
                      let plugin = pluginFields[prop], state = plugin.spec.state;
                      if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop)) {
                          instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
                          return;
                      }
                  }
                  instance[field.name] = field.init(config, instance);
              }
          });
          return instance;
      }
  }
  function $fc1204d3bb8e8da9$var$bindProps(obj, self, target) {
      for(let prop in obj){
          let val = obj[prop];
          if (val instanceof Function) val = val.bind(self);
          else if (prop == "handleDOMEvents") val = $fc1204d3bb8e8da9$var$bindProps(val, self, {});
          target[prop] = val;
      }
      return target;
  }
  /**
  Plugins bundle functionality that can be added to an editor.
  They are part of the [editor state](https://prosemirror.net/docs/ref/#state.EditorState) and
  may influence that state and the view that contains it.
  */ class $fc1204d3bb8e8da9$export$901cf72dabf2112a {
      /**
      Create a plugin.
      */ constructor(/**
      The plugin's [spec object](https://prosemirror.net/docs/ref/#state.PluginSpec).
      */ spec){
          this.spec = spec;
          /**
          The [props](https://prosemirror.net/docs/ref/#view.EditorProps) exported by this plugin.
          */ this.props = {};
          if (spec.props) $fc1204d3bb8e8da9$var$bindProps(spec.props, this, this.props);
          this.key = spec.key ? spec.key.key : $fc1204d3bb8e8da9$var$createKey("plugin");
      }
      /**
      Extract the plugin's state field from an editor state.
      */ getState(state) {
          return state[this.key];
      }
  }
  const $fc1204d3bb8e8da9$var$keys = Object.create(null);
  function $fc1204d3bb8e8da9$var$createKey(name) {
      if (name in $fc1204d3bb8e8da9$var$keys) return name + "$" + ++$fc1204d3bb8e8da9$var$keys[name];
      $fc1204d3bb8e8da9$var$keys[name] = 0;
      return name + "$";
  }
  /**
  A key is used to [tag](https://prosemirror.net/docs/ref/#state.PluginSpec.key) plugins in a way
  that makes it possible to find them, given an editor state.
  Assigning a key does mean only one plugin of that type can be
  active in a state.
  */ class $fc1204d3bb8e8da9$export$1692d8b0e89cecc3 {
      /**
      Create a plugin key.
      */ constructor(name = "key"){
          this.key = $fc1204d3bb8e8da9$var$createKey(name);
      }
      /**
      Get the active plugin with this key, if any, from an editor
      state.
      */ get(state) {
          return state.config.pluginsByKey[this.key];
      }
      /**
      Get the plugin's state from an editor state.
      */ getState(state) {
          return state[this.key];
      }
  }
  
  
  var $f18febfa986513b3$exports = {};
  
  $parcel$export($f18febfa986513b3$exports, "Decoration", () => $f18febfa986513b3$export$10e30b733df217ea);
  $parcel$export($f18febfa986513b3$exports, "DecorationSet", () => $f18febfa986513b3$export$93bf62eb445cec98);
  $parcel$export($f18febfa986513b3$exports, "__serializeForClipboard", () => $f18febfa986513b3$export$38b79e3fdcfcfd68);
  $parcel$export($f18febfa986513b3$exports, "__parseFromClipboard", () => $f18febfa986513b3$export$5d42ca91c11c9e4d);
  $parcel$export($f18febfa986513b3$exports, "__endComposition", () => $f18febfa986513b3$export$76b14d3c719c32fc);
  $parcel$export($f18febfa986513b3$exports, "EditorView", () => $f18febfa986513b3$export$eece2fccabbb77c5);
  
  
  
  const $f18febfa986513b3$var$domIndex = function(node) {
      for(var index = 0;; index++){
          node = node.previousSibling;
          if (!node) return index;
      }
  };
  const $f18febfa986513b3$var$parentNode = function(node) {
      let parent = node.assignedSlot || node.parentNode;
      return parent && parent.nodeType == 11 ? parent.host : parent;
  };
  let $f18febfa986513b3$var$reusedRange = null;
  // Note that this will always return the same range, because DOM range
  // objects are every expensive, and keep slowing down subsequent DOM
  // updates, for some reason.
  const $f18febfa986513b3$var$textRange = function(node, from, to) {
      let range = $f18febfa986513b3$var$reusedRange || ($f18febfa986513b3$var$reusedRange = document.createRange());
      range.setEnd(node, to == null ? node.nodeValue.length : to);
      range.setStart(node, from || 0);
      return range;
  };
  // Scans forward and backward through DOM positions equivalent to the
  // given one to see if the two are in the same place (i.e. after a
  // text node vs at the end of that text node)
  const $f18febfa986513b3$var$isEquivalentPosition = function(node, off, targetNode, targetOff) {
      return targetNode && ($f18febfa986513b3$var$scanFor(node, off, targetNode, targetOff, -1) || $f18febfa986513b3$var$scanFor(node, off, targetNode, targetOff, 1));
  };
  const $f18febfa986513b3$var$atomElements = /^(img|br|input|textarea|hr)$/i;
  function $f18febfa986513b3$var$scanFor(node, off, targetNode, targetOff, dir) {
      for(;;){
          if (node == targetNode && off == targetOff) return true;
          if (off == (dir < 0 ? 0 : $f18febfa986513b3$var$nodeSize(node))) {
              let parent = node.parentNode;
              if (!parent || parent.nodeType != 1 || $f18febfa986513b3$var$hasBlockDesc(node) || $f18febfa986513b3$var$atomElements.test(node.nodeName) || node.contentEditable == "false") return false;
              off = $f18febfa986513b3$var$domIndex(node) + (dir < 0 ? 0 : 1);
              node = parent;
          } else if (node.nodeType == 1) {
              node = node.childNodes[off + (dir < 0 ? -1 : 0)];
              if (node.contentEditable == "false") return false;
              off = dir < 0 ? $f18febfa986513b3$var$nodeSize(node) : 0;
          } else return false;
      }
  }
  function $f18febfa986513b3$var$nodeSize(node) {
      return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }
  function $f18febfa986513b3$var$isOnEdge(node, offset, parent) {
      for(let atStart = offset == 0, atEnd = offset == $f18febfa986513b3$var$nodeSize(node); atStart || atEnd;){
          if (node == parent) return true;
          let index = $f18febfa986513b3$var$domIndex(node);
          node = node.parentNode;
          if (!node) return false;
          atStart = atStart && index == 0;
          atEnd = atEnd && index == $f18febfa986513b3$var$nodeSize(node);
      }
  }
  function $f18febfa986513b3$var$hasBlockDesc(dom) {
      let desc;
      for(let cur = dom; cur; cur = cur.parentNode)if (desc = cur.pmViewDesc) break;
      return desc && desc.node && desc.node.isBlock && (desc.dom == dom || desc.contentDOM == dom);
  }
  // Work around Chrome issue https://bugs.chromium.org/p/chromium/issues/detail?id=447523
  // (isCollapsed inappropriately returns true in shadow dom)
  const $f18febfa986513b3$var$selectionCollapsed = function(domSel) {
      return domSel.focusNode && $f18febfa986513b3$var$isEquivalentPosition(domSel.focusNode, domSel.focusOffset, domSel.anchorNode, domSel.anchorOffset);
  };
  function $f18febfa986513b3$var$keyEvent(keyCode, key) {
      let event = document.createEvent("Event");
      event.initEvent("keydown", true, true);
      event.keyCode = keyCode;
      event.key = event.code = key;
      return event;
  }
  function $f18febfa986513b3$var$deepActiveElement(doc) {
      let elt = doc.activeElement;
      while(elt && elt.shadowRoot)elt = elt.shadowRoot.activeElement;
      return elt;
  }
  function $f18febfa986513b3$var$caretFromPoint(doc, x, y) {
      if (doc.caretPositionFromPoint) try {
          let pos = doc.caretPositionFromPoint(x, y);
          if (pos) return {
              node: pos.offsetNode,
              offset: pos.offset
          };
      } catch (_) {}
      if (doc.caretRangeFromPoint) {
          let range = doc.caretRangeFromPoint(x, y);
          if (range) return {
              node: range.startContainer,
              offset: range.startOffset
          };
      }
  }
  const $f18febfa986513b3$var$nav = typeof navigator != "undefined" ? navigator : null;
  const $f18febfa986513b3$var$doc = typeof document != "undefined" ? document : null;
  const $f18febfa986513b3$var$agent = $f18febfa986513b3$var$nav && $f18febfa986513b3$var$nav.userAgent || "";
  const $f18febfa986513b3$var$ie_edge = /Edge\/(\d+)/.exec($f18febfa986513b3$var$agent);
  const $f18febfa986513b3$var$ie_upto10 = /MSIE \d/.exec($f18febfa986513b3$var$agent);
  const $f18febfa986513b3$var$ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec($f18febfa986513b3$var$agent);
  const $f18febfa986513b3$var$ie = !!($f18febfa986513b3$var$ie_upto10 || $f18febfa986513b3$var$ie_11up || $f18febfa986513b3$var$ie_edge);
  const $f18febfa986513b3$var$ie_version = $f18febfa986513b3$var$ie_upto10 ? document.documentMode : $f18febfa986513b3$var$ie_11up ? +$f18febfa986513b3$var$ie_11up[1] : $f18febfa986513b3$var$ie_edge ? +$f18febfa986513b3$var$ie_edge[1] : 0;
  const $f18febfa986513b3$var$gecko = !$f18febfa986513b3$var$ie && /gecko\/(\d+)/i.test($f18febfa986513b3$var$agent);
  $f18febfa986513b3$var$gecko && (/Firefox\/(\d+)/.exec($f18febfa986513b3$var$agent) || [
      0,
      0
  ])[1];
  const $f18febfa986513b3$var$_chrome = !$f18febfa986513b3$var$ie && /Chrome\/(\d+)/.exec($f18febfa986513b3$var$agent);
  const $f18febfa986513b3$var$chrome = !!$f18febfa986513b3$var$_chrome;
  const $f18febfa986513b3$var$chrome_version = $f18febfa986513b3$var$_chrome ? +$f18febfa986513b3$var$_chrome[1] : 0;
  const $f18febfa986513b3$var$safari = !$f18febfa986513b3$var$ie && !!$f18febfa986513b3$var$nav && /Apple Computer/.test($f18febfa986513b3$var$nav.vendor);
  // Is true for both iOS and iPadOS for convenience
  const $f18febfa986513b3$var$ios = $f18febfa986513b3$var$safari && (/Mobile\/\w+/.test($f18febfa986513b3$var$agent) || !!$f18febfa986513b3$var$nav && $f18febfa986513b3$var$nav.maxTouchPoints > 2);
  const $f18febfa986513b3$var$mac = $f18febfa986513b3$var$ios || ($f18febfa986513b3$var$nav ? /Mac/.test($f18febfa986513b3$var$nav.platform) : false);
  const $f18febfa986513b3$var$windows = $f18febfa986513b3$var$nav ? /Win/.test($f18febfa986513b3$var$nav.platform) : false;
  const $f18febfa986513b3$var$android = /Android \d/.test($f18febfa986513b3$var$agent);
  const $f18febfa986513b3$var$webkit = !!$f18febfa986513b3$var$doc && "webkitFontSmoothing" in $f18febfa986513b3$var$doc.documentElement.style;
  const $f18febfa986513b3$var$webkit_version = $f18febfa986513b3$var$webkit ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [
      0,
      0
  ])[1] : 0;
  function $f18febfa986513b3$var$windowRect(doc) {
      return {
          left: 0,
          right: doc.documentElement.clientWidth,
          top: 0,
          bottom: doc.documentElement.clientHeight
      };
  }
  function $f18febfa986513b3$var$getSide(value, side) {
      return typeof value == "number" ? value : value[side];
  }
  function $f18febfa986513b3$var$clientRect(node) {
      let rect = node.getBoundingClientRect();
      // Adjust for elements with style "transform: scale()"
      let scaleX = rect.width / node.offsetWidth || 1;
      let scaleY = rect.height / node.offsetHeight || 1;
      // Make sure scrollbar width isn't included in the rectangle
      return {
          left: rect.left,
          right: rect.left + node.clientWidth * scaleX,
          top: rect.top,
          bottom: rect.top + node.clientHeight * scaleY
      };
  }
  function $f18febfa986513b3$var$scrollRectIntoView(view, rect, startDOM) {
      let scrollThreshold = view.someProp("scrollThreshold") || 0, scrollMargin = view.someProp("scrollMargin") || 5;
      let doc = view.dom.ownerDocument;
      for(let parent = startDOM || view.dom;; parent = $f18febfa986513b3$var$parentNode(parent)){
          if (!parent) break;
          if (parent.nodeType != 1) continue;
          let elt = parent;
          let atTop = elt == doc.body;
          let bounding = atTop ? $f18febfa986513b3$var$windowRect(doc) : $f18febfa986513b3$var$clientRect(elt);
          let moveX = 0, moveY = 0;
          if (rect.top < bounding.top + $f18febfa986513b3$var$getSide(scrollThreshold, "top")) moveY = -(bounding.top - rect.top + $f18febfa986513b3$var$getSide(scrollMargin, "top"));
          else if (rect.bottom > bounding.bottom - $f18febfa986513b3$var$getSide(scrollThreshold, "bottom")) moveY = rect.bottom - rect.top > bounding.bottom - bounding.top ? rect.top + $f18febfa986513b3$var$getSide(scrollMargin, "top") - bounding.top : rect.bottom - bounding.bottom + $f18febfa986513b3$var$getSide(scrollMargin, "bottom");
          if (rect.left < bounding.left + $f18febfa986513b3$var$getSide(scrollThreshold, "left")) moveX = -(bounding.left - rect.left + $f18febfa986513b3$var$getSide(scrollMargin, "left"));
          else if (rect.right > bounding.right - $f18febfa986513b3$var$getSide(scrollThreshold, "right")) moveX = rect.right - bounding.right + $f18febfa986513b3$var$getSide(scrollMargin, "right");
          if (moveX || moveY) {
              if (atTop) doc.defaultView.scrollBy(moveX, moveY);
              else {
                  let startX = elt.scrollLeft, startY = elt.scrollTop;
                  if (moveY) elt.scrollTop += moveY;
                  if (moveX) elt.scrollLeft += moveX;
                  let dX = elt.scrollLeft - startX, dY = elt.scrollTop - startY;
                  rect = {
                      left: rect.left - dX,
                      top: rect.top - dY,
                      right: rect.right - dX,
                      bottom: rect.bottom - dY
                  };
              }
          }
          if (atTop || /^(fixed|sticky)$/.test(getComputedStyle(parent).position)) break;
      }
  }
  // Store the scroll position of the editor's parent nodes, along with
  // the top position of an element near the top of the editor, which
  // will be used to make sure the visible viewport remains stable even
  // when the size of the content above changes.
  function $f18febfa986513b3$var$storeScrollPos(view) {
      let rect = view.dom.getBoundingClientRect(), startY = Math.max(0, rect.top);
      let refDOM, refTop;
      for(let x = (rect.left + rect.right) / 2, y = startY + 1; y < Math.min(innerHeight, rect.bottom); y += 5){
          let dom = view.root.elementFromPoint(x, y);
          if (!dom || dom == view.dom || !view.dom.contains(dom)) continue;
          let localRect = dom.getBoundingClientRect();
          if (localRect.top >= startY - 20) {
              refDOM = dom;
              refTop = localRect.top;
              break;
          }
      }
      return {
          refDOM: refDOM,
          refTop: refTop,
          stack: $f18febfa986513b3$var$scrollStack(view.dom)
      };
  }
  function $f18febfa986513b3$var$scrollStack(dom) {
      let stack = [], doc = dom.ownerDocument;
      for(let cur = dom; cur; cur = $f18febfa986513b3$var$parentNode(cur)){
          stack.push({
              dom: cur,
              top: cur.scrollTop,
              left: cur.scrollLeft
          });
          if (dom == doc) break;
      }
      return stack;
  }
  // Reset the scroll position of the editor's parent nodes to that what
  // it was before, when storeScrollPos was called.
  function $f18febfa986513b3$var$resetScrollPos({ refDOM: refDOM, refTop: refTop, stack: stack }) {
      let newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
      $f18febfa986513b3$var$restoreScrollStack(stack, newRefTop == 0 ? 0 : newRefTop - refTop);
  }
  function $f18febfa986513b3$var$restoreScrollStack(stack, dTop) {
      for(let i = 0; i < stack.length; i++){
          let { dom: dom, top: top, left: left } = stack[i];
          if (dom.scrollTop != top + dTop) dom.scrollTop = top + dTop;
          if (dom.scrollLeft != left) dom.scrollLeft = left;
      }
  }
  let $f18febfa986513b3$var$preventScrollSupported = null;
  // Feature-detects support for .focus({preventScroll: true}), and uses
  // a fallback kludge when not supported.
  function $f18febfa986513b3$var$focusPreventScroll(dom) {
      if (dom.setActive) return dom.setActive(); // in IE
      if ($f18febfa986513b3$var$preventScrollSupported) return dom.focus($f18febfa986513b3$var$preventScrollSupported);
      let stored = $f18febfa986513b3$var$scrollStack(dom);
      dom.focus($f18febfa986513b3$var$preventScrollSupported == null ? {
          get preventScroll () {
              $f18febfa986513b3$var$preventScrollSupported = {
                  preventScroll: true
              };
              return true;
          }
      } : undefined);
      if (!$f18febfa986513b3$var$preventScrollSupported) {
          $f18febfa986513b3$var$preventScrollSupported = false;
          $f18febfa986513b3$var$restoreScrollStack(stored, 0);
      }
  }
  function $f18febfa986513b3$var$findOffsetInNode(node, coords) {
      let closest, dxClosest = 2e8, coordsClosest, offset = 0;
      let rowBot = coords.top, rowTop = coords.top;
      let firstBelow, coordsBelow;
      for(let child = node.firstChild, childIndex = 0; child; child = child.nextSibling, childIndex++){
          let rects;
          if (child.nodeType == 1) rects = child.getClientRects();
          else if (child.nodeType == 3) rects = $f18febfa986513b3$var$textRange(child).getClientRects();
          else continue;
          for(let i = 0; i < rects.length; i++){
              let rect = rects[i];
              if (rect.top <= rowBot && rect.bottom >= rowTop) {
                  rowBot = Math.max(rect.bottom, rowBot);
                  rowTop = Math.min(rect.top, rowTop);
                  let dx = rect.left > coords.left ? rect.left - coords.left : rect.right < coords.left ? coords.left - rect.right : 0;
                  if (dx < dxClosest) {
                      closest = child;
                      dxClosest = dx;
                      coordsClosest = dx && closest.nodeType == 3 ? {
                          left: rect.right < coords.left ? rect.right : rect.left,
                          top: coords.top
                      } : coords;
                      if (child.nodeType == 1 && dx) offset = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0);
                      continue;
                  }
              } else if (rect.top > coords.top && !firstBelow && rect.left <= coords.left && rect.right >= coords.left) {
                  firstBelow = child;
                  coordsBelow = {
                      left: Math.max(rect.left, Math.min(rect.right, coords.left)),
                      top: rect.top
                  };
              }
              if (!closest && (coords.left >= rect.right && coords.top >= rect.top || coords.left >= rect.left && coords.top >= rect.bottom)) offset = childIndex + 1;
          }
      }
      if (!closest && firstBelow) {
          closest = firstBelow;
          coordsClosest = coordsBelow;
          dxClosest = 0;
      }
      if (closest && closest.nodeType == 3) return $f18febfa986513b3$var$findOffsetInText(closest, coordsClosest);
      if (!closest || dxClosest && closest.nodeType == 1) return {
          node: node,
          offset: offset
      };
      return $f18febfa986513b3$var$findOffsetInNode(closest, coordsClosest);
  }
  function $f18febfa986513b3$var$findOffsetInText(node, coords) {
      let len = node.nodeValue.length;
      let range = document.createRange();
      for(let i = 0; i < len; i++){
          range.setEnd(node, i + 1);
          range.setStart(node, i);
          let rect = $f18febfa986513b3$var$singleRect(range, 1);
          if (rect.top == rect.bottom) continue;
          if ($f18febfa986513b3$var$inRect(coords, rect)) return {
              node: node,
              offset: i + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0)
          };
      }
      return {
          node: node,
          offset: 0
      };
  }
  function $f18febfa986513b3$var$inRect(coords, rect) {
      return coords.left >= rect.left - 1 && coords.left <= rect.right + 1 && coords.top >= rect.top - 1 && coords.top <= rect.bottom + 1;
  }
  function $f18febfa986513b3$var$targetKludge(dom, coords) {
      let parent = dom.parentNode;
      if (parent && /^li$/i.test(parent.nodeName) && coords.left < dom.getBoundingClientRect().left) return parent;
      return dom;
  }
  function $f18febfa986513b3$var$posFromElement(view, elt, coords) {
      let { node: node, offset: offset } = $f18febfa986513b3$var$findOffsetInNode(elt, coords), bias = -1;
      if (node.nodeType == 1 && !node.firstChild) {
          let rect = node.getBoundingClientRect();
          bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
      }
      return view.docView.posFromDOM(node, offset, bias);
  }
  function $f18febfa986513b3$var$posFromCaret(view, node, offset, coords) {
      // Browser (in caretPosition/RangeFromPoint) will agressively
      // normalize towards nearby inline nodes. Since we are interested in
      // positions between block nodes too, we first walk up the hierarchy
      // of nodes to see if there are block nodes that the coordinates
      // fall outside of. If so, we take the position before/after that
      // block. If not, we call `posFromDOM` on the raw node/offset.
      let outsideBlock = -1;
      for(let cur = node, sawBlock = false;;){
          if (cur == view.dom) break;
          let desc = view.docView.nearestDesc(cur, true);
          if (!desc) return null;
          if (desc.dom.nodeType == 1 && (desc.node.isBlock && desc.parent && !sawBlock || !desc.contentDOM)) {
              let rect = desc.dom.getBoundingClientRect();
              if (desc.node.isBlock && desc.parent && !sawBlock) {
                  sawBlock = true;
                  if (rect.left > coords.left || rect.top > coords.top) outsideBlock = desc.posBefore;
                  else if (rect.right < coords.left || rect.bottom < coords.top) outsideBlock = desc.posAfter;
              }
              if (!desc.contentDOM && outsideBlock < 0 && !desc.node.isText) {
                  // If we are inside a leaf, return the side of the leaf closer to the coords
                  let before = desc.node.isBlock ? coords.top < (rect.top + rect.bottom) / 2 : coords.left < (rect.left + rect.right) / 2;
                  return before ? desc.posBefore : desc.posAfter;
              }
          }
          cur = desc.dom.parentNode;
      }
      return outsideBlock > -1 ? outsideBlock : view.docView.posFromDOM(node, offset, -1);
  }
  function $f18febfa986513b3$var$elementFromPoint(element, coords, box) {
      let len = element.childNodes.length;
      if (len && box.top < box.bottom) for(let startI = Math.max(0, Math.min(len - 1, Math.floor(len * (coords.top - box.top) / (box.bottom - box.top)) - 2)), i = startI;;){
          let child = element.childNodes[i];
          if (child.nodeType == 1) {
              let rects = child.getClientRects();
              for(let j = 0; j < rects.length; j++){
                  let rect = rects[j];
                  if ($f18febfa986513b3$var$inRect(coords, rect)) return $f18febfa986513b3$var$elementFromPoint(child, coords, rect);
              }
          }
          if ((i = (i + 1) % len) == startI) break;
      }
      return element;
  }
  // Given an x,y position on the editor, get the position in the document.
  function $f18febfa986513b3$var$posAtCoords(view, coords) {
      let doc = view.dom.ownerDocument, node, offset = 0;
      let caret = $f18febfa986513b3$var$caretFromPoint(doc, coords.left, coords.top);
      if (caret) ({ node: node, offset: offset } = caret);
      let elt = (view.root.elementFromPoint ? view.root : doc).elementFromPoint(coords.left, coords.top);
      let pos;
      if (!elt || !view.dom.contains(elt.nodeType != 1 ? elt.parentNode : elt)) {
          let box = view.dom.getBoundingClientRect();
          if (!$f18febfa986513b3$var$inRect(coords, box)) return null;
          elt = $f18febfa986513b3$var$elementFromPoint(view.dom, coords, box);
          if (!elt) return null;
      }
      // Safari's caretRangeFromPoint returns nonsense when on a draggable element
      if ($f18febfa986513b3$var$safari) {
          for(let p = elt; node && p; p = $f18febfa986513b3$var$parentNode(p))if (p.draggable) node = undefined;
      }
      elt = $f18febfa986513b3$var$targetKludge(elt, coords);
      if (node) {
          if ($f18febfa986513b3$var$gecko && node.nodeType == 1) {
              // Firefox will sometimes return offsets into <input> nodes, which
              // have no actual children, from caretPositionFromPoint (#953)
              offset = Math.min(offset, node.childNodes.length);
              // It'll also move the returned position before image nodes,
              // even if those are behind it.
              if (offset < node.childNodes.length) {
                  let next = node.childNodes[offset], box;
                  if (next.nodeName == "IMG" && (box = next.getBoundingClientRect()).right <= coords.left && box.bottom > coords.top) offset++;
              }
          }
          // Suspiciously specific kludge to work around caret*FromPoint
          // never returning a position at the end of the document
          if (node == view.dom && offset == node.childNodes.length - 1 && node.lastChild.nodeType == 1 && coords.top > node.lastChild.getBoundingClientRect().bottom) pos = view.state.doc.content.size;
          else if (offset == 0 || node.nodeType != 1 || node.childNodes[offset - 1].nodeName != "BR") pos = $f18febfa986513b3$var$posFromCaret(view, node, offset, coords);
      }
      if (pos == null) pos = $f18febfa986513b3$var$posFromElement(view, elt, coords);
      let desc = view.docView.nearestDesc(elt, true);
      return {
          pos: pos,
          inside: desc ? desc.posAtStart - desc.border : -1
      };
  }
  function $f18febfa986513b3$var$nonZero(rect) {
      return rect.top < rect.bottom || rect.left < rect.right;
  }
  function $f18febfa986513b3$var$singleRect(target, bias) {
      let rects = target.getClientRects();
      if (rects.length) {
          let first = rects[bias < 0 ? 0 : rects.length - 1];
          if ($f18febfa986513b3$var$nonZero(first)) return first;
      }
      return Array.prototype.find.call(rects, $f18febfa986513b3$var$nonZero) || target.getBoundingClientRect();
  }
  const $f18febfa986513b3$var$BIDI = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
  // Given a position in the document model, get a bounding box of the
  // character at that position, relative to the window.
  function $f18febfa986513b3$var$coordsAtPos(view, pos, side) {
      let { node: node, offset: offset, atom: atom } = view.docView.domFromPos(pos, side < 0 ? -1 : 1);
      let supportEmptyRange = $f18febfa986513b3$var$webkit || $f18febfa986513b3$var$gecko;
      if (node.nodeType == 3) {
          // These browsers support querying empty text ranges. Prefer that in
          // bidi context or when at the end of a node.
          if (supportEmptyRange && ($f18febfa986513b3$var$BIDI.test(node.nodeValue) || (side < 0 ? !offset : offset == node.nodeValue.length))) {
              let rect = $f18febfa986513b3$var$singleRect($f18febfa986513b3$var$textRange(node, offset, offset), side);
              // Firefox returns bad results (the position before the space)
              // when querying a position directly after line-broken
              // whitespace. Detect this situation and and kludge around it
              if ($f18febfa986513b3$var$gecko && offset && /\s/.test(node.nodeValue[offset - 1]) && offset < node.nodeValue.length) {
                  let rectBefore = $f18febfa986513b3$var$singleRect($f18febfa986513b3$var$textRange(node, offset - 1, offset - 1), -1);
                  if (rectBefore.top == rect.top) {
                      let rectAfter = $f18febfa986513b3$var$singleRect($f18febfa986513b3$var$textRange(node, offset, offset + 1), -1);
                      if (rectAfter.top != rect.top) return $f18febfa986513b3$var$flattenV(rectAfter, rectAfter.left < rectBefore.left);
                  }
              }
              return rect;
          } else {
              let from = offset, to = offset, takeSide = side < 0 ? 1 : -1;
              if (side < 0 && !offset) {
                  to++;
                  takeSide = -1;
              } else if (side >= 0 && offset == node.nodeValue.length) {
                  from--;
                  takeSide = 1;
              } else if (side < 0) from--;
              else to++;
              return $f18febfa986513b3$var$flattenV($f18febfa986513b3$var$singleRect($f18febfa986513b3$var$textRange(node, from, to), takeSide), takeSide < 0);
          }
      }
      let $dom = view.state.doc.resolve(pos - (atom || 0));
      // Return a horizontal line in block context
      if (!$dom.parent.inlineContent) {
          if (atom == null && offset && (side < 0 || offset == $f18febfa986513b3$var$nodeSize(node))) {
              let before = node.childNodes[offset - 1];
              if (before.nodeType == 1) return $f18febfa986513b3$var$flattenH(before.getBoundingClientRect(), false);
          }
          if (atom == null && offset < $f18febfa986513b3$var$nodeSize(node)) {
              let after = node.childNodes[offset];
              if (after.nodeType == 1) return $f18febfa986513b3$var$flattenH(after.getBoundingClientRect(), true);
          }
          return $f18febfa986513b3$var$flattenH(node.getBoundingClientRect(), side >= 0);
      }
      // Inline, not in text node (this is not Bidi-safe)
      if (atom == null && offset && (side < 0 || offset == $f18febfa986513b3$var$nodeSize(node))) {
          let before = node.childNodes[offset - 1];
          let target = before.nodeType == 3 ? $f18febfa986513b3$var$textRange(before, $f18febfa986513b3$var$nodeSize(before) - (supportEmptyRange ? 0 : 1)) : before.nodeType == 1 && (before.nodeName != "BR" || !before.nextSibling) ? before : null;
          if (target) return $f18febfa986513b3$var$flattenV($f18febfa986513b3$var$singleRect(target, 1), false);
      }
      if (atom == null && offset < $f18febfa986513b3$var$nodeSize(node)) {
          let after = node.childNodes[offset];
          while(after.pmViewDesc && after.pmViewDesc.ignoreForCoords)after = after.nextSibling;
          let target = !after ? null : after.nodeType == 3 ? $f18febfa986513b3$var$textRange(after, 0, supportEmptyRange ? 0 : 1) : after.nodeType == 1 ? after : null;
          if (target) return $f18febfa986513b3$var$flattenV($f18febfa986513b3$var$singleRect(target, -1), true);
      }
      // All else failed, just try to get a rectangle for the target node
      return $f18febfa986513b3$var$flattenV($f18febfa986513b3$var$singleRect(node.nodeType == 3 ? $f18febfa986513b3$var$textRange(node) : node, -side), side >= 0);
  }
  function $f18febfa986513b3$var$flattenV(rect, left) {
      if (rect.width == 0) return rect;
      let x = left ? rect.left : rect.right;
      return {
          top: rect.top,
          bottom: rect.bottom,
          left: x,
          right: x
      };
  }
  function $f18febfa986513b3$var$flattenH(rect, top) {
      if (rect.height == 0) return rect;
      let y = top ? rect.top : rect.bottom;
      return {
          top: y,
          bottom: y,
          left: rect.left,
          right: rect.right
      };
  }
  function $f18febfa986513b3$var$withFlushedState(view, state, f) {
      let viewState = view.state, active = view.root.activeElement;
      if (viewState != state) view.updateState(state);
      if (active != view.dom) view.focus();
      try {
          return f();
      } finally{
          if (viewState != state) view.updateState(viewState);
          if (active != view.dom && active) active.focus();
      }
  }
  // Whether vertical position motion in a given direction
  // from a position would leave a text block.
  function $f18febfa986513b3$var$endOfTextblockVertical(view, state, dir) {
      let sel = state.selection;
      let $pos = dir == "up" ? sel.$from : sel.$to;
      return $f18febfa986513b3$var$withFlushedState(view, state, ()=>{
          let { node: dom } = view.docView.domFromPos($pos.pos, dir == "up" ? -1 : 1);
          for(;;){
              let nearest = view.docView.nearestDesc(dom, true);
              if (!nearest) break;
              if (nearest.node.isBlock) {
                  dom = nearest.contentDOM || nearest.dom;
                  break;
              }
              dom = nearest.dom.parentNode;
          }
          let coords = $f18febfa986513b3$var$coordsAtPos(view, $pos.pos, 1);
          for(let child = dom.firstChild; child; child = child.nextSibling){
              let boxes;
              if (child.nodeType == 1) boxes = child.getClientRects();
              else if (child.nodeType == 3) boxes = $f18febfa986513b3$var$textRange(child, 0, child.nodeValue.length).getClientRects();
              else continue;
              for(let i = 0; i < boxes.length; i++){
                  let box = boxes[i];
                  if (box.bottom > box.top + 1 && (dir == "up" ? coords.top - box.top > (box.bottom - coords.top) * 2 : box.bottom - coords.bottom > (coords.bottom - box.top) * 2)) return false;
              }
          }
          return true;
      });
  }
  const $f18febfa986513b3$var$maybeRTL = /[\u0590-\u08ac]/;
  function $f18febfa986513b3$var$endOfTextblockHorizontal(view, state, dir) {
      let { $head: $head } = state.selection;
      if (!$head.parent.isTextblock) return false;
      let offset = $head.parentOffset, atStart = !offset, atEnd = offset == $head.parent.content.size;
      let sel = view.domSelection();
      // If the textblock is all LTR, or the browser doesn't support
      // Selection.modify (Edge), fall back to a primitive approach
      if (!$f18febfa986513b3$var$maybeRTL.test($head.parent.textContent) || !sel.modify) return dir == "left" || dir == "backward" ? atStart : atEnd;
      return $f18febfa986513b3$var$withFlushedState(view, state, ()=>{
          // This is a huge hack, but appears to be the best we can
          // currently do: use `Selection.modify` to move the selection by
          // one character, and see if that moves the cursor out of the
          // textblock (or doesn't move it at all, when at the start/end of
          // the document).
          let { focusNode: oldNode, focusOffset: oldOff, anchorNode: anchorNode, anchorOffset: anchorOffset } = view.domSelectionRange();
          let oldBidiLevel = sel.caretBidiLevel // Only for Firefox
          ;
          sel.modify("move", dir, "character");
          let parentDOM = $head.depth ? view.docView.domAfterPos($head.before()) : view.dom;
          let { focusNode: newNode, focusOffset: newOff } = view.domSelectionRange();
          let result = newNode && !parentDOM.contains(newNode.nodeType == 1 ? newNode : newNode.parentNode) || oldNode == newNode && oldOff == newOff;
          // Restore the previous selection
          try {
              sel.collapse(anchorNode, anchorOffset);
              if (oldNode && (oldNode != anchorNode || oldOff != anchorOffset) && sel.extend) sel.extend(oldNode, oldOff);
          } catch (_) {}
          if (oldBidiLevel != null) sel.caretBidiLevel = oldBidiLevel;
          return result;
      });
  }
  let $f18febfa986513b3$var$cachedState = null;
  let $f18febfa986513b3$var$cachedDir = null;
  let $f18febfa986513b3$var$cachedResult = false;
  function $f18febfa986513b3$var$endOfTextblock(view, state, dir) {
      if ($f18febfa986513b3$var$cachedState == state && $f18febfa986513b3$var$cachedDir == dir) return $f18febfa986513b3$var$cachedResult;
      $f18febfa986513b3$var$cachedState = state;
      $f18febfa986513b3$var$cachedDir = dir;
      return $f18febfa986513b3$var$cachedResult = dir == "up" || dir == "down" ? $f18febfa986513b3$var$endOfTextblockVertical(view, state, dir) : $f18febfa986513b3$var$endOfTextblockHorizontal(view, state, dir);
  }
  // View descriptions are data structures that describe the DOM that is
  // used to represent the editor's content. They are used for:
  //
  // - Incremental redrawing when the document changes
  //
  // - Figuring out what part of the document a given DOM position
  //   corresponds to
  //
  // - Wiring in custom implementations of the editing interface for a
  //   given node
  //
  // They form a doubly-linked mutable tree, starting at `view.docView`.
  const $f18febfa986513b3$var$NOT_DIRTY = 0, $f18febfa986513b3$var$CHILD_DIRTY = 1, $f18febfa986513b3$var$CONTENT_DIRTY = 2, $f18febfa986513b3$var$NODE_DIRTY = 3;
  // Superclass for the various kinds of descriptions. Defines their
  // basic structure and shared methods.
  class $f18febfa986513b3$var$ViewDesc {
      constructor(parent, children, dom, // This is the node that holds the child views. It may be null for
      // descs that don't have children.
      contentDOM){
          this.parent = parent;
          this.children = children;
          this.dom = dom;
          this.contentDOM = contentDOM;
          this.dirty = $f18febfa986513b3$var$NOT_DIRTY;
          // An expando property on the DOM node provides a link back to its
          // description.
          dom.pmViewDesc = this;
      }
      // Used to check whether a given description corresponds to a
      // widget/mark/node.
      matchesWidget(widget) {
          return false;
      }
      matchesMark(mark) {
          return false;
      }
      matchesNode(node, outerDeco, innerDeco) {
          return false;
      }
      matchesHack(nodeName) {
          return false;
      }
      // When parsing in-editor content (in domchange.js), we allow
      // descriptions to determine the parse rules that should be used to
      // parse them.
      parseRule() {
          return null;
      }
      // Used by the editor's event handler to ignore events that come
      // from certain descs.
      stopEvent(event) {
          return false;
      }
      // The size of the content represented by this desc.
      get size() {
          let size = 0;
          for(let i = 0; i < this.children.length; i++)size += this.children[i].size;
          return size;
      }
      // For block nodes, this represents the space taken up by their
      // start/end tokens.
      get border() {
          return 0;
      }
      destroy() {
          this.parent = undefined;
          if (this.dom.pmViewDesc == this) this.dom.pmViewDesc = undefined;
          for(let i = 0; i < this.children.length; i++)this.children[i].destroy();
      }
      posBeforeChild(child) {
          for(let i = 0, pos = this.posAtStart;; i++){
              let cur = this.children[i];
              if (cur == child) return pos;
              pos += cur.size;
          }
      }
      get posBefore() {
          return this.parent.posBeforeChild(this);
      }
      get posAtStart() {
          return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
      }
      get posAfter() {
          return this.posBefore + this.size;
      }
      get posAtEnd() {
          return this.posAtStart + this.size - 2 * this.border;
      }
      localPosFromDOM(dom, offset, bias) {
          // If the DOM position is in the content, use the child desc after
          // it to figure out a position.
          if (this.contentDOM && this.contentDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode)) {
              if (bias < 0) {
                  let domBefore, desc;
                  if (dom == this.contentDOM) domBefore = dom.childNodes[offset - 1];
                  else {
                      while(dom.parentNode != this.contentDOM)dom = dom.parentNode;
                      domBefore = dom.previousSibling;
                  }
                  while(domBefore && !((desc = domBefore.pmViewDesc) && desc.parent == this))domBefore = domBefore.previousSibling;
                  return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart;
              } else {
                  let domAfter, desc;
                  if (dom == this.contentDOM) domAfter = dom.childNodes[offset];
                  else {
                      while(dom.parentNode != this.contentDOM)dom = dom.parentNode;
                      domAfter = dom.nextSibling;
                  }
                  while(domAfter && !((desc = domAfter.pmViewDesc) && desc.parent == this))domAfter = domAfter.nextSibling;
                  return domAfter ? this.posBeforeChild(desc) : this.posAtEnd;
              }
          }
          // Otherwise, use various heuristics, falling back on the bias
          // parameter, to determine whether to return the position at the
          // start or at the end of this view desc.
          let atEnd;
          if (dom == this.dom && this.contentDOM) atEnd = offset > $f18febfa986513b3$var$domIndex(this.contentDOM);
          else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) atEnd = dom.compareDocumentPosition(this.contentDOM) & 2;
          else if (this.dom.firstChild) {
              if (offset == 0) for(let search = dom;; search = search.parentNode){
                  if (search == this.dom) {
                      atEnd = false;
                      break;
                  }
                  if (search.previousSibling) break;
              }
              if (atEnd == null && offset == dom.childNodes.length) for(let search = dom;; search = search.parentNode){
                  if (search == this.dom) {
                      atEnd = true;
                      break;
                  }
                  if (search.nextSibling) break;
              }
          }
          return (atEnd == null ? bias > 0 : atEnd) ? this.posAtEnd : this.posAtStart;
      }
      nearestDesc(dom, onlyNodes = false) {
          for(let first = true, cur = dom; cur; cur = cur.parentNode){
              let desc = this.getDesc(cur), nodeDOM;
              if (desc && (!onlyNodes || desc.node)) {
                  // If dom is outside of this desc's nodeDOM, don't count it.
                  if (first && (nodeDOM = desc.nodeDOM) && !(nodeDOM.nodeType == 1 ? nodeDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode) : nodeDOM == dom)) first = false;
                  else return desc;
              }
          }
      }
      getDesc(dom) {
          let desc = dom.pmViewDesc;
          for(let cur = desc; cur; cur = cur.parent)if (cur == this) return desc;
      }
      posFromDOM(dom, offset, bias) {
          for(let scan = dom; scan; scan = scan.parentNode){
              let desc = this.getDesc(scan);
              if (desc) return desc.localPosFromDOM(dom, offset, bias);
          }
          return -1;
      }
      // Find the desc for the node after the given pos, if any. (When a
      // parent node overrode rendering, there might not be one.)
      descAt(pos) {
          for(let i = 0, offset = 0; i < this.children.length; i++){
              let child = this.children[i], end = offset + child.size;
              if (offset == pos && end != offset) {
                  while(!child.border && child.children.length)child = child.children[0];
                  return child;
              }
              if (pos < end) return child.descAt(pos - offset - child.border);
              offset = end;
          }
      }
      domFromPos(pos, side) {
          if (!this.contentDOM) return {
              node: this.dom,
              offset: 0,
              atom: pos + 1
          };
          // First find the position in the child array
          let i = 0, offset = 0;
          for(let curPos = 0; i < this.children.length; i++){
              let child = this.children[i], end = curPos + child.size;
              if (end > pos || child instanceof $f18febfa986513b3$var$TrailingHackViewDesc) {
                  offset = pos - curPos;
                  break;
              }
              curPos = end;
          }
          // If this points into the middle of a child, call through
          if (offset) return this.children[i].domFromPos(offset - this.children[i].border, side);
          // Go back if there were any zero-length widgets with side >= 0 before this point
          for(let prev; i && !(prev = this.children[i - 1]).size && prev instanceof $f18febfa986513b3$var$WidgetViewDesc && prev.side >= 0; i--);
          // Scan towards the first useable node
          if (side <= 0) {
              let prev, enter = true;
              for(;; i--, enter = false){
                  prev = i ? this.children[i - 1] : null;
                  if (!prev || prev.dom.parentNode == this.contentDOM) break;
              }
              if (prev && side && enter && !prev.border && !prev.domAtom) return prev.domFromPos(prev.size, side);
              return {
                  node: this.contentDOM,
                  offset: prev ? $f18febfa986513b3$var$domIndex(prev.dom) + 1 : 0
              };
          } else {
              let next, enter = true;
              for(;; i++, enter = false){
                  next = i < this.children.length ? this.children[i] : null;
                  if (!next || next.dom.parentNode == this.contentDOM) break;
              }
              if (next && enter && !next.border && !next.domAtom) return next.domFromPos(0, side);
              return {
                  node: this.contentDOM,
                  offset: next ? $f18febfa986513b3$var$domIndex(next.dom) : this.contentDOM.childNodes.length
              };
          }
      }
      // Used to find a DOM range in a single parent for a given changed
      // range.
      parseRange(from, to, base = 0) {
          if (this.children.length == 0) return {
              node: this.contentDOM,
              from: from,
              to: to,
              fromOffset: 0,
              toOffset: this.contentDOM.childNodes.length
          };
          let fromOffset = -1, toOffset = -1;
          for(let offset = base, i = 0;; i++){
              let child = this.children[i], end = offset + child.size;
              if (fromOffset == -1 && from <= end) {
                  let childBase = offset + child.border;
                  // FIXME maybe descend mark views to parse a narrower range?
                  if (from >= childBase && to <= end - child.border && child.node && child.contentDOM && this.contentDOM.contains(child.contentDOM)) return child.parseRange(from, to, childBase);
                  from = offset;
                  for(let j = i; j > 0; j--){
                      let prev = this.children[j - 1];
                      if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
                          fromOffset = $f18febfa986513b3$var$domIndex(prev.dom) + 1;
                          break;
                      }
                      from -= prev.size;
                  }
                  if (fromOffset == -1) fromOffset = 0;
              }
              if (fromOffset > -1 && (end > to || i == this.children.length - 1)) {
                  to = end;
                  for(let j = i + 1; j < this.children.length; j++){
                      let next = this.children[j];
                      if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
                          toOffset = $f18febfa986513b3$var$domIndex(next.dom);
                          break;
                      }
                      to += next.size;
                  }
                  if (toOffset == -1) toOffset = this.contentDOM.childNodes.length;
                  break;
              }
              offset = end;
          }
          return {
              node: this.contentDOM,
              from: from,
              to: to,
              fromOffset: fromOffset,
              toOffset: toOffset
          };
      }
      emptyChildAt(side) {
          if (this.border || !this.contentDOM || !this.children.length) return false;
          let child = this.children[side < 0 ? 0 : this.children.length - 1];
          return child.size == 0 || child.emptyChildAt(side);
      }
      domAfterPos(pos) {
          let { node: node, offset: offset } = this.domFromPos(pos, 0);
          if (node.nodeType != 1 || offset == node.childNodes.length) throw new RangeError("No node after pos " + pos);
          return node.childNodes[offset];
      }
      // View descs are responsible for setting any selection that falls
      // entirely inside of them, so that custom implementations can do
      // custom things with the selection. Note that this falls apart when
      // a selection starts in such a node and ends in another, in which
      // case we just use whatever domFromPos produces as a best effort.
      setSelection(anchor, head, root, force = false) {
          // If the selection falls entirely in a child, give it to that child
          let from = Math.min(anchor, head), to = Math.max(anchor, head);
          for(let i = 0, offset = 0; i < this.children.length; i++){
              let child = this.children[i], end = offset + child.size;
              if (from > offset && to < end) return child.setSelection(anchor - offset - child.border, head - offset - child.border, root, force);
              offset = end;
          }
          let anchorDOM = this.domFromPos(anchor, anchor ? -1 : 1);
          let headDOM = head == anchor ? anchorDOM : this.domFromPos(head, head ? -1 : 1);
          let domSel = root.getSelection();
          let brKludge = false;
          // On Firefox, using Selection.collapse to put the cursor after a
          // BR node for some reason doesn't always work (#1073). On Safari,
          // the cursor sometimes inexplicable visually lags behind its
          // reported position in such situations (#1092).
          if (($f18febfa986513b3$var$gecko || $f18febfa986513b3$var$safari) && anchor == head) {
              let { node: node, offset: offset } = anchorDOM;
              if (node.nodeType == 3) {
                  brKludge = !!(offset && node.nodeValue[offset - 1] == "\n");
                  // Issue #1128
                  if (brKludge && offset == node.nodeValue.length) for(let scan = node, after; scan; scan = scan.parentNode){
                      if (after = scan.nextSibling) {
                          if (after.nodeName == "BR") anchorDOM = headDOM = {
                              node: after.parentNode,
                              offset: $f18febfa986513b3$var$domIndex(after) + 1
                          };
                          break;
                      }
                      let desc = scan.pmViewDesc;
                      if (desc && desc.node && desc.node.isBlock) break;
                  }
              } else {
                  let prev = node.childNodes[offset - 1];
                  brKludge = prev && (prev.nodeName == "BR" || prev.contentEditable == "false");
              }
          }
          // Firefox can act strangely when the selection is in front of an
          // uneditable node. See #1163 and https://bugzilla.mozilla.org/show_bug.cgi?id=1709536
          if ($f18febfa986513b3$var$gecko && domSel.focusNode && domSel.focusNode != headDOM.node && domSel.focusNode.nodeType == 1) {
              let after = domSel.focusNode.childNodes[domSel.focusOffset];
              if (after && after.contentEditable == "false") force = true;
          }
          if (!(force || brKludge && $f18febfa986513b3$var$safari) && $f18febfa986513b3$var$isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) && $f18febfa986513b3$var$isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset)) return;
          // Selection.extend can be used to create an 'inverted' selection
          // (one where the focus is before the anchor), but not all
          // browsers support it yet.
          let domSelExtended = false;
          if ((domSel.extend || anchor == head) && !brKludge) {
              domSel.collapse(anchorDOM.node, anchorDOM.offset);
              try {
                  if (anchor != head) domSel.extend(headDOM.node, headDOM.offset);
                  domSelExtended = true;
              } catch (_) {
              // In some cases with Chrome the selection is empty after calling
              // collapse, even when it should be valid. This appears to be a bug, but
              // it is difficult to isolate. If this happens fallback to the old path
              // without using extend.
              // Similarly, this could crash on Safari if the editor is hidden, and
              // there was no selection.
              }
          }
          if (!domSelExtended) {
              if (anchor > head) {
                  let tmp = anchorDOM;
                  anchorDOM = headDOM;
                  headDOM = tmp;
              }
              let range = document.createRange();
              range.setEnd(headDOM.node, headDOM.offset);
              range.setStart(anchorDOM.node, anchorDOM.offset);
              domSel.removeAllRanges();
              domSel.addRange(range);
          }
      }
      ignoreMutation(mutation) {
          return !this.contentDOM && mutation.type != "selection";
      }
      get contentLost() {
          return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
      }
      // Remove a subtree of the element tree that has been touched
      // by a DOM change, so that the next update will redraw it.
      markDirty(from, to) {
          for(let offset = 0, i = 0; i < this.children.length; i++){
              let child = this.children[i], end = offset + child.size;
              if (offset == end ? from <= end && to >= offset : from < end && to > offset) {
                  let startInside = offset + child.border, endInside = end - child.border;
                  if (from >= startInside && to <= endInside) {
                      this.dirty = from == offset || to == end ? $f18febfa986513b3$var$CONTENT_DIRTY : $f18febfa986513b3$var$CHILD_DIRTY;
                      if (from == startInside && to == endInside && (child.contentLost || child.dom.parentNode != this.contentDOM)) child.dirty = $f18febfa986513b3$var$NODE_DIRTY;
                      else child.markDirty(from - startInside, to - startInside);
                      return;
                  } else child.dirty = child.dom == child.contentDOM && child.dom.parentNode == this.contentDOM && !child.children.length ? $f18febfa986513b3$var$CONTENT_DIRTY : $f18febfa986513b3$var$NODE_DIRTY;
              }
              offset = end;
          }
          this.dirty = $f18febfa986513b3$var$CONTENT_DIRTY;
      }
      markParentsDirty() {
          let level = 1;
          for(let node = this.parent; node; node = node.parent, level++){
              let dirty = level == 1 ? $f18febfa986513b3$var$CONTENT_DIRTY : $f18febfa986513b3$var$CHILD_DIRTY;
              if (node.dirty < dirty) node.dirty = dirty;
          }
      }
      get domAtom() {
          return false;
      }
      get ignoreForCoords() {
          return false;
      }
  }
  // A widget desc represents a widget decoration, which is a DOM node
  // drawn between the document nodes.
  class $f18febfa986513b3$var$WidgetViewDesc extends $f18febfa986513b3$var$ViewDesc {
      constructor(parent, widget, view, pos){
          let self, dom = widget.type.toDOM;
          if (typeof dom == "function") dom = dom(view, ()=>{
              if (!self) return pos;
              if (self.parent) return self.parent.posBeforeChild(self);
          });
          if (!widget.type.spec.raw) {
              if (dom.nodeType != 1) {
                  let wrap = document.createElement("span");
                  wrap.appendChild(dom);
                  dom = wrap;
              }
              dom.contentEditable = "false";
              dom.classList.add("ProseMirror-widget");
          }
          super(parent, [], dom, null);
          this.widget = widget;
          this.widget = widget;
          self = this;
      }
      matchesWidget(widget) {
          return this.dirty == $f18febfa986513b3$var$NOT_DIRTY && widget.type.eq(this.widget.type);
      }
      parseRule() {
          return {
              ignore: true
          };
      }
      stopEvent(event) {
          let stop = this.widget.spec.stopEvent;
          return stop ? stop(event) : false;
      }
      ignoreMutation(mutation) {
          return mutation.type != "selection" || this.widget.spec.ignoreSelection;
      }
      destroy() {
          this.widget.type.destroy(this.dom);
          super.destroy();
      }
      get domAtom() {
          return true;
      }
      get side() {
          return this.widget.type.side;
      }
  }
  class $f18febfa986513b3$var$CompositionViewDesc extends $f18febfa986513b3$var$ViewDesc {
      constructor(parent, dom, textDOM, text){
          super(parent, [], dom, null);
          this.textDOM = textDOM;
          this.text = text;
      }
      get size() {
          return this.text.length;
      }
      localPosFromDOM(dom, offset) {
          if (dom != this.textDOM) return this.posAtStart + (offset ? this.size : 0);
          return this.posAtStart + offset;
      }
      domFromPos(pos) {
          return {
              node: this.textDOM,
              offset: pos
          };
      }
      ignoreMutation(mut) {
          return mut.type === "characterData" && mut.target.nodeValue == mut.oldValue;
      }
  }
  // A mark desc represents a mark. May have multiple children,
  // depending on how the mark is split. Note that marks are drawn using
  // a fixed nesting order, for simplicity and predictability, so in
  // some cases they will be split more often than would appear
  // necessary.
  class $f18febfa986513b3$var$MarkViewDesc extends $f18febfa986513b3$var$ViewDesc {
      constructor(parent, mark, dom, contentDOM){
          super(parent, [], dom, contentDOM);
          this.mark = mark;
      }
      static create(parent, mark, inline, view) {
          let custom = view.nodeViews[mark.type.name];
          let spec = custom && custom(mark, view, inline);
          if (!spec || !spec.dom) spec = (0, $59526ec4d3b41406$export$3476b78f8f5a8b72).renderSpec(document, mark.type.spec.toDOM(mark, inline));
          return new $f18febfa986513b3$var$MarkViewDesc(parent, mark, spec.dom, spec.contentDOM || spec.dom);
      }
      parseRule() {
          if (this.dirty & $f18febfa986513b3$var$NODE_DIRTY || this.mark.type.spec.reparseInView) return null;
          return {
              mark: this.mark.type.name,
              attrs: this.mark.attrs,
              contentElement: this.contentDOM
          };
      }
      matchesMark(mark) {
          return this.dirty != $f18febfa986513b3$var$NODE_DIRTY && this.mark.eq(mark);
      }
      markDirty(from, to) {
          super.markDirty(from, to);
          // Move dirty info to nearest node view
          if (this.dirty != $f18febfa986513b3$var$NOT_DIRTY) {
              let parent = this.parent;
              while(!parent.node)parent = parent.parent;
              if (parent.dirty < this.dirty) parent.dirty = this.dirty;
              this.dirty = $f18febfa986513b3$var$NOT_DIRTY;
          }
      }
      slice(from, to, view) {
          let copy = $f18febfa986513b3$var$MarkViewDesc.create(this.parent, this.mark, true, view);
          let nodes = this.children, size = this.size;
          if (to < size) nodes = $f18febfa986513b3$var$replaceNodes(nodes, to, size, view);
          if (from > 0) nodes = $f18febfa986513b3$var$replaceNodes(nodes, 0, from, view);
          for(let i = 0; i < nodes.length; i++)nodes[i].parent = copy;
          copy.children = nodes;
          return copy;
      }
  }
  // Node view descs are the main, most common type of view desc, and
  // correspond to an actual node in the document. Unlike mark descs,
  // they populate their child array themselves.
  class $f18febfa986513b3$var$NodeViewDesc extends $f18febfa986513b3$var$ViewDesc {
      constructor(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos){
          super(parent, [], dom, contentDOM);
          this.node = node;
          this.outerDeco = outerDeco;
          this.innerDeco = innerDeco;
          this.nodeDOM = nodeDOM;
      }
      // By default, a node is rendered using the `toDOM` method from the
      // node type spec. But client code can use the `nodeViews` spec to
      // supply a custom node view, which can influence various aspects of
      // the way the node works.
      //
      // (Using subclassing for this was intentionally decided against,
      // since it'd require exposing a whole slew of finicky
      // implementation details to the user code that they probably will
      // never need.)
      static create(parent, node, outerDeco, innerDeco, view, pos) {
          let custom = view.nodeViews[node.type.name], descObj;
          let spec = custom && custom(node, view, ()=>{
              // (This is a function that allows the custom view to find its
              // own position)
              if (!descObj) return pos;
              if (descObj.parent) return descObj.parent.posBeforeChild(descObj);
          }, outerDeco, innerDeco);
          let dom = spec && spec.dom, contentDOM = spec && spec.contentDOM;
          if (node.isText) {
              if (!dom) dom = document.createTextNode(node.text);
              else if (dom.nodeType != 3) throw new RangeError("Text must be rendered as a DOM text node");
          } else if (!dom) ({ dom: dom, contentDOM: contentDOM } = (0, $59526ec4d3b41406$export$3476b78f8f5a8b72).renderSpec(document, node.type.spec.toDOM(node)));
          if (!contentDOM && !node.isText && dom.nodeName != "BR") {
              if (!dom.hasAttribute("contenteditable")) dom.contentEditable = "false";
              if (node.type.spec.draggable) dom.draggable = true;
          }
          let nodeDOM = dom;
          dom = $f18febfa986513b3$var$applyOuterDeco(dom, outerDeco, node);
          if (spec) return descObj = new $f18febfa986513b3$var$CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM || null, nodeDOM, spec, view, pos + 1);
          else if (node.isText) return new $f18febfa986513b3$var$TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view);
          else return new $f18febfa986513b3$var$NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM || null, nodeDOM, view, pos + 1);
      }
      parseRule() {
          // Experimental kludge to allow opt-in re-parsing of nodes
          if (this.node.type.spec.reparseInView) return null;
          // FIXME the assumption that this can always return the current
          // attrs means that if the user somehow manages to change the
          // attrs in the dom, that won't be picked up. Not entirely sure
          // whether this is a problem
          let rule = {
              node: this.node.type.name,
              attrs: this.node.attrs
          };
          if (this.node.type.whitespace == "pre") rule.preserveWhitespace = "full";
          if (!this.contentDOM) rule.getContent = ()=>this.node.content;
          else if (!this.contentLost) rule.contentElement = this.contentDOM;
          else {
              // Chrome likes to randomly recreate parent nodes when
              // backspacing things. When that happens, this tries to find the
              // new parent.
              for(let i = this.children.length - 1; i >= 0; i--){
                  let child = this.children[i];
                  if (this.dom.contains(child.dom.parentNode)) {
                      rule.contentElement = child.dom.parentNode;
                      break;
                  }
              }
              if (!rule.contentElement) rule.getContent = ()=>(0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
          }
          return rule;
      }
      matchesNode(node, outerDeco, innerDeco) {
          return this.dirty == $f18febfa986513b3$var$NOT_DIRTY && node.eq(this.node) && $f18febfa986513b3$var$sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco);
      }
      get size() {
          return this.node.nodeSize;
      }
      get border() {
          return this.node.isLeaf ? 0 : 1;
      }
      // Syncs `this.children` to match `this.node.content` and the local
      // decorations, possibly introducing nesting for marks. Then, in a
      // separate step, syncs the DOM inside `this.contentDOM` to
      // `this.children`.
      updateChildren(view, pos) {
          let inline = this.node.inlineContent, off = pos;
          let composition = view.composing ? this.localCompositionInfo(view, pos) : null;
          let localComposition = composition && composition.pos > -1 ? composition : null;
          let compositionInChild = composition && composition.pos < 0;
          let updater = new $f18febfa986513b3$var$ViewTreeUpdater(this, localComposition && localComposition.node, view);
          $f18febfa986513b3$var$iterDeco(this.node, this.innerDeco, (widget, i, insideNode)=>{
              if (widget.spec.marks) updater.syncToMarks(widget.spec.marks, inline, view);
              else if (widget.type.side >= 0 && !insideNode) updater.syncToMarks(i == this.node.childCount ? (0, $59526ec4d3b41406$export$c9d15bcfc6d42044).none : this.node.child(i).marks, inline, view);
              // If the next node is a desc matching this widget, reuse it,
              // otherwise insert the widget as a new view desc.
              updater.placeWidget(widget, view, off);
          }, (child, outerDeco, innerDeco, i)=>{
              // Make sure the wrapping mark descs match the node's marks.
              updater.syncToMarks(child.marks, inline, view);
              // Try several strategies for drawing this node
              let compIndex;
              if (updater.findNodeMatch(child, outerDeco, innerDeco, i)) ;
              else if (compositionInChild && view.state.selection.from > off && view.state.selection.to < off + child.nodeSize && (compIndex = updater.findIndexWithChild(composition.node)) > -1 && updater.updateNodeAt(child, outerDeco, innerDeco, compIndex, view)) ;
              else if (updater.updateNextNode(child, outerDeco, innerDeco, view, i, off)) ;
              else // Add it as a new view
              updater.addNode(child, outerDeco, innerDeco, view, off);
              off += child.nodeSize;
          });
          // Drop all remaining descs after the current position.
          updater.syncToMarks([], inline, view);
          if (this.node.isTextblock) updater.addTextblockHacks();
          updater.destroyRest();
          // Sync the DOM if anything changed
          if (updater.changed || this.dirty == $f18febfa986513b3$var$CONTENT_DIRTY) {
              // May have to protect focused DOM from being changed if a composition is active
              if (localComposition) this.protectLocalComposition(view, localComposition);
              $f18febfa986513b3$var$renderDescs(this.contentDOM, this.children, view);
              if ($f18febfa986513b3$var$ios) $f18febfa986513b3$var$iosHacks(this.dom);
          }
      }
      localCompositionInfo(view, pos) {
          // Only do something if both the selection and a focused text node
          // are inside of this node
          let { from: from, to: to } = view.state.selection;
          if (!(view.state.selection instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)) || from < pos || to > pos + this.node.content.size) return null;
          let sel = view.domSelectionRange();
          let textNode = $f18febfa986513b3$var$nearbyTextNode(sel.focusNode, sel.focusOffset);
          if (!textNode || !this.dom.contains(textNode.parentNode)) return null;
          if (this.node.inlineContent) {
              // Find the text in the focused node in the node, stop if it's not
              // there (may have been modified through other means, in which
              // case it should overwritten)
              let text = textNode.nodeValue;
              let textPos = $f18febfa986513b3$var$findTextInFragment(this.node.content, text, from - pos, to - pos);
              return textPos < 0 ? null : {
                  node: textNode,
                  pos: textPos,
                  text: text
              };
          } else return {
              node: textNode,
              pos: -1,
              text: ""
          };
      }
      protectLocalComposition(view, { node: node, pos: pos, text: text }) {
          // The node is already part of a local view desc, leave it there
          if (this.getDesc(node)) return;
          // Create a composition view for the orphaned nodes
          let topNode = node;
          for(;; topNode = topNode.parentNode){
              if (topNode.parentNode == this.contentDOM) break;
              while(topNode.previousSibling)topNode.parentNode.removeChild(topNode.previousSibling);
              while(topNode.nextSibling)topNode.parentNode.removeChild(topNode.nextSibling);
              if (topNode.pmViewDesc) topNode.pmViewDesc = undefined;
          }
          let desc = new $f18febfa986513b3$var$CompositionViewDesc(this, topNode, node, text);
          view.input.compositionNodes.push(desc);
          // Patch up this.children to contain the composition view
          this.children = $f18febfa986513b3$var$replaceNodes(this.children, pos, pos + text.length, view, desc);
      }
      // If this desc must be updated to match the given node decoration,
      // do so and return true.
      update(node, outerDeco, innerDeco, view) {
          if (this.dirty == $f18febfa986513b3$var$NODE_DIRTY || !node.sameMarkup(this.node)) return false;
          this.updateInner(node, outerDeco, innerDeco, view);
          return true;
      }
      updateInner(node, outerDeco, innerDeco, view) {
          this.updateOuterDeco(outerDeco);
          this.node = node;
          this.innerDeco = innerDeco;
          if (this.contentDOM) this.updateChildren(view, this.posAtStart);
          this.dirty = $f18febfa986513b3$var$NOT_DIRTY;
      }
      updateOuterDeco(outerDeco) {
          if ($f18febfa986513b3$var$sameOuterDeco(outerDeco, this.outerDeco)) return;
          let needsWrap = this.nodeDOM.nodeType != 1;
          let oldDOM = this.dom;
          this.dom = $f18febfa986513b3$var$patchOuterDeco(this.dom, this.nodeDOM, $f18febfa986513b3$var$computeOuterDeco(this.outerDeco, this.node, needsWrap), $f18febfa986513b3$var$computeOuterDeco(outerDeco, this.node, needsWrap));
          if (this.dom != oldDOM) {
              oldDOM.pmViewDesc = undefined;
              this.dom.pmViewDesc = this;
          }
          this.outerDeco = outerDeco;
      }
      // Mark this node as being the selected node.
      selectNode() {
          if (this.nodeDOM.nodeType == 1) this.nodeDOM.classList.add("ProseMirror-selectednode");
          if (this.contentDOM || !this.node.type.spec.draggable) this.dom.draggable = true;
      }
      // Remove selected node marking from this node.
      deselectNode() {
          if (this.nodeDOM.nodeType == 1) this.nodeDOM.classList.remove("ProseMirror-selectednode");
          if (this.contentDOM || !this.node.type.spec.draggable) this.dom.removeAttribute("draggable");
      }
      get domAtom() {
          return this.node.isAtom;
      }
  }
  // Create a view desc for the top-level document node, to be exported
  // and used by the view class.
  function $f18febfa986513b3$var$docViewDesc(doc, outerDeco, innerDeco, dom, view) {
      $f18febfa986513b3$var$applyOuterDeco(dom, outerDeco, doc);
      let docView = new $f18febfa986513b3$var$NodeViewDesc(undefined, doc, outerDeco, innerDeco, dom, dom, dom, view, 0);
      if (docView.contentDOM) docView.updateChildren(view, 0);
      return docView;
  }
  class $f18febfa986513b3$var$TextViewDesc extends $f18febfa986513b3$var$NodeViewDesc {
      constructor(parent, node, outerDeco, innerDeco, dom, nodeDOM, view){
          super(parent, node, outerDeco, innerDeco, dom, null, nodeDOM, view, 0);
      }
      parseRule() {
          let skip = this.nodeDOM.parentNode;
          while(skip && skip != this.dom && !skip.pmIsDeco)skip = skip.parentNode;
          return {
              skip: skip || true
          };
      }
      update(node, outerDeco, innerDeco, view) {
          if (this.dirty == $f18febfa986513b3$var$NODE_DIRTY || this.dirty != $f18febfa986513b3$var$NOT_DIRTY && !this.inParent() || !node.sameMarkup(this.node)) return false;
          this.updateOuterDeco(outerDeco);
          if ((this.dirty != $f18febfa986513b3$var$NOT_DIRTY || node.text != this.node.text) && node.text != this.nodeDOM.nodeValue) {
              this.nodeDOM.nodeValue = node.text;
              if (view.trackWrites == this.nodeDOM) view.trackWrites = null;
          }
          this.node = node;
          this.dirty = $f18febfa986513b3$var$NOT_DIRTY;
          return true;
      }
      inParent() {
          let parentDOM = this.parent.contentDOM;
          for(let n = this.nodeDOM; n; n = n.parentNode)if (n == parentDOM) return true;
          return false;
      }
      domFromPos(pos) {
          return {
              node: this.nodeDOM,
              offset: pos
          };
      }
      localPosFromDOM(dom, offset, bias) {
          if (dom == this.nodeDOM) return this.posAtStart + Math.min(offset, this.node.text.length);
          return super.localPosFromDOM(dom, offset, bias);
      }
      ignoreMutation(mutation) {
          return mutation.type != "characterData" && mutation.type != "selection";
      }
      slice(from, to, view) {
          let node = this.node.cut(from, to), dom = document.createTextNode(node.text);
          return new $f18febfa986513b3$var$TextViewDesc(this.parent, node, this.outerDeco, this.innerDeco, dom, dom, view);
      }
      markDirty(from, to) {
          super.markDirty(from, to);
          if (this.dom != this.nodeDOM && (from == 0 || to == this.nodeDOM.nodeValue.length)) this.dirty = $f18febfa986513b3$var$NODE_DIRTY;
      }
      get domAtom() {
          return false;
      }
  }
  // A dummy desc used to tag trailing BR or IMG nodes created to work
  // around contentEditable terribleness.
  class $f18febfa986513b3$var$TrailingHackViewDesc extends $f18febfa986513b3$var$ViewDesc {
      parseRule() {
          return {
              ignore: true
          };
      }
      matchesHack(nodeName) {
          return this.dirty == $f18febfa986513b3$var$NOT_DIRTY && this.dom.nodeName == nodeName;
      }
      get domAtom() {
          return true;
      }
      get ignoreForCoords() {
          return this.dom.nodeName == "IMG";
      }
  }
  // A separate subclass is used for customized node views, so that the
  // extra checks only have to be made for nodes that are actually
  // customized.
  class $f18febfa986513b3$var$CustomNodeViewDesc extends $f18febfa986513b3$var$NodeViewDesc {
      constructor(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view, pos){
          super(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos);
          this.spec = spec;
      }
      // A custom `update` method gets to decide whether the update goes
      // through. If it does, and there's a `contentDOM` node, our logic
      // updates the children.
      update(node, outerDeco, innerDeco, view) {
          if (this.dirty == $f18febfa986513b3$var$NODE_DIRTY) return false;
          if (this.spec.update) {
              let result = this.spec.update(node, outerDeco, innerDeco);
              if (result) this.updateInner(node, outerDeco, innerDeco, view);
              return result;
          } else if (!this.contentDOM && !node.isLeaf) return false;
          else return super.update(node, outerDeco, innerDeco, view);
      }
      selectNode() {
          this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
      }
      deselectNode() {
          this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
      }
      setSelection(anchor, head, root, force) {
          this.spec.setSelection ? this.spec.setSelection(anchor, head, root) : super.setSelection(anchor, head, root, force);
      }
      destroy() {
          if (this.spec.destroy) this.spec.destroy();
          super.destroy();
      }
      stopEvent(event) {
          return this.spec.stopEvent ? this.spec.stopEvent(event) : false;
      }
      ignoreMutation(mutation) {
          return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : super.ignoreMutation(mutation);
      }
  }
  // Sync the content of the given DOM node with the nodes associated
  // with the given array of view descs, recursing into mark descs
  // because this should sync the subtree for a whole node at a time.
  function $f18febfa986513b3$var$renderDescs(parentDOM, descs, view) {
      let dom = parentDOM.firstChild, written = false;
      for(let i = 0; i < descs.length; i++){
          let desc = descs[i], childDOM = desc.dom;
          if (childDOM.parentNode == parentDOM) {
              while(childDOM != dom){
                  dom = $f18febfa986513b3$var$rm(dom);
                  written = true;
              }
              dom = dom.nextSibling;
          } else {
              written = true;
              parentDOM.insertBefore(childDOM, dom);
          }
          if (desc instanceof $f18febfa986513b3$var$MarkViewDesc) {
              let pos = dom ? dom.previousSibling : parentDOM.lastChild;
              $f18febfa986513b3$var$renderDescs(desc.contentDOM, desc.children, view);
              dom = pos ? pos.nextSibling : parentDOM.firstChild;
          }
      }
      while(dom){
          dom = $f18febfa986513b3$var$rm(dom);
          written = true;
      }
      if (written && view.trackWrites == parentDOM) view.trackWrites = null;
  }
  const $f18febfa986513b3$var$OuterDecoLevel = function(nodeName) {
      if (nodeName) this.nodeName = nodeName;
  };
  $f18febfa986513b3$var$OuterDecoLevel.prototype = Object.create(null);
  const $f18febfa986513b3$var$noDeco = [
      new $f18febfa986513b3$var$OuterDecoLevel
  ];
  function $f18febfa986513b3$var$computeOuterDeco(outerDeco, node, needsWrap) {
      if (outerDeco.length == 0) return $f18febfa986513b3$var$noDeco;
      let top = needsWrap ? $f18febfa986513b3$var$noDeco[0] : new $f18febfa986513b3$var$OuterDecoLevel, result = [
          top
      ];
      for(let i = 0; i < outerDeco.length; i++){
          let attrs = outerDeco[i].type.attrs;
          if (!attrs) continue;
          if (attrs.nodeName) result.push(top = new $f18febfa986513b3$var$OuterDecoLevel(attrs.nodeName));
          for(let name in attrs){
              let val = attrs[name];
              if (val == null) continue;
              if (needsWrap && result.length == 1) result.push(top = new $f18febfa986513b3$var$OuterDecoLevel(node.isInline ? "span" : "div"));
              if (name == "class") top.class = (top.class ? top.class + " " : "") + val;
              else if (name == "style") top.style = (top.style ? top.style + ";" : "") + val;
              else if (name != "nodeName") top[name] = val;
          }
      }
      return result;
  }
  function $f18febfa986513b3$var$patchOuterDeco(outerDOM, nodeDOM, prevComputed, curComputed) {
      // Shortcut for trivial case
      if (prevComputed == $f18febfa986513b3$var$noDeco && curComputed == $f18febfa986513b3$var$noDeco) return nodeDOM;
      let curDOM = nodeDOM;
      for(let i = 0; i < curComputed.length; i++){
          let deco = curComputed[i], prev = prevComputed[i];
          if (i) {
              let parent;
              if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM && (parent = curDOM.parentNode) && parent.nodeName.toLowerCase() == deco.nodeName) curDOM = parent;
              else {
                  parent = document.createElement(deco.nodeName);
                  parent.pmIsDeco = true;
                  parent.appendChild(curDOM);
                  prev = $f18febfa986513b3$var$noDeco[0];
                  curDOM = parent;
              }
          }
          $f18febfa986513b3$var$patchAttributes(curDOM, prev || $f18febfa986513b3$var$noDeco[0], deco);
      }
      return curDOM;
  }
  function $f18febfa986513b3$var$patchAttributes(dom, prev, cur) {
      for(let name in prev)if (name != "class" && name != "style" && name != "nodeName" && !(name in cur)) dom.removeAttribute(name);
      for(let name in cur)if (name != "class" && name != "style" && name != "nodeName" && cur[name] != prev[name]) dom.setAttribute(name, cur[name]);
      if (prev.class != cur.class) {
          let prevList = prev.class ? prev.class.split(" ").filter(Boolean) : [];
          let curList = cur.class ? cur.class.split(" ").filter(Boolean) : [];
          for(let i = 0; i < prevList.length; i++)if (curList.indexOf(prevList[i]) == -1) dom.classList.remove(prevList[i]);
          for(let i = 0; i < curList.length; i++)if (prevList.indexOf(curList[i]) == -1) dom.classList.add(curList[i]);
          if (dom.classList.length == 0) dom.removeAttribute("class");
      }
      if (prev.style != cur.style) {
          if (prev.style) {
              let prop = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m;
              while(m = prop.exec(prev.style))dom.style.removeProperty(m[1]);
          }
          if (cur.style) dom.style.cssText += cur.style;
      }
  }
  function $f18febfa986513b3$var$applyOuterDeco(dom, deco, node) {
      return $f18febfa986513b3$var$patchOuterDeco(dom, dom, $f18febfa986513b3$var$noDeco, $f18febfa986513b3$var$computeOuterDeco(deco, node, dom.nodeType != 1));
  }
  function $f18febfa986513b3$var$sameOuterDeco(a, b) {
      if (a.length != b.length) return false;
      for(let i = 0; i < a.length; i++)if (!a[i].type.eq(b[i].type)) return false;
      return true;
  }
  // Remove a DOM node and return its next sibling.
  function $f18febfa986513b3$var$rm(dom) {
      let next = dom.nextSibling;
      dom.parentNode.removeChild(dom);
      return next;
  }
  // Helper class for incrementally updating a tree of mark descs and
  // the widget and node descs inside of them.
  class $f18febfa986513b3$var$ViewTreeUpdater {
      constructor(top, lock, view){
          this.lock = lock;
          this.view = view;
          // Index into `this.top`'s child array, represents the current
          // update position.
          this.index = 0;
          // When entering a mark, the current top and index are pushed
          // onto this.
          this.stack = [];
          // Tracks whether anything was changed
          this.changed = false;
          this.top = top;
          this.preMatch = $f18febfa986513b3$var$preMatch(top.node.content, top);
      }
      // Destroy and remove the children between the given indices in
      // `this.top`.
      destroyBetween(start, end) {
          if (start == end) return;
          for(let i = start; i < end; i++)this.top.children[i].destroy();
          this.top.children.splice(start, end - start);
          this.changed = true;
      }
      // Destroy all remaining children in `this.top`.
      destroyRest() {
          this.destroyBetween(this.index, this.top.children.length);
      }
      // Sync the current stack of mark descs with the given array of
      // marks, reusing existing mark descs when possible.
      syncToMarks(marks, inline, view) {
          let keep = 0, depth = this.stack.length >> 1;
          let maxKeep = Math.min(depth, marks.length);
          while(keep < maxKeep && (keep == depth - 1 ? this.top : this.stack[keep + 1 << 1]).matchesMark(marks[keep]) && marks[keep].type.spec.spanning !== false)keep++;
          while(keep < depth){
              this.destroyRest();
              this.top.dirty = $f18febfa986513b3$var$NOT_DIRTY;
              this.index = this.stack.pop();
              this.top = this.stack.pop();
              depth--;
          }
          while(depth < marks.length){
              this.stack.push(this.top, this.index + 1);
              let found = -1;
              for(let i = this.index; i < Math.min(this.index + 3, this.top.children.length); i++){
                  let next = this.top.children[i];
                  if (next.matchesMark(marks[depth]) && !this.isLocked(next.dom)) {
                      found = i;
                      break;
                  }
              }
              if (found > -1) {
                  if (found > this.index) {
                      this.changed = true;
                      this.destroyBetween(this.index, found);
                  }
                  this.top = this.top.children[this.index];
              } else {
                  let markDesc = $f18febfa986513b3$var$MarkViewDesc.create(this.top, marks[depth], inline, view);
                  this.top.children.splice(this.index, 0, markDesc);
                  this.top = markDesc;
                  this.changed = true;
              }
              this.index = 0;
              depth++;
          }
      }
      // Try to find a node desc matching the given data. Skip over it and
      // return true when successful.
      findNodeMatch(node, outerDeco, innerDeco, index) {
          let found = -1, targetDesc;
          if (index >= this.preMatch.index && (targetDesc = this.preMatch.matches[index - this.preMatch.index]).parent == this.top && targetDesc.matchesNode(node, outerDeco, innerDeco)) found = this.top.children.indexOf(targetDesc, this.index);
          else for(let i = this.index, e = Math.min(this.top.children.length, i + 5); i < e; i++){
              let child = this.top.children[i];
              if (child.matchesNode(node, outerDeco, innerDeco) && !this.preMatch.matched.has(child)) {
                  found = i;
                  break;
              }
          }
          if (found < 0) return false;
          this.destroyBetween(this.index, found);
          this.index++;
          return true;
      }
      updateNodeAt(node, outerDeco, innerDeco, index, view) {
          let child = this.top.children[index];
          if (child.dirty == $f18febfa986513b3$var$NODE_DIRTY && child.dom == child.contentDOM) child.dirty = $f18febfa986513b3$var$CONTENT_DIRTY;
          if (!child.update(node, outerDeco, innerDeco, view)) return false;
          this.destroyBetween(this.index, index);
          this.index++;
          return true;
      }
      findIndexWithChild(domNode) {
          for(;;){
              let parent = domNode.parentNode;
              if (!parent) return -1;
              if (parent == this.top.contentDOM) {
                  let desc = domNode.pmViewDesc;
                  if (desc) for(let i = this.index; i < this.top.children.length; i++){
                      if (this.top.children[i] == desc) return i;
                  }
                  return -1;
              }
              domNode = parent;
          }
      }
      // Try to update the next node, if any, to the given data. Checks
      // pre-matches to avoid overwriting nodes that could still be used.
      updateNextNode(node, outerDeco, innerDeco, view, index, pos) {
          for(let i = this.index; i < this.top.children.length; i++){
              let next = this.top.children[i];
              if (next instanceof $f18febfa986513b3$var$NodeViewDesc) {
                  let preMatch = this.preMatch.matched.get(next);
                  if (preMatch != null && preMatch != index) return false;
                  let nextDOM = next.dom, updated;
                  // Can't update if nextDOM is or contains this.lock, except if
                  // it's a text node whose content already matches the new text
                  // and whose decorations match the new ones.
                  let locked = this.isLocked(nextDOM) && !(node.isText && next.node && next.node.isText && next.nodeDOM.nodeValue == node.text && next.dirty != $f18febfa986513b3$var$NODE_DIRTY && $f18febfa986513b3$var$sameOuterDeco(outerDeco, next.outerDeco));
                  if (!locked && next.update(node, outerDeco, innerDeco, view)) {
                      this.destroyBetween(this.index, i);
                      if (next.dom != nextDOM) this.changed = true;
                      this.index++;
                      return true;
                  } else if (!locked && (updated = this.recreateWrapper(next, node, outerDeco, innerDeco, view, pos))) {
                      this.top.children[this.index] = updated;
                      updated.dirty = $f18febfa986513b3$var$CONTENT_DIRTY;
                      updated.updateChildren(view, pos + 1);
                      updated.dirty = $f18febfa986513b3$var$NOT_DIRTY;
                      this.changed = true;
                      this.index++;
                      return true;
                  }
                  break;
              }
          }
          return false;
      }
      // When a node with content is replaced by a different node with
      // identical content, move over its children.
      recreateWrapper(next, node, outerDeco, innerDeco, view, pos) {
          if (next.dirty || node.isAtom || !next.children.length || !next.node.content.eq(node.content)) return null;
          let wrapper = $f18febfa986513b3$var$NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos);
          if (!wrapper.contentDOM) return null;
          wrapper.children = next.children;
          next.children = [];
          next.destroy();
          for (let ch of wrapper.children)ch.parent = wrapper;
          return wrapper;
      }
      // Insert the node as a newly created node desc.
      addNode(node, outerDeco, innerDeco, view, pos) {
          let desc = $f18febfa986513b3$var$NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos);
          if (desc.contentDOM) desc.updateChildren(view, pos + 1);
          this.top.children.splice(this.index++, 0, desc);
          this.changed = true;
      }
      placeWidget(widget, view, pos) {
          let next = this.index < this.top.children.length ? this.top.children[this.index] : null;
          if (next && next.matchesWidget(widget) && (widget == next.widget || !next.widget.type.toDOM.parentNode)) this.index++;
          else {
              let desc = new $f18febfa986513b3$var$WidgetViewDesc(this.top, widget, view, pos);
              this.top.children.splice(this.index++, 0, desc);
              this.changed = true;
          }
      }
      // Make sure a textblock looks and behaves correctly in
      // contentEditable.
      addTextblockHacks() {
          let lastChild = this.top.children[this.index - 1], parent = this.top;
          while(lastChild instanceof $f18febfa986513b3$var$MarkViewDesc){
              parent = lastChild;
              lastChild = parent.children[parent.children.length - 1];
          }
          if (!lastChild || // Empty textblock
          !(lastChild instanceof $f18febfa986513b3$var$TextViewDesc) || /\n$/.test(lastChild.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(lastChild.node.text)) {
              // Avoid bugs in Safari's cursor drawing (#1165) and Chrome's mouse selection (#1152)
              if (($f18febfa986513b3$var$safari || $f18febfa986513b3$var$chrome) && lastChild && lastChild.dom.contentEditable == "false") this.addHackNode("IMG", parent);
              this.addHackNode("BR", this.top);
          }
      }
      addHackNode(nodeName, parent) {
          if (parent == this.top && this.index < parent.children.length && parent.children[this.index].matchesHack(nodeName)) this.index++;
          else {
              let dom = document.createElement(nodeName);
              if (nodeName == "IMG") {
                  dom.className = "ProseMirror-separator";
                  dom.alt = "";
              }
              if (nodeName == "BR") dom.className = "ProseMirror-trailingBreak";
              let hack = new $f18febfa986513b3$var$TrailingHackViewDesc(this.top, [], dom, null);
              if (parent != this.top) parent.children.push(hack);
              else parent.children.splice(this.index++, 0, hack);
              this.changed = true;
          }
      }
      isLocked(node) {
          return this.lock && (node == this.lock || node.nodeType == 1 && node.contains(this.lock.parentNode));
      }
  }
  // Iterate from the end of the fragment and array of descs to find
  // directly matching ones, in order to avoid overeagerly reusing those
  // for other nodes. Returns the fragment index of the first node that
  // is part of the sequence of matched nodes at the end of the
  // fragment.
  function $f18febfa986513b3$var$preMatch(frag, parentDesc) {
      let curDesc = parentDesc, descI = curDesc.children.length;
      let fI = frag.childCount, matched = new Map, matches = [];
      outer: while(fI > 0){
          let desc;
          for(;;){
              if (descI) {
                  let next = curDesc.children[descI - 1];
                  if (next instanceof $f18febfa986513b3$var$MarkViewDesc) {
                      curDesc = next;
                      descI = next.children.length;
                  } else {
                      desc = next;
                      descI--;
                      break;
                  }
              } else if (curDesc == parentDesc) break outer;
              else {
                  // FIXME
                  descI = curDesc.parent.children.indexOf(curDesc);
                  curDesc = curDesc.parent;
              }
          }
          let node = desc.node;
          if (!node) continue;
          if (node != frag.child(fI - 1)) break;
          --fI;
          matched.set(desc, fI);
          matches.push(desc);
      }
      return {
          index: fI,
          matched: matched,
          matches: matches.reverse()
      };
  }
  function $f18febfa986513b3$var$compareSide(a, b) {
      return a.type.side - b.type.side;
  }
  // This function abstracts iterating over the nodes and decorations in
  // a fragment. Calls `onNode` for each node, with its local and child
  // decorations. Splits text nodes when there is a decoration starting
  // or ending inside of them. Calls `onWidget` for each widget.
  function $f18febfa986513b3$var$iterDeco(parent, deco, onWidget, onNode) {
      let locals = deco.locals(parent), offset = 0;
      // Simple, cheap variant for when there are no local decorations
      if (locals.length == 0) {
          for(let i = 0; i < parent.childCount; i++){
              let child = parent.child(i);
              onNode(child, locals, deco.forChild(offset, child), i);
              offset += child.nodeSize;
          }
          return;
      }
      let decoIndex = 0, active = [], restNode = null;
      for(let parentIndex = 0;;){
          if (decoIndex < locals.length && locals[decoIndex].to == offset) {
              let widget = locals[decoIndex++], widgets;
              while(decoIndex < locals.length && locals[decoIndex].to == offset)(widgets || (widgets = [
                  widget
              ])).push(locals[decoIndex++]);
              if (widgets) {
                  widgets.sort($f18febfa986513b3$var$compareSide);
                  for(let i = 0; i < widgets.length; i++)onWidget(widgets[i], parentIndex, !!restNode);
              } else onWidget(widget, parentIndex, !!restNode);
          }
          let child, index;
          if (restNode) {
              index = -1;
              child = restNode;
              restNode = null;
          } else if (parentIndex < parent.childCount) {
              index = parentIndex;
              child = parent.child(parentIndex++);
          } else break;
          for(let i = 0; i < active.length; i++)if (active[i].to <= offset) active.splice(i--, 1);
          while(decoIndex < locals.length && locals[decoIndex].from <= offset && locals[decoIndex].to > offset)active.push(locals[decoIndex++]);
          let end = offset + child.nodeSize;
          if (child.isText) {
              let cutAt = end;
              if (decoIndex < locals.length && locals[decoIndex].from < cutAt) cutAt = locals[decoIndex].from;
              for(let i = 0; i < active.length; i++)if (active[i].to < cutAt) cutAt = active[i].to;
              if (cutAt < end) {
                  restNode = child.cut(cutAt - offset);
                  child = child.cut(0, cutAt - offset);
                  end = cutAt;
                  index = -1;
              }
          }
          let outerDeco = child.isInline && !child.isLeaf ? active.filter((d)=>!d.inline) : active.slice();
          onNode(child, outerDeco, deco.forChild(offset, child), index);
          offset = end;
      }
  }
  // List markers in Mobile Safari will mysteriously disappear
  // sometimes. This works around that.
  function $f18febfa986513b3$var$iosHacks(dom) {
      if (dom.nodeName == "UL" || dom.nodeName == "OL") {
          let oldCSS = dom.style.cssText;
          dom.style.cssText = oldCSS + "; list-style: square !important";
          window.getComputedStyle(dom).listStyle;
          dom.style.cssText = oldCSS;
      }
  }
  function $f18febfa986513b3$var$nearbyTextNode(node, offset) {
      for(;;){
          if (node.nodeType == 3) return node;
          if (node.nodeType == 1 && offset > 0) {
              if (node.childNodes.length > offset && node.childNodes[offset].nodeType == 3) return node.childNodes[offset];
              node = node.childNodes[offset - 1];
              offset = $f18febfa986513b3$var$nodeSize(node);
          } else if (node.nodeType == 1 && offset < node.childNodes.length) {
              node = node.childNodes[offset];
              offset = 0;
          } else return null;
      }
  }
  // Find a piece of text in an inline fragment, overlapping from-to
  function $f18febfa986513b3$var$findTextInFragment(frag, text, from, to) {
      for(let i = 0, pos = 0; i < frag.childCount && pos <= to;){
          let child = frag.child(i++), childStart = pos;
          pos += child.nodeSize;
          if (!child.isText) continue;
          let str = child.text;
          while(i < frag.childCount){
              let next = frag.child(i++);
              pos += next.nodeSize;
              if (!next.isText) break;
              str += next.text;
          }
          if (pos >= from) {
              let found = childStart < to ? str.lastIndexOf(text, to - childStart - 1) : -1;
              if (found >= 0 && found + text.length + childStart >= from) return childStart + found;
              if (from == to && str.length >= to + text.length - childStart && str.slice(to - childStart, to - childStart + text.length) == text) return to;
          }
      }
      return -1;
  }
  // Replace range from-to in an array of view descs with replacement
  // (may be null to just delete). This goes very much against the grain
  // of the rest of this code, which tends to create nodes with the
  // right shape in one go, rather than messing with them after
  // creation, but is necessary in the composition hack.
  function $f18febfa986513b3$var$replaceNodes(nodes, from, to, view, replacement) {
      let result = [];
      for(let i = 0, off = 0; i < nodes.length; i++){
          let child = nodes[i], start = off, end = off += child.size;
          if (start >= to || end <= from) result.push(child);
          else {
              if (start < from) result.push(child.slice(0, from - start, view));
              if (replacement) {
                  result.push(replacement);
                  replacement = undefined;
              }
              if (end > to) result.push(child.slice(to - start, child.size, view));
          }
      }
      return result;
  }
  function $f18febfa986513b3$var$selectionFromDOM(view, origin = null) {
      let domSel = view.domSelectionRange(), doc = view.state.doc;
      if (!domSel.focusNode) return null;
      let nearestDesc = view.docView.nearestDesc(domSel.focusNode), inWidget = nearestDesc && nearestDesc.size == 0;
      let head = view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset, 1);
      if (head < 0) return null;
      let $head = doc.resolve(head), $anchor, selection;
      if ($f18febfa986513b3$var$selectionCollapsed(domSel)) {
          $anchor = $head;
          while(nearestDesc && !nearestDesc.node)nearestDesc = nearestDesc.parent;
          let nearestDescNode = nearestDesc.node;
          if (nearestDesc && nearestDescNode.isAtom && (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(nearestDescNode) && nearestDesc.parent && !(nearestDescNode.isInline && $f18febfa986513b3$var$isOnEdge(domSel.focusNode, domSel.focusOffset, nearestDesc.dom))) {
              let pos = nearestDesc.posBefore;
              selection = new (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)(head == pos ? $head : doc.resolve(pos));
          }
      } else {
          let anchor = view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset, 1);
          if (anchor < 0) return null;
          $anchor = doc.resolve(anchor);
      }
      if (!selection) {
          let bias = origin == "pointer" || view.state.selection.head < $head.pos && !inWidget ? 1 : -1;
          selection = $f18febfa986513b3$var$selectionBetween(view, $anchor, $head, bias);
      }
      return selection;
  }
  function $f18febfa986513b3$var$editorOwnsSelection(view) {
      return view.editable ? view.hasFocus() : $f18febfa986513b3$var$hasSelection(view) && document.activeElement && document.activeElement.contains(view.dom);
  }
  function $f18febfa986513b3$var$selectionToDOM(view, force = false) {
      let sel = view.state.selection;
      $f18febfa986513b3$var$syncNodeSelection(view, sel);
      if (!$f18febfa986513b3$var$editorOwnsSelection(view)) return;
      // The delayed drag selection causes issues with Cell Selections
      // in Safari. And the drag selection delay is to workarond issues
      // which only present in Chrome.
      if (!force && view.input.mouseDown && view.input.mouseDown.allowDefault && $f18febfa986513b3$var$chrome) {
          let domSel = view.domSelectionRange(), curSel = view.domObserver.currentSelection;
          if (domSel.anchorNode && curSel.anchorNode && $f18febfa986513b3$var$isEquivalentPosition(domSel.anchorNode, domSel.anchorOffset, curSel.anchorNode, curSel.anchorOffset)) {
              view.input.mouseDown.delayedSelectionSync = true;
              view.domObserver.setCurSelection();
              return;
          }
      }
      view.domObserver.disconnectSelection();
      if (view.cursorWrapper) $f18febfa986513b3$var$selectCursorWrapper(view);
      else {
          let { anchor: anchor, head: head } = sel, resetEditableFrom, resetEditableTo;
          if ($f18febfa986513b3$var$brokenSelectBetweenUneditable && !(sel instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb))) {
              if (!sel.$from.parent.inlineContent) resetEditableFrom = $f18febfa986513b3$var$temporarilyEditableNear(view, sel.from);
              if (!sel.empty && !sel.$from.parent.inlineContent) resetEditableTo = $f18febfa986513b3$var$temporarilyEditableNear(view, sel.to);
          }
          view.docView.setSelection(anchor, head, view.root, force);
          if ($f18febfa986513b3$var$brokenSelectBetweenUneditable) {
              if (resetEditableFrom) $f18febfa986513b3$var$resetEditable(resetEditableFrom);
              if (resetEditableTo) $f18febfa986513b3$var$resetEditable(resetEditableTo);
          }
          if (sel.visible) view.dom.classList.remove("ProseMirror-hideselection");
          else {
              view.dom.classList.add("ProseMirror-hideselection");
              if ("onselectionchange" in document) $f18febfa986513b3$var$removeClassOnSelectionChange(view);
          }
      }
      view.domObserver.setCurSelection();
      view.domObserver.connectSelection();
  }
  // Kludge to work around Webkit not allowing a selection to start/end
  // between non-editable block nodes. We briefly make something
  // editable, set the selection, then set it uneditable again.
  const $f18febfa986513b3$var$brokenSelectBetweenUneditable = $f18febfa986513b3$var$safari || $f18febfa986513b3$var$chrome && $f18febfa986513b3$var$chrome_version < 63;
  function $f18febfa986513b3$var$temporarilyEditableNear(view, pos) {
      let { node: node, offset: offset } = view.docView.domFromPos(pos, 0);
      let after = offset < node.childNodes.length ? node.childNodes[offset] : null;
      let before = offset ? node.childNodes[offset - 1] : null;
      if ($f18febfa986513b3$var$safari && after && after.contentEditable == "false") return $f18febfa986513b3$var$setEditable(after);
      if ((!after || after.contentEditable == "false") && (!before || before.contentEditable == "false")) {
          if (after) return $f18febfa986513b3$var$setEditable(after);
          else if (before) return $f18febfa986513b3$var$setEditable(before);
      }
  }
  function $f18febfa986513b3$var$setEditable(element) {
      element.contentEditable = "true";
      if ($f18febfa986513b3$var$safari && element.draggable) {
          element.draggable = false;
          element.wasDraggable = true;
      }
      return element;
  }
  function $f18febfa986513b3$var$resetEditable(element) {
      element.contentEditable = "false";
      if (element.wasDraggable) {
          element.draggable = true;
          element.wasDraggable = null;
      }
  }
  function $f18febfa986513b3$var$removeClassOnSelectionChange(view) {
      let doc = view.dom.ownerDocument;
      doc.removeEventListener("selectionchange", view.input.hideSelectionGuard);
      let domSel = view.domSelectionRange();
      let node = domSel.anchorNode, offset = domSel.anchorOffset;
      doc.addEventListener("selectionchange", view.input.hideSelectionGuard = ()=>{
          if (domSel.anchorNode != node || domSel.anchorOffset != offset) {
              doc.removeEventListener("selectionchange", view.input.hideSelectionGuard);
              setTimeout(()=>{
                  if (!$f18febfa986513b3$var$editorOwnsSelection(view) || view.state.selection.visible) view.dom.classList.remove("ProseMirror-hideselection");
              }, 20);
          }
      });
  }
  function $f18febfa986513b3$var$selectCursorWrapper(view) {
      let domSel = view.domSelection(), range = document.createRange();
      let node = view.cursorWrapper.dom, img = node.nodeName == "IMG";
      if (img) range.setEnd(node.parentNode, $f18febfa986513b3$var$domIndex(node) + 1);
      else range.setEnd(node, 0);
      range.collapse(false);
      domSel.removeAllRanges();
      domSel.addRange(range);
      // Kludge to kill 'control selection' in IE11 when selecting an
      // invisible cursor wrapper, since that would result in those weird
      // resize handles and a selection that considers the absolutely
      // positioned wrapper, rather than the root editable node, the
      // focused element.
      if (!img && !view.state.selection.visible && $f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11) {
          node.disabled = true;
          node.disabled = false;
      }
  }
  function $f18febfa986513b3$var$syncNodeSelection(view, sel) {
      if (sel instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)) {
          let desc = view.docView.descAt(sel.from);
          if (desc != view.lastSelectedViewDesc) {
              $f18febfa986513b3$var$clearNodeSelection(view);
              if (desc) desc.selectNode();
              view.lastSelectedViewDesc = desc;
          }
      } else $f18febfa986513b3$var$clearNodeSelection(view);
  }
  // Clear all DOM statefulness of the last node selection.
  function $f18febfa986513b3$var$clearNodeSelection(view) {
      if (view.lastSelectedViewDesc) {
          if (view.lastSelectedViewDesc.parent) view.lastSelectedViewDesc.deselectNode();
          view.lastSelectedViewDesc = undefined;
      }
  }
  function $f18febfa986513b3$var$selectionBetween(view, $anchor, $head, bias) {
      return view.someProp("createSelectionBetween", (f)=>f(view, $anchor, $head)) || (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).between($anchor, $head, bias);
  }
  function $f18febfa986513b3$var$hasFocusAndSelection(view) {
      if (view.editable && !view.hasFocus()) return false;
      return $f18febfa986513b3$var$hasSelection(view);
  }
  function $f18febfa986513b3$var$hasSelection(view) {
      let sel = view.domSelectionRange();
      if (!sel.anchorNode) return false;
      try {
          // Firefox will raise 'permission denied' errors when accessing
          // properties of `sel.anchorNode` when it's in a generated CSS
          // element.
          return view.dom.contains(sel.anchorNode.nodeType == 3 ? sel.anchorNode.parentNode : sel.anchorNode) && (view.editable || view.dom.contains(sel.focusNode.nodeType == 3 ? sel.focusNode.parentNode : sel.focusNode));
      } catch (_) {
          return false;
      }
  }
  function $f18febfa986513b3$var$anchorInRightPlace(view) {
      let anchorDOM = view.docView.domFromPos(view.state.selection.anchor, 0);
      let domSel = view.domSelectionRange();
      return $f18febfa986513b3$var$isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset);
  }
  function $f18febfa986513b3$var$moveSelectionBlock(state, dir) {
      let { $anchor: $anchor, $head: $head } = state.selection;
      let $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
      let $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
      return $start && (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).findFrom($start, dir);
  }
  function $f18febfa986513b3$var$apply(view, sel) {
      view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
      return true;
  }
  function $f18febfa986513b3$var$selectHorizontally(view, dir, mods) {
      let sel = view.state.selection;
      if (sel instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)) {
          if (!sel.empty || mods.indexOf("s") > -1) return false;
          else if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) {
              let next = $f18febfa986513b3$var$moveSelectionBlock(view.state, dir);
              if (next && next instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)) return $f18febfa986513b3$var$apply(view, next);
              return false;
          } else if (!($f18febfa986513b3$var$mac && mods.indexOf("m") > -1)) {
              let $head = sel.$head, node = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter, desc;
              if (!node || node.isText) return false;
              let nodePos = dir < 0 ? $head.pos - node.nodeSize : $head.pos;
              if (!(node.isAtom || (desc = view.docView.descAt(nodePos)) && !desc.contentDOM)) return false;
              if ((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(node)) return $f18febfa986513b3$var$apply(view, new (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)(dir < 0 ? view.state.doc.resolve($head.pos - node.nodeSize) : $head));
              else if ($f18febfa986513b3$var$webkit) // Chrome and Safari will introduce extra pointless cursor
              // positions around inline uneditable nodes, so we have to
              // take over and move the cursor past them (#937)
              return $f18febfa986513b3$var$apply(view, new (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)(view.state.doc.resolve(dir < 0 ? nodePos : nodePos + node.nodeSize)));
              else return false;
          }
      } else if (sel instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b) && sel.node.isInline) return $f18febfa986513b3$var$apply(view, new (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)(dir > 0 ? sel.$to : sel.$from));
      else {
          let next = $f18febfa986513b3$var$moveSelectionBlock(view.state, dir);
          if (next) return $f18febfa986513b3$var$apply(view, next);
          return false;
      }
  }
  function $f18febfa986513b3$var$nodeLen(node) {
      return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }
  function $f18febfa986513b3$var$isIgnorable(dom) {
      if (dom.contentEditable == "false") return true;
      let desc = dom.pmViewDesc;
      return desc && desc.size == 0 && (dom.nextSibling || dom.nodeName != "BR");
  }
  function $f18febfa986513b3$var$skipIgnoredNodes(view, dir) {
      return dir < 0 ? $f18febfa986513b3$var$skipIgnoredNodesBefore(view) : $f18febfa986513b3$var$skipIgnoredNodesAfter(view);
  }
  // Make sure the cursor isn't directly after one or more ignored
  // nodes, which will confuse the browser's cursor motion logic.
  function $f18febfa986513b3$var$skipIgnoredNodesBefore(view) {
      let sel = view.domSelectionRange();
      let node = sel.focusNode, offset = sel.focusOffset;
      if (!node) return;
      let moveNode, moveOffset, force = false;
      // Gecko will do odd things when the selection is directly in front
      // of a non-editable node, so in that case, move it into the next
      // node if possible. Issue prosemirror/prosemirror#832.
      if ($f18febfa986513b3$var$gecko && node.nodeType == 1 && offset < $f18febfa986513b3$var$nodeLen(node) && $f18febfa986513b3$var$isIgnorable(node.childNodes[offset])) force = true;
      for(;;){
          if (offset > 0) {
              if (node.nodeType != 1) break;
              else {
                  let before = node.childNodes[offset - 1];
                  if ($f18febfa986513b3$var$isIgnorable(before)) {
                      moveNode = node;
                      moveOffset = --offset;
                  } else if (before.nodeType == 3) {
                      node = before;
                      offset = node.nodeValue.length;
                  } else break;
              }
          } else if ($f18febfa986513b3$var$isBlockNode(node)) break;
          else {
              let prev = node.previousSibling;
              while(prev && $f18febfa986513b3$var$isIgnorable(prev)){
                  moveNode = node.parentNode;
                  moveOffset = $f18febfa986513b3$var$domIndex(prev);
                  prev = prev.previousSibling;
              }
              if (!prev) {
                  node = node.parentNode;
                  if (node == view.dom) break;
                  offset = 0;
              } else {
                  node = prev;
                  offset = $f18febfa986513b3$var$nodeLen(node);
              }
          }
      }
      if (force) $f18febfa986513b3$var$setSelFocus(view, node, offset);
      else if (moveNode) $f18febfa986513b3$var$setSelFocus(view, moveNode, moveOffset);
  }
  // Make sure the cursor isn't directly before one or more ignored
  // nodes.
  function $f18febfa986513b3$var$skipIgnoredNodesAfter(view) {
      let sel = view.domSelectionRange();
      let node = sel.focusNode, offset = sel.focusOffset;
      if (!node) return;
      let len = $f18febfa986513b3$var$nodeLen(node);
      let moveNode, moveOffset;
      for(;;){
          if (offset < len) {
              if (node.nodeType != 1) break;
              let after = node.childNodes[offset];
              if ($f18febfa986513b3$var$isIgnorable(after)) {
                  moveNode = node;
                  moveOffset = ++offset;
              } else break;
          } else if ($f18febfa986513b3$var$isBlockNode(node)) break;
          else {
              let next = node.nextSibling;
              while(next && $f18febfa986513b3$var$isIgnorable(next)){
                  moveNode = next.parentNode;
                  moveOffset = $f18febfa986513b3$var$domIndex(next) + 1;
                  next = next.nextSibling;
              }
              if (!next) {
                  node = node.parentNode;
                  if (node == view.dom) break;
                  offset = len = 0;
              } else {
                  node = next;
                  offset = 0;
                  len = $f18febfa986513b3$var$nodeLen(node);
              }
          }
      }
      if (moveNode) $f18febfa986513b3$var$setSelFocus(view, moveNode, moveOffset);
  }
  function $f18febfa986513b3$var$isBlockNode(dom) {
      let desc = dom.pmViewDesc;
      return desc && desc.node && desc.node.isBlock;
  }
  function $f18febfa986513b3$var$textNodeAfter(node, offset) {
      while(node && offset == node.childNodes.length && !$f18febfa986513b3$var$hasBlockDesc(node)){
          offset = $f18febfa986513b3$var$domIndex(node) + 1;
          node = node.parentNode;
      }
      while(node && offset < node.childNodes.length){
          node = node.childNodes[offset];
          if (node.nodeType == 3) return node;
          offset = 0;
      }
  }
  function $f18febfa986513b3$var$textNodeBefore(node, offset) {
      while(node && !offset && !$f18febfa986513b3$var$hasBlockDesc(node)){
          offset = $f18febfa986513b3$var$domIndex(node);
          node = node.parentNode;
      }
      while(node && offset){
          node = node.childNodes[offset - 1];
          if (node.nodeType == 3) return node;
          offset = node.childNodes.length;
      }
  }
  function $f18febfa986513b3$var$setSelFocus(view, node, offset) {
      if (node.nodeType != 3) {
          let before, after;
          if (after = $f18febfa986513b3$var$textNodeAfter(node, offset)) {
              node = after;
              offset = 0;
          } else if (before = $f18febfa986513b3$var$textNodeBefore(node, offset)) {
              node = before;
              offset = before.nodeValue.length;
          }
      }
      let sel = view.domSelection();
      if ($f18febfa986513b3$var$selectionCollapsed(sel)) {
          let range = document.createRange();
          range.setEnd(node, offset);
          range.setStart(node, offset);
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (sel.extend) sel.extend(node, offset);
      view.domObserver.setCurSelection();
      let { state: state } = view;
      // If no state update ends up happening, reset the selection.
      setTimeout(()=>{
          if (view.state == state) $f18febfa986513b3$var$selectionToDOM(view);
      }, 50);
  }
  function $f18febfa986513b3$var$findDirection(view, pos) {
      let $pos = view.state.doc.resolve(pos);
      if (!($f18febfa986513b3$var$chrome || $f18febfa986513b3$var$windows) && $pos.parent.inlineContent) {
          let coords = view.coordsAtPos(pos);
          if (pos > $pos.start()) {
              let before = view.coordsAtPos(pos - 1);
              let mid = (before.top + before.bottom) / 2;
              if (mid > coords.top && mid < coords.bottom && Math.abs(before.left - coords.left) > 1) return before.left < coords.left ? "ltr" : "rtl";
          }
          if (pos < $pos.end()) {
              let after = view.coordsAtPos(pos + 1);
              let mid = (after.top + after.bottom) / 2;
              if (mid > coords.top && mid < coords.bottom && Math.abs(after.left - coords.left) > 1) return after.left > coords.left ? "ltr" : "rtl";
          }
      }
      let computed = getComputedStyle(view.dom).direction;
      return computed == "rtl" ? "rtl" : "ltr";
  }
  // Check whether vertical selection motion would involve node
  // selections. If so, apply it (if not, the result is left to the
  // browser)
  function $f18febfa986513b3$var$selectVertically(view, dir, mods) {
      let sel = view.state.selection;
      if (sel instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb) && !sel.empty || mods.indexOf("s") > -1) return false;
      if ($f18febfa986513b3$var$mac && mods.indexOf("m") > -1) return false;
      let { $from: $from, $to: $to } = sel;
      if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? "up" : "down")) {
          let next = $f18febfa986513b3$var$moveSelectionBlock(view.state, dir);
          if (next && next instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)) return $f18febfa986513b3$var$apply(view, next);
      }
      if (!$from.parent.inlineContent) {
          let side = dir < 0 ? $from : $to;
          let beyond = sel instanceof (0, $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95) ? (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near(side, dir) : (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).findFrom(side, dir);
          return beyond ? $f18febfa986513b3$var$apply(view, beyond) : false;
      }
      return false;
  }
  function $f18febfa986513b3$var$stopNativeHorizontalDelete(view, dir) {
      if (!(view.state.selection instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb))) return true;
      let { $head: $head, $anchor: $anchor, empty: empty } = view.state.selection;
      if (!$head.sameParent($anchor)) return true;
      if (!empty) return false;
      if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) return true;
      let nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);
      if (nextNode && !nextNode.isText) {
          let tr = view.state.tr;
          if (dir < 0) tr.delete($head.pos - nextNode.nodeSize, $head.pos);
          else tr.delete($head.pos, $head.pos + nextNode.nodeSize);
          view.dispatch(tr);
          return true;
      }
      return false;
  }
  function $f18febfa986513b3$var$switchEditable(view, node, state) {
      view.domObserver.stop();
      node.contentEditable = state;
      view.domObserver.start();
  }
  // Issue #867 / #1090 / https://bugs.chromium.org/p/chromium/issues/detail?id=903821
  // In which Safari (and at some point in the past, Chrome) does really
  // wrong things when the down arrow is pressed when the cursor is
  // directly at the start of a textblock and has an uneditable node
  // after it
  function $f18febfa986513b3$var$safariDownArrowBug(view) {
      if (!$f18febfa986513b3$var$safari || view.state.selection.$head.parentOffset > 0) return false;
      let { focusNode: focusNode, focusOffset: focusOffset } = view.domSelectionRange();
      if (focusNode && focusNode.nodeType == 1 && focusOffset == 0 && focusNode.firstChild && focusNode.firstChild.contentEditable == "false") {
          let child = focusNode.firstChild;
          $f18febfa986513b3$var$switchEditable(view, child, "true");
          setTimeout(()=>$f18febfa986513b3$var$switchEditable(view, child, "false"), 20);
      }
      return false;
  }
  // A backdrop key mapping used to make sure we always suppress keys
  // that have a dangerous default effect, even if the commands they are
  // bound to return false, and to make sure that cursor-motion keys
  // find a cursor (as opposed to a node selection) when pressed. For
  // cursor-motion keys, the code in the handlers also takes care of
  // block selections.
  function $f18febfa986513b3$var$getMods(event) {
      let result = "";
      if (event.ctrlKey) result += "c";
      if (event.metaKey) result += "m";
      if (event.altKey) result += "a";
      if (event.shiftKey) result += "s";
      return result;
  }
  function $f18febfa986513b3$var$captureKeyDown(view, event) {
      let code = event.keyCode, mods = $f18febfa986513b3$var$getMods(event);
      if (code == 8 || $f18febfa986513b3$var$mac && code == 72 && mods == "c") return $f18febfa986513b3$var$stopNativeHorizontalDelete(view, -1) || $f18febfa986513b3$var$skipIgnoredNodes(view, -1);
      else if (code == 46 && !event.shiftKey || $f18febfa986513b3$var$mac && code == 68 && mods == "c") return $f18febfa986513b3$var$stopNativeHorizontalDelete(view, 1) || $f18febfa986513b3$var$skipIgnoredNodes(view, 1);
      else if (code == 13 || code == 27) return true;
      else if (code == 37 || $f18febfa986513b3$var$mac && code == 66 && mods == "c") {
          let dir = code == 37 ? $f18febfa986513b3$var$findDirection(view, view.state.selection.from) == "ltr" ? -1 : 1 : -1;
          return $f18febfa986513b3$var$selectHorizontally(view, dir, mods) || $f18febfa986513b3$var$skipIgnoredNodes(view, dir);
      } else if (code == 39 || $f18febfa986513b3$var$mac && code == 70 && mods == "c") {
          let dir = code == 39 ? $f18febfa986513b3$var$findDirection(view, view.state.selection.from) == "ltr" ? 1 : -1 : 1;
          return $f18febfa986513b3$var$selectHorizontally(view, dir, mods) || $f18febfa986513b3$var$skipIgnoredNodes(view, dir);
      } else if (code == 38 || $f18febfa986513b3$var$mac && code == 80 && mods == "c") return $f18febfa986513b3$var$selectVertically(view, -1, mods) || $f18febfa986513b3$var$skipIgnoredNodes(view, -1);
      else if (code == 40 || $f18febfa986513b3$var$mac && code == 78 && mods == "c") return $f18febfa986513b3$var$safariDownArrowBug(view) || $f18febfa986513b3$var$selectVertically(view, 1, mods) || $f18febfa986513b3$var$skipIgnoredNodesAfter(view);
      else if (mods == ($f18febfa986513b3$var$mac ? "m" : "c") && (code == 66 || code == 73 || code == 89 || code == 90)) return true;
      return false;
  }
  function $f18febfa986513b3$var$serializeForClipboard(view, slice) {
      view.someProp("transformCopied", (f)=>{
          slice = f(slice, view);
      });
      let context = [], { content: content, openStart: openStart, openEnd: openEnd } = slice;
      while(openStart > 1 && openEnd > 1 && content.childCount == 1 && content.firstChild.childCount == 1){
          openStart--;
          openEnd--;
          let node = content.firstChild;
          context.push(node.type.name, node.attrs != node.type.defaultAttrs ? node.attrs : null);
          content = node.content;
      }
      let serializer = view.someProp("clipboardSerializer") || (0, $59526ec4d3b41406$export$3476b78f8f5a8b72).fromSchema(view.state.schema);
      let doc = $f18febfa986513b3$var$detachedDoc(), wrap = doc.createElement("div");
      wrap.appendChild(serializer.serializeFragment(content, {
          document: doc
      }));
      let firstChild = wrap.firstChild, needsWrap, wrappers = 0;
      while(firstChild && firstChild.nodeType == 1 && (needsWrap = $f18febfa986513b3$var$wrapMap[firstChild.nodeName.toLowerCase()])){
          for(let i = needsWrap.length - 1; i >= 0; i--){
              let wrapper = doc.createElement(needsWrap[i]);
              while(wrap.firstChild)wrapper.appendChild(wrap.firstChild);
              wrap.appendChild(wrapper);
              wrappers++;
          }
          firstChild = wrap.firstChild;
      }
      if (firstChild && firstChild.nodeType == 1) firstChild.setAttribute("data-pm-slice", `${openStart} ${openEnd}${wrappers ? ` -${wrappers}` : ""} ${JSON.stringify(context)}`);
      let text = view.someProp("clipboardTextSerializer", (f)=>f(slice, view)) || slice.content.textBetween(0, slice.content.size, "\n\n");
      return {
          dom: wrap,
          text: text
      };
  }
  // Read a slice of content from the clipboard (or drop data).
  function $f18febfa986513b3$var$parseFromClipboard(view, text, html, plainText, $context) {
      let inCode = $context.parent.type.spec.code;
      let dom, slice;
      if (!html && !text) return null;
      let asText = text && (plainText || inCode || !html);
      if (asText) {
          view.someProp("transformPastedText", (f)=>{
              text = f(text, inCode || plainText, view);
          });
          if (inCode) return text ? new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(view.state.schema.text(text.replace(/\r\n?/g, "\n"))), 0, 0) : (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty;
          let parsed = view.someProp("clipboardTextParser", (f)=>f(text, $context, plainText, view));
          if (parsed) slice = parsed;
          else {
              let marks = $context.marks();
              let { schema: schema } = view.state, serializer = (0, $59526ec4d3b41406$export$3476b78f8f5a8b72).fromSchema(schema);
              dom = document.createElement("div");
              text.split(/(?:\r\n?|\n)+/).forEach((block)=>{
                  let p = dom.appendChild(document.createElement("p"));
                  if (block) p.appendChild(serializer.serializeNode(schema.text(block, marks)));
              });
          }
      } else {
          view.someProp("transformPastedHTML", (f)=>{
              html = f(html, view);
          });
          dom = $f18febfa986513b3$var$readHTML(html);
          if ($f18febfa986513b3$var$webkit) $f18febfa986513b3$var$restoreReplacedSpaces(dom);
      }
      let contextNode = dom && dom.querySelector("[data-pm-slice]");
      let sliceData = contextNode && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(contextNode.getAttribute("data-pm-slice") || "");
      if (sliceData && sliceData[3]) for(let i = +sliceData[3]; i > 0; i--){
          let child = dom.firstChild;
          while(child && child.nodeType != 1)child = child.nextSibling;
          if (!child) break;
          dom = child;
      }
      if (!slice) {
          let parser = view.someProp("clipboardParser") || view.someProp("domParser") || (0, $59526ec4d3b41406$export$1059c6e7d2ce5669).fromSchema(view.state.schema);
          slice = parser.parseSlice(dom, {
              preserveWhitespace: !!(asText || sliceData),
              context: $context,
              ruleFromNode (dom) {
                  if (dom.nodeName == "BR" && !dom.nextSibling && dom.parentNode && !$f18febfa986513b3$var$inlineParents.test(dom.parentNode.nodeName)) return {
                      ignore: true
                  };
                  return null;
              }
          });
      }
      if (sliceData) slice = $f18febfa986513b3$var$addContext($f18febfa986513b3$var$closeSlice(slice, +sliceData[1], +sliceData[2]), sliceData[4]);
      else {
          slice = (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).maxOpen($f18febfa986513b3$var$normalizeSiblings(slice.content, $context), true);
          if (slice.openStart || slice.openEnd) {
              let openStart = 0, openEnd = 0;
              for(let node = slice.content.firstChild; openStart < slice.openStart && !node.type.spec.isolating; openStart++, node = node.firstChild);
              for(let node = slice.content.lastChild; openEnd < slice.openEnd && !node.type.spec.isolating; openEnd++, node = node.lastChild);
              slice = $f18febfa986513b3$var$closeSlice(slice, openStart, openEnd);
          }
      }
      view.someProp("transformPasted", (f)=>{
          slice = f(slice, view);
      });
      return slice;
  }
  const $f18febfa986513b3$var$inlineParents = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
  // Takes a slice parsed with parseSlice, which means there hasn't been
  // any content-expression checking done on the top nodes, tries to
  // find a parent node in the current context that might fit the nodes,
  // and if successful, rebuilds the slice so that it fits into that parent.
  //
  // This addresses the problem that Transform.replace expects a
  // coherent slice, and will fail to place a set of siblings that don't
  // fit anywhere in the schema.
  function $f18febfa986513b3$var$normalizeSiblings(fragment, $context) {
      if (fragment.childCount < 2) return fragment;
      for(let d = $context.depth; d >= 0; d--){
          let parent = $context.node(d);
          let match = parent.contentMatchAt($context.index(d));
          let lastWrap, result = [];
          fragment.forEach((node)=>{
              if (!result) return;
              let wrap = match.findWrapping(node.type), inLast;
              if (!wrap) return result = null;
              if (inLast = result.length && lastWrap.length && $f18febfa986513b3$var$addToSibling(wrap, lastWrap, node, result[result.length - 1], 0)) result[result.length - 1] = inLast;
              else {
                  if (result.length) result[result.length - 1] = $f18febfa986513b3$var$closeRight(result[result.length - 1], lastWrap.length);
                  let wrapped = $f18febfa986513b3$var$withWrappers(node, wrap);
                  result.push(wrapped);
                  match = match.matchType(wrapped.type);
                  lastWrap = wrap;
              }
          });
          if (result) return (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(result);
      }
      return fragment;
  }
  function $f18febfa986513b3$var$withWrappers(node, wrap, from = 0) {
      for(let i = wrap.length - 1; i >= from; i--)node = wrap[i].create(null, (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(node));
      return node;
  }
  // Used to group adjacent nodes wrapped in similar parents by
  // normalizeSiblings into the same parent node
  function $f18febfa986513b3$var$addToSibling(wrap, lastWrap, node, sibling, depth) {
      if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
          let inner = $f18febfa986513b3$var$addToSibling(wrap, lastWrap, node, sibling.lastChild, depth + 1);
          if (inner) return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner));
          let match = sibling.contentMatchAt(sibling.childCount);
          if (match.matchType(depth == wrap.length - 1 ? node.type : wrap[depth + 1])) return sibling.copy(sibling.content.append((0, $59526ec4d3b41406$export$ffb0004e005737fa).from($f18febfa986513b3$var$withWrappers(node, wrap, depth + 1))));
      }
  }
  function $f18febfa986513b3$var$closeRight(node, depth) {
      if (depth == 0) return node;
      let fragment = node.content.replaceChild(node.childCount - 1, $f18febfa986513b3$var$closeRight(node.lastChild, depth - 1));
      let fill = node.contentMatchAt(node.childCount).fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, true);
      return node.copy(fragment.append(fill));
  }
  function $f18febfa986513b3$var$closeRange(fragment, side, from, to, depth, openEnd) {
      let node = side < 0 ? fragment.firstChild : fragment.lastChild, inner = node.content;
      if (fragment.childCount > 1) openEnd = 0;
      if (depth < to - 1) inner = $f18febfa986513b3$var$closeRange(inner, side, from, to, depth + 1, openEnd);
      if (depth >= from) inner = side < 0 ? node.contentMatchAt(0).fillBefore(inner, openEnd <= depth).append(inner) : inner.append(node.contentMatchAt(node.childCount).fillBefore((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty, true));
      return fragment.replaceChild(side < 0 ? 0 : fragment.childCount - 1, node.copy(inner));
  }
  function $f18febfa986513b3$var$closeSlice(slice, openStart, openEnd) {
      if (openStart < slice.openStart) slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($f18febfa986513b3$var$closeRange(slice.content, -1, openStart, slice.openStart, 0, slice.openEnd), openStart, slice.openEnd);
      if (openEnd < slice.openEnd) slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)($f18febfa986513b3$var$closeRange(slice.content, 1, openEnd, slice.openEnd, 0, 0), slice.openStart, openEnd);
      return slice;
  }
  // Trick from jQuery -- some elements must be wrapped in other
  // elements for innerHTML to work. I.e. if you do `div.innerHTML =
  // "<td>..</td>"` the table cells are ignored.
  const $f18febfa986513b3$var$wrapMap = {
      thead: [
          "table"
      ],
      tbody: [
          "table"
      ],
      tfoot: [
          "table"
      ],
      caption: [
          "table"
      ],
      colgroup: [
          "table"
      ],
      col: [
          "table",
          "colgroup"
      ],
      tr: [
          "table",
          "tbody"
      ],
      td: [
          "table",
          "tbody",
          "tr"
      ],
      th: [
          "table",
          "tbody",
          "tr"
      ]
  };
  let $f18febfa986513b3$var$_detachedDoc = null;
  function $f18febfa986513b3$var$detachedDoc() {
      return $f18febfa986513b3$var$_detachedDoc || ($f18febfa986513b3$var$_detachedDoc = document.implementation.createHTMLDocument("title"));
  }
  function $f18febfa986513b3$var$readHTML(html) {
      let metas = /^(\s*<meta [^>]*>)*/.exec(html);
      if (metas) html = html.slice(metas[0].length);
      let elt = $f18febfa986513b3$var$detachedDoc().createElement("div");
      let firstTag = /<([a-z][^>\s]+)/i.exec(html), wrap;
      if (wrap = firstTag && $f18febfa986513b3$var$wrapMap[firstTag[1].toLowerCase()]) html = wrap.map((n)=>"<" + n + ">").join("") + html + wrap.map((n)=>"</" + n + ">").reverse().join("");
      elt.innerHTML = html;
      if (wrap) for(let i = 0; i < wrap.length; i++)elt = elt.querySelector(wrap[i]) || elt;
      return elt;
  }
  // Webkit browsers do some hard-to-predict replacement of regular
  // spaces with non-breaking spaces when putting content on the
  // clipboard. This tries to convert such non-breaking spaces (which
  // will be wrapped in a plain span on Chrome, a span with class
  // Apple-converted-space on Safari) back to regular spaces.
  function $f18febfa986513b3$var$restoreReplacedSpaces(dom) {
      let nodes = dom.querySelectorAll($f18febfa986513b3$var$chrome ? "span:not([class]):not([style])" : "span.Apple-converted-space");
      for(let i = 0; i < nodes.length; i++){
          let node = nodes[i];
          if (node.childNodes.length == 1 && node.textContent == "\xa0" && node.parentNode) node.parentNode.replaceChild(dom.ownerDocument.createTextNode(" "), node);
      }
  }
  function $f18febfa986513b3$var$addContext(slice, context) {
      if (!slice.size) return slice;
      let schema = slice.content.firstChild.type.schema, array;
      try {
          array = JSON.parse(context);
      } catch (e) {
          return slice;
      }
      let { content: content, openStart: openStart, openEnd: openEnd } = slice;
      for(let i = array.length - 2; i >= 0; i -= 2){
          let type = schema.nodes[array[i]];
          if (!type || type.hasRequiredAttrs()) break;
          content = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(type.create(array[i + 1], content));
          openStart++;
          openEnd++;
      }
      return new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(content, openStart, openEnd);
  }
  // A collection of DOM events that occur within the editor, and callback functions
  // to invoke when the event fires.
  const $f18febfa986513b3$var$handlers = {};
  const $f18febfa986513b3$var$editHandlers = {};
  const $f18febfa986513b3$var$passiveHandlers = {
      touchstart: true,
      touchmove: true
  };
  class $f18febfa986513b3$var$InputState {
      constructor(){
          this.shiftKey = false;
          this.mouseDown = null;
          this.lastKeyCode = null;
          this.lastKeyCodeTime = 0;
          this.lastClick = {
              time: 0,
              x: 0,
              y: 0,
              type: ""
          };
          this.lastSelectionOrigin = null;
          this.lastSelectionTime = 0;
          this.lastIOSEnter = 0;
          this.lastIOSEnterFallbackTimeout = -1;
          this.lastFocus = 0;
          this.lastTouch = 0;
          this.lastAndroidDelete = 0;
          this.composing = false;
          this.composingTimeout = -1;
          this.compositionNodes = [];
          this.compositionEndedAt = -200000000;
          this.compositionID = 1;
          // Set to a composition ID when there are pending changes at compositionend
          this.compositionPendingChanges = 0;
          this.domChangeCount = 0;
          this.eventHandlers = Object.create(null);
          this.hideSelectionGuard = null;
      }
  }
  function $f18febfa986513b3$var$initInput(view) {
      for(let event in $f18febfa986513b3$var$handlers){
          let handler = $f18febfa986513b3$var$handlers[event];
          view.dom.addEventListener(event, view.input.eventHandlers[event] = (event)=>{
              if ($f18febfa986513b3$var$eventBelongsToView(view, event) && !$f18febfa986513b3$var$runCustomHandler(view, event) && (view.editable || !(event.type in $f18febfa986513b3$var$editHandlers))) handler(view, event);
          }, $f18febfa986513b3$var$passiveHandlers[event] ? {
              passive: true
          } : undefined);
      }
      // On Safari, for reasons beyond my understanding, adding an input
      // event handler makes an issue where the composition vanishes when
      // you press enter go away.
      if ($f18febfa986513b3$var$safari) view.dom.addEventListener("input", ()=>null);
      $f18febfa986513b3$var$ensureListeners(view);
  }
  function $f18febfa986513b3$var$setSelectionOrigin(view, origin) {
      view.input.lastSelectionOrigin = origin;
      view.input.lastSelectionTime = Date.now();
  }
  function $f18febfa986513b3$var$destroyInput(view) {
      view.domObserver.stop();
      for(let type in view.input.eventHandlers)view.dom.removeEventListener(type, view.input.eventHandlers[type]);
      clearTimeout(view.input.composingTimeout);
      clearTimeout(view.input.lastIOSEnterFallbackTimeout);
  }
  function $f18febfa986513b3$var$ensureListeners(view) {
      view.someProp("handleDOMEvents", (currentHandlers)=>{
          for(let type in currentHandlers)if (!view.input.eventHandlers[type]) view.dom.addEventListener(type, view.input.eventHandlers[type] = (event)=>$f18febfa986513b3$var$runCustomHandler(view, event));
      });
  }
  function $f18febfa986513b3$var$runCustomHandler(view, event) {
      return view.someProp("handleDOMEvents", (handlers)=>{
          let handler = handlers[event.type];
          return handler ? handler(view, event) || event.defaultPrevented : false;
      });
  }
  function $f18febfa986513b3$var$eventBelongsToView(view, event) {
      if (!event.bubbles) return true;
      if (event.defaultPrevented) return false;
      for(let node = event.target; node != view.dom; node = node.parentNode)if (!node || node.nodeType == 11 || node.pmViewDesc && node.pmViewDesc.stopEvent(event)) return false;
      return true;
  }
  function $f18febfa986513b3$var$dispatchEvent(view, event) {
      if (!$f18febfa986513b3$var$runCustomHandler(view, event) && $f18febfa986513b3$var$handlers[event.type] && (view.editable || !(event.type in $f18febfa986513b3$var$editHandlers))) $f18febfa986513b3$var$handlers[event.type](view, event);
  }
  $f18febfa986513b3$var$editHandlers.keydown = (view, _event)=>{
      let event = _event;
      view.input.shiftKey = event.keyCode == 16 || event.shiftKey;
      if ($f18febfa986513b3$var$inOrNearComposition(view, event)) return;
      view.input.lastKeyCode = event.keyCode;
      view.input.lastKeyCodeTime = Date.now();
      // Suppress enter key events on Chrome Android, because those tend
      // to be part of a confused sequence of composition events fired,
      // and handling them eagerly tends to corrupt the input.
      if ($f18febfa986513b3$var$android && $f18febfa986513b3$var$chrome && event.keyCode == 13) return;
      if (event.keyCode != 229) view.domObserver.forceFlush();
      // On iOS, if we preventDefault enter key presses, the virtual
      // keyboard gets confused. So the hack here is to set a flag that
      // makes the DOM change code recognize that what just happens should
      // be replaced by whatever the Enter key handlers do.
      if ($f18febfa986513b3$var$ios && event.keyCode == 13 && !event.ctrlKey && !event.altKey && !event.metaKey) {
          let now = Date.now();
          view.input.lastIOSEnter = now;
          view.input.lastIOSEnterFallbackTimeout = setTimeout(()=>{
              if (view.input.lastIOSEnter == now) {
                  view.someProp("handleKeyDown", (f)=>f(view, $f18febfa986513b3$var$keyEvent(13, "Enter")));
                  view.input.lastIOSEnter = 0;
              }
          }, 200);
      } else if (view.someProp("handleKeyDown", (f)=>f(view, event)) || $f18febfa986513b3$var$captureKeyDown(view, event)) event.preventDefault();
      else $f18febfa986513b3$var$setSelectionOrigin(view, "key");
  };
  $f18febfa986513b3$var$editHandlers.keyup = (view, event)=>{
      if (event.keyCode == 16) view.input.shiftKey = false;
  };
  $f18febfa986513b3$var$editHandlers.keypress = (view, _event)=>{
      let event = _event;
      if ($f18febfa986513b3$var$inOrNearComposition(view, event) || !event.charCode || event.ctrlKey && !event.altKey || $f18febfa986513b3$var$mac && event.metaKey) return;
      if (view.someProp("handleKeyPress", (f)=>f(view, event))) {
          event.preventDefault();
          return;
      }
      let sel = view.state.selection;
      if (!(sel instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)) || !sel.$from.sameParent(sel.$to)) {
          let text = String.fromCharCode(event.charCode);
          if (!/[\r\n]/.test(text) && !view.someProp("handleTextInput", (f)=>f(view, sel.$from.pos, sel.$to.pos, text))) view.dispatch(view.state.tr.insertText(text).scrollIntoView());
          event.preventDefault();
      }
  };
  function $f18febfa986513b3$var$eventCoords(event) {
      return {
          left: event.clientX,
          top: event.clientY
      };
  }
  function $f18febfa986513b3$var$isNear(event, click) {
      let dx = click.x - event.clientX, dy = click.y - event.clientY;
      return dx * dx + dy * dy < 100;
  }
  function $f18febfa986513b3$var$runHandlerOnContext(view, propName, pos, inside, event) {
      if (inside == -1) return false;
      let $pos = view.state.doc.resolve(inside);
      for(let i = $pos.depth + 1; i > 0; i--){
          if (view.someProp(propName, (f)=>i > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i), event, true) : f(view, pos, $pos.node(i), $pos.before(i), event, false))) return true;
      }
      return false;
  }
  function $f18febfa986513b3$var$updateSelection(view, selection, origin) {
      if (!view.focused) view.focus();
      let tr = view.state.tr.setSelection(selection);
      if (origin == "pointer") tr.setMeta("pointer", true);
      view.dispatch(tr);
  }
  function $f18febfa986513b3$var$selectClickedLeaf(view, inside) {
      if (inside == -1) return false;
      let $pos = view.state.doc.resolve(inside), node = $pos.nodeAfter;
      if (node && node.isAtom && (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(node)) {
          $f18febfa986513b3$var$updateSelection(view, new (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)($pos), "pointer");
          return true;
      }
      return false;
  }
  function $f18febfa986513b3$var$selectClickedNode(view, inside) {
      if (inside == -1) return false;
      let sel = view.state.selection, selectedNode, selectAt;
      if (sel instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)) selectedNode = sel.node;
      let $pos = view.state.doc.resolve(inside);
      for(let i = $pos.depth + 1; i > 0; i--){
          let node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
          if ((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(node)) {
              if (selectedNode && sel.$from.depth > 0 && i >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos) selectAt = $pos.before(sel.$from.depth);
              else selectAt = $pos.before(i);
              break;
          }
      }
      if (selectAt != null) {
          $f18febfa986513b3$var$updateSelection(view, (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(view.state.doc, selectAt), "pointer");
          return true;
      } else return false;
  }
  function $f18febfa986513b3$var$handleSingleClick(view, pos, inside, event, selectNode) {
      return $f18febfa986513b3$var$runHandlerOnContext(view, "handleClickOn", pos, inside, event) || view.someProp("handleClick", (f)=>f(view, pos, event)) || (selectNode ? $f18febfa986513b3$var$selectClickedNode(view, inside) : $f18febfa986513b3$var$selectClickedLeaf(view, inside));
  }
  function $f18febfa986513b3$var$handleDoubleClick(view, pos, inside, event) {
      return $f18febfa986513b3$var$runHandlerOnContext(view, "handleDoubleClickOn", pos, inside, event) || view.someProp("handleDoubleClick", (f)=>f(view, pos, event));
  }
  function $f18febfa986513b3$var$handleTripleClick(view, pos, inside, event) {
      return $f18febfa986513b3$var$runHandlerOnContext(view, "handleTripleClickOn", pos, inside, event) || view.someProp("handleTripleClick", (f)=>f(view, pos, event)) || $f18febfa986513b3$var$defaultTripleClick(view, inside, event);
  }
  function $f18febfa986513b3$var$defaultTripleClick(view, inside, event) {
      if (event.button != 0) return false;
      let doc = view.state.doc;
      if (inside == -1) {
          if (doc.inlineContent) {
              $f18febfa986513b3$var$updateSelection(view, (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).create(doc, 0, doc.content.size), "pointer");
              return true;
          }
          return false;
      }
      let $pos = doc.resolve(inside);
      for(let i = $pos.depth + 1; i > 0; i--){
          let node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
          let nodePos = $pos.before(i);
          if (node.inlineContent) $f18febfa986513b3$var$updateSelection(view, (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).create(doc, nodePos + 1, nodePos + 1 + node.content.size), "pointer");
          else if ((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(node)) $f18febfa986513b3$var$updateSelection(view, (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(doc, nodePos), "pointer");
          else continue;
          return true;
      }
  }
  function $f18febfa986513b3$var$forceDOMFlush(view) {
      return $f18febfa986513b3$var$endComposition(view);
  }
  const $f18febfa986513b3$var$selectNodeModifier = $f18febfa986513b3$var$mac ? "metaKey" : "ctrlKey";
  $f18febfa986513b3$var$handlers.mousedown = (view, _event)=>{
      let event = _event;
      view.input.shiftKey = event.shiftKey;
      let flushed = $f18febfa986513b3$var$forceDOMFlush(view);
      let now = Date.now(), type = "singleClick";
      if (now - view.input.lastClick.time < 500 && $f18febfa986513b3$var$isNear(event, view.input.lastClick) && !event[$f18febfa986513b3$var$selectNodeModifier]) {
          if (view.input.lastClick.type == "singleClick") type = "doubleClick";
          else if (view.input.lastClick.type == "doubleClick") type = "tripleClick";
      }
      view.input.lastClick = {
          time: now,
          x: event.clientX,
          y: event.clientY,
          type: type
      };
      let pos = view.posAtCoords($f18febfa986513b3$var$eventCoords(event));
      if (!pos) return;
      if (type == "singleClick") {
          if (view.input.mouseDown) view.input.mouseDown.done();
          view.input.mouseDown = new $f18febfa986513b3$var$MouseDown(view, pos, event, !!flushed);
      } else if ((type == "doubleClick" ? $f18febfa986513b3$var$handleDoubleClick : $f18febfa986513b3$var$handleTripleClick)(view, pos.pos, pos.inside, event)) event.preventDefault();
      else $f18febfa986513b3$var$setSelectionOrigin(view, "pointer");
  };
  class $f18febfa986513b3$var$MouseDown {
      constructor(view, pos, event, flushed){
          this.view = view;
          this.pos = pos;
          this.event = event;
          this.flushed = flushed;
          this.delayedSelectionSync = false;
          this.mightDrag = null;
          this.startDoc = view.state.doc;
          this.selectNode = !!event[$f18febfa986513b3$var$selectNodeModifier];
          this.allowDefault = event.shiftKey;
          let targetNode, targetPos;
          if (pos.inside > -1) {
              targetNode = view.state.doc.nodeAt(pos.inside);
              targetPos = pos.inside;
          } else {
              let $pos = view.state.doc.resolve(pos.pos);
              targetNode = $pos.parent;
              targetPos = $pos.depth ? $pos.before() : 0;
          }
          const target = flushed ? null : event.target;
          const targetDesc = target ? view.docView.nearestDesc(target, true) : null;
          this.target = targetDesc ? targetDesc.dom : null;
          let { selection: selection } = view.state;
          if (event.button == 0 && targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false || selection instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b) && selection.from <= targetPos && selection.to > targetPos) this.mightDrag = {
              node: targetNode,
              pos: targetPos,
              addAttr: !!(this.target && !this.target.draggable),
              setUneditable: !!(this.target && $f18febfa986513b3$var$gecko && !this.target.hasAttribute("contentEditable"))
          };
          if (this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable)) {
              this.view.domObserver.stop();
              if (this.mightDrag.addAttr) this.target.draggable = true;
              if (this.mightDrag.setUneditable) setTimeout(()=>{
                  if (this.view.input.mouseDown == this) this.target.setAttribute("contentEditable", "false");
              }, 20);
              this.view.domObserver.start();
          }
          view.root.addEventListener("mouseup", this.up = this.up.bind(this));
          view.root.addEventListener("mousemove", this.move = this.move.bind(this));
          $f18febfa986513b3$var$setSelectionOrigin(view, "pointer");
      }
      done() {
          this.view.root.removeEventListener("mouseup", this.up);
          this.view.root.removeEventListener("mousemove", this.move);
          if (this.mightDrag && this.target) {
              this.view.domObserver.stop();
              if (this.mightDrag.addAttr) this.target.removeAttribute("draggable");
              if (this.mightDrag.setUneditable) this.target.removeAttribute("contentEditable");
              this.view.domObserver.start();
          }
          if (this.delayedSelectionSync) setTimeout(()=>$f18febfa986513b3$var$selectionToDOM(this.view));
          this.view.input.mouseDown = null;
      }
      up(event) {
          this.done();
          if (!this.view.dom.contains(event.target)) return;
          let pos = this.pos;
          if (this.view.state.doc != this.startDoc) pos = this.view.posAtCoords($f18febfa986513b3$var$eventCoords(event));
          this.updateAllowDefault(event);
          if (this.allowDefault || !pos) $f18febfa986513b3$var$setSelectionOrigin(this.view, "pointer");
          else if ($f18febfa986513b3$var$handleSingleClick(this.view, pos.pos, pos.inside, event, this.selectNode)) event.preventDefault();
          else if (event.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
          $f18febfa986513b3$var$safari && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
          // cursor, but still report that the node is selected
          // when asked through getSelection. You'll then get a
          // situation where clicking at the point where that
          // (hidden) cursor is doesn't change the selection, and
          // thus doesn't get a reaction from ProseMirror. This
          // works around that.
          $f18febfa986513b3$var$chrome && !this.view.state.selection.visible && Math.min(Math.abs(pos.pos - this.view.state.selection.from), Math.abs(pos.pos - this.view.state.selection.to)) <= 2)) {
              $f18febfa986513b3$var$updateSelection(this.view, (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near(this.view.state.doc.resolve(pos.pos)), "pointer");
              event.preventDefault();
          } else $f18febfa986513b3$var$setSelectionOrigin(this.view, "pointer");
      }
      move(event) {
          this.updateAllowDefault(event);
          $f18febfa986513b3$var$setSelectionOrigin(this.view, "pointer");
          if (event.buttons == 0) this.done();
      }
      updateAllowDefault(event) {
          if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 || Math.abs(this.event.y - event.clientY) > 4)) this.allowDefault = true;
      }
  }
  $f18febfa986513b3$var$handlers.touchstart = (view)=>{
      view.input.lastTouch = Date.now();
      $f18febfa986513b3$var$forceDOMFlush(view);
      $f18febfa986513b3$var$setSelectionOrigin(view, "pointer");
  };
  $f18febfa986513b3$var$handlers.touchmove = (view)=>{
      view.input.lastTouch = Date.now();
      $f18febfa986513b3$var$setSelectionOrigin(view, "pointer");
  };
  $f18febfa986513b3$var$handlers.contextmenu = (view)=>$f18febfa986513b3$var$forceDOMFlush(view);
  function $f18febfa986513b3$var$inOrNearComposition(view, event) {
      if (view.composing) return true;
      // See https://www.stum.de/2016/06/24/handling-ime-events-in-javascript/.
      // On Japanese input method editors (IMEs), the Enter key is used to confirm character
      // selection. On Safari, when Enter is pressed, compositionend and keydown events are
      // emitted. The keydown event triggers newline insertion, which we don't want.
      // This method returns true if the keydown event should be ignored.
      // We only ignore it once, as pressing Enter a second time *should* insert a newline.
      // Furthermore, the keydown event timestamp must be close to the compositionEndedAt timestamp.
      // This guards against the case where compositionend is triggered without the keyboard
      // (e.g. character confirmation may be done with the mouse), and keydown is triggered
      // afterwards- we wouldn't want to ignore the keydown event in this case.
      if ($f18febfa986513b3$var$safari && Math.abs(event.timeStamp - view.input.compositionEndedAt) < 500) {
          view.input.compositionEndedAt = -200000000;
          return true;
      }
      return false;
  }
  // Drop active composition after 5 seconds of inactivity on Android
  const $f18febfa986513b3$var$timeoutComposition = $f18febfa986513b3$var$android ? 5000 : -1;
  $f18febfa986513b3$var$editHandlers.compositionstart = $f18febfa986513b3$var$editHandlers.compositionupdate = (view)=>{
      if (!view.composing) {
          view.domObserver.flush();
          let { state: state } = view, $pos = state.selection.$from;
          if (state.selection.empty && (state.storedMarks || !$pos.textOffset && $pos.parentOffset && $pos.nodeBefore.marks.some((m)=>m.type.spec.inclusive === false))) {
              // Need to wrap the cursor in mark nodes different from the ones in the DOM context
              view.markCursor = view.state.storedMarks || $pos.marks();
              $f18febfa986513b3$var$endComposition(view, true);
              view.markCursor = null;
          } else {
              $f18febfa986513b3$var$endComposition(view);
              // In firefox, if the cursor is after but outside a marked node,
              // the inserted text won't inherit the marks. So this moves it
              // inside if necessary.
              if ($f18febfa986513b3$var$gecko && state.selection.empty && $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.length) {
                  let sel = view.domSelectionRange();
                  for(let node = sel.focusNode, offset = sel.focusOffset; node && node.nodeType == 1 && offset != 0;){
                      let before = offset < 0 ? node.lastChild : node.childNodes[offset - 1];
                      if (!before) break;
                      if (before.nodeType == 3) {
                          view.domSelection().collapse(before, before.nodeValue.length);
                          break;
                      } else {
                          node = before;
                          offset = -1;
                      }
                  }
              }
          }
          view.input.composing = true;
      }
      $f18febfa986513b3$var$scheduleComposeEnd(view, $f18febfa986513b3$var$timeoutComposition);
  };
  $f18febfa986513b3$var$editHandlers.compositionend = (view, event)=>{
      if (view.composing) {
          view.input.composing = false;
          view.input.compositionEndedAt = event.timeStamp;
          view.input.compositionPendingChanges = view.domObserver.pendingRecords().length ? view.input.compositionID : 0;
          if (view.input.compositionPendingChanges) Promise.resolve().then(()=>view.domObserver.flush());
          view.input.compositionID++;
          $f18febfa986513b3$var$scheduleComposeEnd(view, 20);
      }
  };
  function $f18febfa986513b3$var$scheduleComposeEnd(view, delay) {
      clearTimeout(view.input.composingTimeout);
      if (delay > -1) view.input.composingTimeout = setTimeout(()=>$f18febfa986513b3$var$endComposition(view), delay);
  }
  function $f18febfa986513b3$var$clearComposition(view) {
      if (view.composing) {
          view.input.composing = false;
          view.input.compositionEndedAt = $f18febfa986513b3$var$timestampFromCustomEvent();
      }
      while(view.input.compositionNodes.length > 0)view.input.compositionNodes.pop().markParentsDirty();
  }
  function $f18febfa986513b3$var$timestampFromCustomEvent() {
      let event = document.createEvent("Event");
      event.initEvent("event", true, true);
      return event.timeStamp;
  }
  /**
  @internal
  */ function $f18febfa986513b3$var$endComposition(view, forceUpdate = false) {
      if ($f18febfa986513b3$var$android && view.domObserver.flushingSoon >= 0) return;
      view.domObserver.forceFlush();
      $f18febfa986513b3$var$clearComposition(view);
      if (forceUpdate || view.docView && view.docView.dirty) {
          let sel = $f18febfa986513b3$var$selectionFromDOM(view);
          if (sel && !sel.eq(view.state.selection)) view.dispatch(view.state.tr.setSelection(sel));
          else view.updateState(view.state);
          return true;
      }
      return false;
  }
  function $f18febfa986513b3$var$captureCopy(view, dom) {
      // The extra wrapper is somehow necessary on IE/Edge to prevent the
      // content from being mangled when it is put onto the clipboard
      if (!view.dom.parentNode) return;
      let wrap = view.dom.parentNode.appendChild(document.createElement("div"));
      wrap.appendChild(dom);
      wrap.style.cssText = "position: fixed; left: -10000px; top: 10px";
      let sel = getSelection(), range = document.createRange();
      range.selectNodeContents(dom);
      // Done because IE will fire a selectionchange moving the selection
      // to its start when removeAllRanges is called and the editor still
      // has focus (which will mess up the editor's selection state).
      view.dom.blur();
      sel.removeAllRanges();
      sel.addRange(range);
      setTimeout(()=>{
          if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
          view.focus();
      }, 50);
  }
  // This is very crude, but unfortunately both these browsers _pretend_
  // that they have a clipboard API—all the objects and methods are
  // there, they just don't work, and they are hard to test.
  const $f18febfa986513b3$var$brokenClipboardAPI = $f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version < 15 || $f18febfa986513b3$var$ios && $f18febfa986513b3$var$webkit_version < 604;
  $f18febfa986513b3$var$handlers.copy = $f18febfa986513b3$var$editHandlers.cut = (view, _event)=>{
      let event = _event;
      let sel = view.state.selection, cut = event.type == "cut";
      if (sel.empty) return;
      // IE and Edge's clipboard interface is completely broken
      let data = $f18febfa986513b3$var$brokenClipboardAPI ? null : event.clipboardData;
      let slice = sel.content(), { dom: dom, text: text } = $f18febfa986513b3$var$serializeForClipboard(view, slice);
      if (data) {
          event.preventDefault();
          data.clearData();
          data.setData("text/html", dom.innerHTML);
          data.setData("text/plain", text);
      } else $f18febfa986513b3$var$captureCopy(view, dom);
      if (cut) view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
  };
  function $f18febfa986513b3$var$sliceSingleNode(slice) {
      return slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1 ? slice.content.firstChild : null;
  }
  function $f18febfa986513b3$var$capturePaste(view, event) {
      if (!view.dom.parentNode) return;
      let plainText = view.input.shiftKey || view.state.selection.$from.parent.type.spec.code;
      let target = view.dom.parentNode.appendChild(document.createElement(plainText ? "textarea" : "div"));
      if (!plainText) target.contentEditable = "true";
      target.style.cssText = "position: fixed; left: -10000px; top: 10px";
      target.focus();
      let plain = view.input.shiftKey && view.input.lastKeyCode != 45;
      setTimeout(()=>{
          view.focus();
          if (target.parentNode) target.parentNode.removeChild(target);
          if (plainText) $f18febfa986513b3$var$doPaste(view, target.value, null, plain, event);
          else $f18febfa986513b3$var$doPaste(view, target.textContent, target.innerHTML, plain, event);
      }, 50);
  }
  function $f18febfa986513b3$var$doPaste(view, text, html, preferPlain, event) {
      let slice = $f18febfa986513b3$var$parseFromClipboard(view, text, html, preferPlain, view.state.selection.$from);
      if (view.someProp("handlePaste", (f)=>f(view, event, slice || (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty))) return true;
      if (!slice) return false;
      let singleNode = $f18febfa986513b3$var$sliceSingleNode(slice);
      let tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, preferPlain) : view.state.tr.replaceSelection(slice);
      view.dispatch(tr.scrollIntoView().setMeta("paste", true).setMeta("uiEvent", "paste"));
      return true;
  }
  $f18febfa986513b3$var$editHandlers.paste = (view, _event)=>{
      let event = _event;
      // Handling paste from JavaScript during composition is very poorly
      // handled by browsers, so as a dodgy but preferable kludge, we just
      // let the browser do its native thing there, except on Android,
      // where the editor is almost always composing.
      if (view.composing && !$f18febfa986513b3$var$android) return;
      let data = $f18febfa986513b3$var$brokenClipboardAPI ? null : event.clipboardData;
      let plain = view.input.shiftKey && view.input.lastKeyCode != 45;
      if (data && $f18febfa986513b3$var$doPaste(view, data.getData("text/plain"), data.getData("text/html"), plain, event)) event.preventDefault();
      else $f18febfa986513b3$var$capturePaste(view, event);
  };
  class $f18febfa986513b3$var$Dragging {
      constructor(slice, move){
          this.slice = slice;
          this.move = move;
      }
  }
  const $f18febfa986513b3$var$dragCopyModifier = $f18febfa986513b3$var$mac ? "altKey" : "ctrlKey";
  $f18febfa986513b3$var$handlers.dragstart = (view, _event)=>{
      let event = _event;
      let mouseDown = view.input.mouseDown;
      if (mouseDown) mouseDown.done();
      if (!event.dataTransfer) return;
      let sel = view.state.selection;
      let pos = sel.empty ? null : view.posAtCoords($f18febfa986513b3$var$eventCoords(event));
      if (pos && pos.pos >= sel.from && pos.pos <= (sel instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b) ? sel.to - 1 : sel.to)) ;
      else if (mouseDown && mouseDown.mightDrag) view.dispatch(view.state.tr.setSelection((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(view.state.doc, mouseDown.mightDrag.pos)));
      else if (event.target && event.target.nodeType == 1) {
          let desc = view.docView.nearestDesc(event.target, true);
          if (desc && desc.node.type.spec.draggable && desc != view.docView) view.dispatch(view.state.tr.setSelection((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(view.state.doc, desc.posBefore)));
      }
      let slice = view.state.selection.content(), { dom: dom, text: text } = $f18febfa986513b3$var$serializeForClipboard(view, slice);
      event.dataTransfer.clearData();
      event.dataTransfer.setData($f18febfa986513b3$var$brokenClipboardAPI ? "Text" : "text/html", dom.innerHTML);
      // See https://github.com/ProseMirror/prosemirror/issues/1156
      event.dataTransfer.effectAllowed = "copyMove";
      if (!$f18febfa986513b3$var$brokenClipboardAPI) event.dataTransfer.setData("text/plain", text);
      view.dragging = new $f18febfa986513b3$var$Dragging(slice, !event[$f18febfa986513b3$var$dragCopyModifier]);
  };
  $f18febfa986513b3$var$handlers.dragend = (view)=>{
      let dragging = view.dragging;
      window.setTimeout(()=>{
          if (view.dragging == dragging) view.dragging = null;
      }, 50);
  };
  $f18febfa986513b3$var$editHandlers.dragover = $f18febfa986513b3$var$editHandlers.dragenter = (_, e)=>e.preventDefault();
  $f18febfa986513b3$var$editHandlers.drop = (view, _event)=>{
      let event = _event;
      let dragging = view.dragging;
      view.dragging = null;
      if (!event.dataTransfer) return;
      let eventPos = view.posAtCoords($f18febfa986513b3$var$eventCoords(event));
      if (!eventPos) return;
      let $mouse = view.state.doc.resolve(eventPos.pos);
      let slice = dragging && dragging.slice;
      if (slice) view.someProp("transformPasted", (f)=>{
          slice = f(slice, view);
      });
      else slice = $f18febfa986513b3$var$parseFromClipboard(view, event.dataTransfer.getData($f18febfa986513b3$var$brokenClipboardAPI ? "Text" : "text/plain"), $f18febfa986513b3$var$brokenClipboardAPI ? null : event.dataTransfer.getData("text/html"), false, $mouse);
      let move = !!(dragging && !event[$f18febfa986513b3$var$dragCopyModifier]);
      if (view.someProp("handleDrop", (f)=>f(view, event, slice || (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty, move))) {
          event.preventDefault();
          return;
      }
      if (!slice) return;
      event.preventDefault();
      let insertPos = slice ? (0, $77b6a7383a1cf23c$export$2819d598d048fc9c)(view.state.doc, $mouse.pos, slice) : $mouse.pos;
      if (insertPos == null) insertPos = $mouse.pos;
      let tr = view.state.tr;
      if (move) tr.deleteSelection();
      let pos = tr.mapping.map(insertPos);
      let isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
      let beforeInsert = tr.doc;
      if (isNode) tr.replaceRangeWith(pos, pos, slice.content.firstChild);
      else tr.replaceRange(pos, pos, slice);
      if (tr.doc.eq(beforeInsert)) return;
      let $pos = tr.doc.resolve(pos);
      if (isNode && (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(slice.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild)) tr.setSelection(new (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)($pos));
      else {
          let end = tr.mapping.map(insertPos);
          tr.mapping.maps[tr.mapping.maps.length - 1].forEach((_from, _to, _newFrom, newTo)=>end = newTo);
          tr.setSelection($f18febfa986513b3$var$selectionBetween(view, $pos, tr.doc.resolve(end)));
      }
      view.focus();
      view.dispatch(tr.setMeta("uiEvent", "drop"));
  };
  $f18febfa986513b3$var$handlers.focus = (view)=>{
      view.input.lastFocus = Date.now();
      if (!view.focused) {
          view.domObserver.stop();
          view.dom.classList.add("ProseMirror-focused");
          view.domObserver.start();
          view.focused = true;
          setTimeout(()=>{
              if (view.docView && view.hasFocus() && !view.domObserver.currentSelection.eq(view.domSelectionRange())) $f18febfa986513b3$var$selectionToDOM(view);
          }, 20);
      }
  };
  $f18febfa986513b3$var$handlers.blur = (view, _event)=>{
      let event = _event;
      if (view.focused) {
          view.domObserver.stop();
          view.dom.classList.remove("ProseMirror-focused");
          view.domObserver.start();
          if (event.relatedTarget && view.dom.contains(event.relatedTarget)) view.domObserver.currentSelection.clear();
          view.focused = false;
      }
  };
  $f18febfa986513b3$var$handlers.beforeinput = (view, _event)=>{
      let event = _event;
      // We should probably do more with beforeinput events, but support
      // is so spotty that I'm still waiting to see where they are going.
      // Very specific hack to deal with backspace sometimes failing on
      // Chrome Android when after an uneditable node.
      if ($f18febfa986513b3$var$chrome && $f18febfa986513b3$var$android && event.inputType == "deleteContentBackward") {
          view.domObserver.flushSoon();
          let { domChangeCount: domChangeCount } = view.input;
          setTimeout(()=>{
              if (view.input.domChangeCount != domChangeCount) return; // Event already had some effect
              // This bug tends to close the virtual keyboard, so we refocus
              view.dom.blur();
              view.focus();
              if (view.someProp("handleKeyDown", (f)=>f(view, $f18febfa986513b3$var$keyEvent(8, "Backspace")))) return;
              let { $cursor: $cursor } = view.state.selection;
              // Crude approximation of backspace behavior when no command handled it
              if ($cursor && $cursor.pos > 0) view.dispatch(view.state.tr.delete($cursor.pos - 1, $cursor.pos).scrollIntoView());
          }, 50);
      }
  };
  // Make sure all handlers get registered
  for(let prop in $f18febfa986513b3$var$editHandlers)$f18febfa986513b3$var$handlers[prop] = $f18febfa986513b3$var$editHandlers[prop];
  function $f18febfa986513b3$var$compareObjs(a, b) {
      if (a == b) return true;
      for(let p in a)if (a[p] !== b[p]) return false;
      for(let p in b)if (!(p in a)) return false;
      return true;
  }
  class $f18febfa986513b3$var$WidgetType {
      constructor(toDOM, spec){
          this.toDOM = toDOM;
          this.spec = spec || $f18febfa986513b3$var$noSpec;
          this.side = this.spec.side || 0;
      }
      map(mapping, span, offset, oldOffset) {
          let { pos: pos, deleted: deleted } = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1);
          return deleted ? null : new $f18febfa986513b3$export$10e30b733df217ea(pos - offset, pos - offset, this);
      }
      valid() {
          return true;
      }
      eq(other) {
          return this == other || other instanceof $f18febfa986513b3$var$WidgetType && (this.spec.key && this.spec.key == other.spec.key || this.toDOM == other.toDOM && $f18febfa986513b3$var$compareObjs(this.spec, other.spec));
      }
      destroy(node) {
          if (this.spec.destroy) this.spec.destroy(node);
      }
  }
  class $f18febfa986513b3$var$InlineType {
      constructor(attrs, spec){
          this.attrs = attrs;
          this.spec = spec || $f18febfa986513b3$var$noSpec;
      }
      map(mapping, span, offset, oldOffset) {
          let from = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset;
          let to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset;
          return from >= to ? null : new $f18febfa986513b3$export$10e30b733df217ea(from, to, this);
      }
      valid(_, span) {
          return span.from < span.to;
      }
      eq(other) {
          return this == other || other instanceof $f18febfa986513b3$var$InlineType && $f18febfa986513b3$var$compareObjs(this.attrs, other.attrs) && $f18febfa986513b3$var$compareObjs(this.spec, other.spec);
      }
      static is(span) {
          return span.type instanceof $f18febfa986513b3$var$InlineType;
      }
      destroy() {}
  }
  class $f18febfa986513b3$var$NodeType {
      constructor(attrs, spec){
          this.attrs = attrs;
          this.spec = spec || $f18febfa986513b3$var$noSpec;
      }
      map(mapping, span, offset, oldOffset) {
          let from = mapping.mapResult(span.from + oldOffset, 1);
          if (from.deleted) return null;
          let to = mapping.mapResult(span.to + oldOffset, -1);
          if (to.deleted || to.pos <= from.pos) return null;
          return new $f18febfa986513b3$export$10e30b733df217ea(from.pos - offset, to.pos - offset, this);
      }
      valid(node, span) {
          let { index: index, offset: offset } = node.content.findIndex(span.from), child;
          return offset == span.from && !(child = node.child(index)).isText && offset + child.nodeSize == span.to;
      }
      eq(other) {
          return this == other || other instanceof $f18febfa986513b3$var$NodeType && $f18febfa986513b3$var$compareObjs(this.attrs, other.attrs) && $f18febfa986513b3$var$compareObjs(this.spec, other.spec);
      }
      destroy() {}
  }
  /**
  Decoration objects can be provided to the view through the
  [`decorations` prop](https://prosemirror.net/docs/ref/#view.EditorProps.decorations). They come in
  several variants—see the static members of this class for details.
  */ class $f18febfa986513b3$export$10e30b733df217ea {
      /**
      @internal
      */ constructor(/**
      The start position of the decoration.
      */ from, /**
      The end position. Will be the same as `from` for [widget
      decorations](https://prosemirror.net/docs/ref/#view.Decoration^widget).
      */ to, /**
      @internal
      */ type){
          this.from = from;
          this.to = to;
          this.type = type;
      }
      /**
      @internal
      */ copy(from, to) {
          return new $f18febfa986513b3$export$10e30b733df217ea(from, to, this.type);
      }
      /**
      @internal
      */ eq(other, offset = 0) {
          return this.type.eq(other.type) && this.from + offset == other.from && this.to + offset == other.to;
      }
      /**
      @internal
      */ map(mapping, offset, oldOffset) {
          return this.type.map(mapping, this, offset, oldOffset);
      }
      /**
      Creates a widget decoration, which is a DOM node that's shown in
      the document at the given position. It is recommended that you
      delay rendering the widget by passing a function that will be
      called when the widget is actually drawn in a view, but you can
      also directly pass a DOM node. `getPos` can be used to find the
      widget's current document position.
      */ static widget(pos, toDOM, spec) {
          return new $f18febfa986513b3$export$10e30b733df217ea(pos, pos, new $f18febfa986513b3$var$WidgetType(toDOM, spec));
      }
      /**
      Creates an inline decoration, which adds the given attributes to
      each inline node between `from` and `to`.
      */ static inline(from, to, attrs, spec) {
          return new $f18febfa986513b3$export$10e30b733df217ea(from, to, new $f18febfa986513b3$var$InlineType(attrs, spec));
      }
      /**
      Creates a node decoration. `from` and `to` should point precisely
      before and after a node in the document. That node, and only that
      node, will receive the given attributes.
      */ static node(from, to, attrs, spec) {
          return new $f18febfa986513b3$export$10e30b733df217ea(from, to, new $f18febfa986513b3$var$NodeType(attrs, spec));
      }
      /**
      The spec provided when creating this decoration. Can be useful
      if you've stored extra information in that object.
      */ get spec() {
          return this.type.spec;
      }
      /**
      @internal
      */ get inline() {
          return this.type instanceof $f18febfa986513b3$var$InlineType;
      }
  }
  const $f18febfa986513b3$var$none = [], $f18febfa986513b3$var$noSpec = {};
  /**
  A collection of [decorations](https://prosemirror.net/docs/ref/#view.Decoration), organized in such
  a way that the drawing algorithm can efficiently use and compare
  them. This is a persistent data structure—it is not modified,
  updates create a new value.
  */ class $f18febfa986513b3$export$93bf62eb445cec98 {
      /**
      @internal
      */ constructor(local, children){
          this.local = local.length ? local : $f18febfa986513b3$var$none;
          this.children = children.length ? children : $f18febfa986513b3$var$none;
      }
      /**
      Create a set of decorations, using the structure of the given
      document.
      */ static create(doc, decorations) {
          return decorations.length ? $f18febfa986513b3$var$buildTree(decorations, doc, 0, $f18febfa986513b3$var$noSpec) : $f18febfa986513b3$var$empty;
      }
      /**
      Find all decorations in this set which touch the given range
      (including decorations that start or end directly at the
      boundaries) and match the given predicate on their spec. When
      `start` and `end` are omitted, all decorations in the set are
      considered. When `predicate` isn't given, all decorations are
      assumed to match.
      */ find(start, end, predicate) {
          let result = [];
          this.findInner(start == null ? 0 : start, end == null ? 1e9 : end, result, 0, predicate);
          return result;
      }
      findInner(start, end, result, offset, predicate) {
          for(let i = 0; i < this.local.length; i++){
              let span = this.local[i];
              if (span.from <= end && span.to >= start && (!predicate || predicate(span.spec))) result.push(span.copy(span.from + offset, span.to + offset));
          }
          for(let i = 0; i < this.children.length; i += 3)if (this.children[i] < end && this.children[i + 1] > start) {
              let childOff = this.children[i] + 1;
              this.children[i + 2].findInner(start - childOff, end - childOff, result, offset + childOff, predicate);
          }
      }
      /**
      Map the set of decorations in response to a change in the
      document.
      */ map(mapping, doc, options) {
          if (this == $f18febfa986513b3$var$empty || mapping.maps.length == 0) return this;
          return this.mapInner(mapping, doc, 0, 0, options || $f18febfa986513b3$var$noSpec);
      }
      /**
      @internal
      */ mapInner(mapping, node, offset, oldOffset, options) {
          let newLocal;
          for(let i = 0; i < this.local.length; i++){
              let mapped = this.local[i].map(mapping, offset, oldOffset);
              if (mapped && mapped.type.valid(node, mapped)) (newLocal || (newLocal = [])).push(mapped);
              else if (options.onRemove) options.onRemove(this.local[i].spec);
          }
          if (this.children.length) return $f18febfa986513b3$var$mapChildren(this.children, newLocal || [], mapping, node, offset, oldOffset, options);
          else return newLocal ? new $f18febfa986513b3$export$93bf62eb445cec98(newLocal.sort($f18febfa986513b3$var$byPos), $f18febfa986513b3$var$none) : $f18febfa986513b3$var$empty;
      }
      /**
      Add the given array of decorations to the ones in the set,
      producing a new set. Needs access to the current document to
      create the appropriate tree structure.
      */ add(doc, decorations) {
          if (!decorations.length) return this;
          if (this == $f18febfa986513b3$var$empty) return $f18febfa986513b3$export$93bf62eb445cec98.create(doc, decorations);
          return this.addInner(doc, decorations, 0);
      }
      addInner(doc, decorations, offset) {
          let children, childIndex = 0;
          doc.forEach((childNode, childOffset)=>{
              let baseOffset = childOffset + offset, found;
              if (!(found = $f18febfa986513b3$var$takeSpansForNode(decorations, childNode, baseOffset))) return;
              if (!children) children = this.children.slice();
              while(childIndex < children.length && children[childIndex] < childOffset)childIndex += 3;
              if (children[childIndex] == childOffset) children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found, baseOffset + 1);
              else children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, $f18febfa986513b3$var$buildTree(found, childNode, baseOffset + 1, $f18febfa986513b3$var$noSpec));
              childIndex += 3;
          });
          let local = $f18febfa986513b3$var$moveSpans(childIndex ? $f18febfa986513b3$var$withoutNulls(decorations) : decorations, -offset);
          for(let i = 0; i < local.length; i++)if (!local[i].type.valid(doc, local[i])) local.splice(i--, 1);
          return new $f18febfa986513b3$export$93bf62eb445cec98(local.length ? this.local.concat(local).sort($f18febfa986513b3$var$byPos) : this.local, children || this.children);
      }
      /**
      Create a new set that contains the decorations in this set, minus
      the ones in the given array.
      */ remove(decorations) {
          if (decorations.length == 0 || this == $f18febfa986513b3$var$empty) return this;
          return this.removeInner(decorations, 0);
      }
      removeInner(decorations, offset) {
          let children = this.children, local = this.local;
          for(let i = 0; i < children.length; i += 3){
              let found;
              let from = children[i] + offset, to = children[i + 1] + offset;
              for(let j = 0, span; j < decorations.length; j++)if (span = decorations[j]) {
                  if (span.from > from && span.to < to) {
                      decorations[j] = null;
                      (found || (found = [])).push(span);
                  }
              }
              if (!found) continue;
              if (children == this.children) children = this.children.slice();
              let removed = children[i + 2].removeInner(found, from + 1);
              if (removed != $f18febfa986513b3$var$empty) children[i + 2] = removed;
              else {
                  children.splice(i, 3);
                  i -= 3;
              }
          }
          if (local.length) {
              for(let i = 0, span; i < decorations.length; i++)if (span = decorations[i]) {
                  for(let j = 0; j < local.length; j++)if (local[j].eq(span, offset)) {
                      if (local == this.local) local = this.local.slice();
                      local.splice(j--, 1);
                  }
              }
          }
          if (children == this.children && local == this.local) return this;
          return local.length || children.length ? new $f18febfa986513b3$export$93bf62eb445cec98(local, children) : $f18febfa986513b3$var$empty;
      }
      /**
      @internal
      */ forChild(offset, node) {
          if (this == $f18febfa986513b3$var$empty) return this;
          if (node.isLeaf) return $f18febfa986513b3$export$93bf62eb445cec98.empty;
          let child, local;
          for(let i = 0; i < this.children.length; i += 3)if (this.children[i] >= offset) {
              if (this.children[i] == offset) child = this.children[i + 2];
              break;
          }
          let start = offset + 1, end = start + node.content.size;
          for(let i = 0; i < this.local.length; i++){
              let dec = this.local[i];
              if (dec.from < end && dec.to > start && dec.type instanceof $f18febfa986513b3$var$InlineType) {
                  let from = Math.max(start, dec.from) - start, to = Math.min(end, dec.to) - start;
                  if (from < to) (local || (local = [])).push(dec.copy(from, to));
              }
          }
          if (local) {
              let localSet = new $f18febfa986513b3$export$93bf62eb445cec98(local.sort($f18febfa986513b3$var$byPos), $f18febfa986513b3$var$none);
              return child ? new $f18febfa986513b3$var$DecorationGroup([
                  localSet,
                  child
              ]) : localSet;
          }
          return child || $f18febfa986513b3$var$empty;
      }
      /**
      @internal
      */ eq(other) {
          if (this == other) return true;
          if (!(other instanceof $f18febfa986513b3$export$93bf62eb445cec98) || this.local.length != other.local.length || this.children.length != other.children.length) return false;
          for(let i = 0; i < this.local.length; i++)if (!this.local[i].eq(other.local[i])) return false;
          for(let i = 0; i < this.children.length; i += 3)if (this.children[i] != other.children[i] || this.children[i + 1] != other.children[i + 1] || !this.children[i + 2].eq(other.children[i + 2])) return false;
          return true;
      }
      /**
      @internal
      */ locals(node) {
          return $f18febfa986513b3$var$removeOverlap(this.localsInner(node));
      }
      /**
      @internal
      */ localsInner(node) {
          if (this == $f18febfa986513b3$var$empty) return $f18febfa986513b3$var$none;
          if (node.inlineContent || !this.local.some($f18febfa986513b3$var$InlineType.is)) return this.local;
          let result = [];
          for(let i = 0; i < this.local.length; i++)if (!(this.local[i].type instanceof $f18febfa986513b3$var$InlineType)) result.push(this.local[i]);
          return result;
      }
  }
  /**
  The empty set of decorations.
  */ $f18febfa986513b3$export$93bf62eb445cec98.empty = new $f18febfa986513b3$export$93bf62eb445cec98([], []);
  /**
  @internal
  */ $f18febfa986513b3$export$93bf62eb445cec98.removeOverlap = $f18febfa986513b3$var$removeOverlap;
  const $f18febfa986513b3$var$empty = $f18febfa986513b3$export$93bf62eb445cec98.empty;
  // An abstraction that allows the code dealing with decorations to
  // treat multiple DecorationSet objects as if it were a single object
  // with (a subset of) the same interface.
  class $f18febfa986513b3$var$DecorationGroup {
      constructor(members){
          this.members = members;
      }
      map(mapping, doc) {
          const mappedDecos = this.members.map((member)=>member.map(mapping, doc, $f18febfa986513b3$var$noSpec));
          return $f18febfa986513b3$var$DecorationGroup.from(mappedDecos);
      }
      forChild(offset, child) {
          if (child.isLeaf) return $f18febfa986513b3$export$93bf62eb445cec98.empty;
          let found = [];
          for(let i = 0; i < this.members.length; i++){
              let result = this.members[i].forChild(offset, child);
              if (result == $f18febfa986513b3$var$empty) continue;
              if (result instanceof $f18febfa986513b3$var$DecorationGroup) found = found.concat(result.members);
              else found.push(result);
          }
          return $f18febfa986513b3$var$DecorationGroup.from(found);
      }
      eq(other) {
          if (!(other instanceof $f18febfa986513b3$var$DecorationGroup) || other.members.length != this.members.length) return false;
          for(let i = 0; i < this.members.length; i++)if (!this.members[i].eq(other.members[i])) return false;
          return true;
      }
      locals(node) {
          let result, sorted = true;
          for(let i = 0; i < this.members.length; i++){
              let locals = this.members[i].localsInner(node);
              if (!locals.length) continue;
              if (!result) result = locals;
              else {
                  if (sorted) {
                      result = result.slice();
                      sorted = false;
                  }
                  for(let j = 0; j < locals.length; j++)result.push(locals[j]);
              }
          }
          return result ? $f18febfa986513b3$var$removeOverlap(sorted ? result : result.sort($f18febfa986513b3$var$byPos)) : $f18febfa986513b3$var$none;
      }
      // Create a group for the given array of decoration sets, or return
      // a single set when possible.
      static from(members) {
          switch(members.length){
              case 0:
                  return $f18febfa986513b3$var$empty;
              case 1:
                  return members[0];
              default:
                  return new $f18febfa986513b3$var$DecorationGroup(members.every((m)=>m instanceof $f18febfa986513b3$export$93bf62eb445cec98) ? members : members.reduce((r, m)=>r.concat(m instanceof $f18febfa986513b3$export$93bf62eb445cec98 ? m : m.members), []));
          }
      }
  }
  function $f18febfa986513b3$var$mapChildren(oldChildren, newLocal, mapping, node, offset, oldOffset, options) {
      let children = oldChildren.slice();
      // Mark the children that are directly touched by changes, and
      // move those that are after the changes.
      for(let i = 0, baseOffset = oldOffset; i < mapping.maps.length; i++){
          let moved = 0;
          mapping.maps[i].forEach((oldStart, oldEnd, newStart, newEnd)=>{
              let dSize = newEnd - newStart - (oldEnd - oldStart);
              for(let i = 0; i < children.length; i += 3){
                  let end = children[i + 1];
                  if (end < 0 || oldStart > end + baseOffset - moved) continue;
                  let start = children[i] + baseOffset - moved;
                  if (oldEnd >= start) children[i + 1] = oldStart <= start ? -2 : -1;
                  else if (newStart >= offset && dSize) {
                      children[i] += dSize;
                      children[i + 1] += dSize;
                  }
              }
              moved += dSize;
          });
          baseOffset = mapping.maps[i].map(baseOffset, -1);
      }
      // Find the child nodes that still correspond to a single node,
      // recursively call mapInner on them and update their positions.
      let mustRebuild = false;
      for(let i = 0; i < children.length; i += 3)if (children[i + 1] < 0) {
          if (children[i + 1] == -2) {
              mustRebuild = true;
              children[i + 1] = -1;
              continue;
          }
          let from = mapping.map(oldChildren[i] + oldOffset), fromLocal = from - offset;
          if (fromLocal < 0 || fromLocal >= node.content.size) {
              mustRebuild = true;
              continue;
          }
          // Must read oldChildren because children was tagged with -1
          let to = mapping.map(oldChildren[i + 1] + oldOffset, -1), toLocal = to - offset;
          let { index: index, offset: childOffset } = node.content.findIndex(fromLocal);
          let childNode = node.maybeChild(index);
          if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
              let mapped = children[i + 2].mapInner(mapping, childNode, from + 1, oldChildren[i] + oldOffset + 1, options);
              if (mapped != $f18febfa986513b3$var$empty) {
                  children[i] = fromLocal;
                  children[i + 1] = toLocal;
                  children[i + 2] = mapped;
              } else {
                  children[i + 1] = -2;
                  mustRebuild = true;
              }
          } else mustRebuild = true;
      }
      // Remaining children must be collected and rebuilt into the appropriate structure
      if (mustRebuild) {
          let decorations = $f18febfa986513b3$var$mapAndGatherRemainingDecorations(children, oldChildren, newLocal, mapping, offset, oldOffset, options);
          let built = $f18febfa986513b3$var$buildTree(decorations, node, 0, options);
          newLocal = built.local;
          for(let i = 0; i < children.length; i += 3)if (children[i + 1] < 0) {
              children.splice(i, 3);
              i -= 3;
          }
          for(let i = 0, j = 0; i < built.children.length; i += 3){
              let from = built.children[i];
              while(j < children.length && children[j] < from)j += 3;
              children.splice(j, 0, built.children[i], built.children[i + 1], built.children[i + 2]);
          }
      }
      return new $f18febfa986513b3$export$93bf62eb445cec98(newLocal.sort($f18febfa986513b3$var$byPos), children);
  }
  function $f18febfa986513b3$var$moveSpans(spans, offset) {
      if (!offset || !spans.length) return spans;
      let result = [];
      for(let i = 0; i < spans.length; i++){
          let span = spans[i];
          result.push(new $f18febfa986513b3$export$10e30b733df217ea(span.from + offset, span.to + offset, span.type));
      }
      return result;
  }
  function $f18febfa986513b3$var$mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset, oldOffset, options) {
      // Gather all decorations from the remaining marked children
      function gather(set, oldOffset) {
          for(let i = 0; i < set.local.length; i++){
              let mapped = set.local[i].map(mapping, offset, oldOffset);
              if (mapped) decorations.push(mapped);
              else if (options.onRemove) options.onRemove(set.local[i].spec);
          }
          for(let i = 0; i < set.children.length; i += 3)gather(set.children[i + 2], set.children[i] + oldOffset + 1);
      }
      for(let i = 0; i < children.length; i += 3)if (children[i + 1] == -1) gather(children[i + 2], oldChildren[i] + oldOffset + 1);
      return decorations;
  }
  function $f18febfa986513b3$var$takeSpansForNode(spans, node, offset) {
      if (node.isLeaf) return null;
      let end = offset + node.nodeSize, found = null;
      for(let i = 0, span; i < spans.length; i++)if ((span = spans[i]) && span.from > offset && span.to < end) {
          (found || (found = [])).push(span);
          spans[i] = null;
      }
      return found;
  }
  function $f18febfa986513b3$var$withoutNulls(array) {
      let result = [];
      for(let i = 0; i < array.length; i++)if (array[i] != null) result.push(array[i]);
      return result;
  }
  // Build up a tree that corresponds to a set of decorations. `offset`
  // is a base offset that should be subtracted from the `from` and `to`
  // positions in the spans (so that we don't have to allocate new spans
  // for recursive calls).
  function $f18febfa986513b3$var$buildTree(spans, node, offset, options) {
      let children = [], hasNulls = false;
      node.forEach((childNode, localStart)=>{
          let found = $f18febfa986513b3$var$takeSpansForNode(spans, childNode, localStart + offset);
          if (found) {
              hasNulls = true;
              let subtree = $f18febfa986513b3$var$buildTree(found, childNode, offset + localStart + 1, options);
              if (subtree != $f18febfa986513b3$var$empty) children.push(localStart, localStart + childNode.nodeSize, subtree);
          }
      });
      let locals = $f18febfa986513b3$var$moveSpans(hasNulls ? $f18febfa986513b3$var$withoutNulls(spans) : spans, -offset).sort($f18febfa986513b3$var$byPos);
      for(let i = 0; i < locals.length; i++)if (!locals[i].type.valid(node, locals[i])) {
          if (options.onRemove) options.onRemove(locals[i].spec);
          locals.splice(i--, 1);
      }
      return locals.length || children.length ? new $f18febfa986513b3$export$93bf62eb445cec98(locals, children) : $f18febfa986513b3$var$empty;
  }
  // Used to sort decorations so that ones with a low start position
  // come first, and within a set with the same start position, those
  // with an smaller end position come first.
  function $f18febfa986513b3$var$byPos(a, b) {
      return a.from - b.from || a.to - b.to;
  }
  // Scan a sorted array of decorations for partially overlapping spans,
  // and split those so that only fully overlapping spans are left (to
  // make subsequent rendering easier). Will return the input array if
  // no partially overlapping spans are found (the common case).
  function $f18febfa986513b3$var$removeOverlap(spans) {
      let working = spans;
      for(let i = 0; i < working.length - 1; i++){
          let span = working[i];
          if (span.from != span.to) for(let j = i + 1; j < working.length; j++){
              let next = working[j];
              if (next.from == span.from) {
                  if (next.to != span.to) {
                      if (working == spans) working = spans.slice();
                      // Followed by a partially overlapping larger span. Split that
                      // span.
                      working[j] = next.copy(next.from, span.to);
                      $f18febfa986513b3$var$insertAhead(working, j + 1, next.copy(span.to, next.to));
                  }
                  continue;
              } else {
                  if (next.from < span.to) {
                      if (working == spans) working = spans.slice();
                      // The end of this one overlaps with a subsequent span. Split
                      // this one.
                      working[i] = span.copy(span.from, next.from);
                      $f18febfa986513b3$var$insertAhead(working, j, span.copy(next.from, span.to));
                  }
                  break;
              }
          }
      }
      return working;
  }
  function $f18febfa986513b3$var$insertAhead(array, i, deco) {
      while(i < array.length && $f18febfa986513b3$var$byPos(deco, array[i]) > 0)i++;
      array.splice(i, 0, deco);
  }
  // Get the decorations associated with the current props of a view.
  function $f18febfa986513b3$var$viewDecorations(view) {
      let found = [];
      view.someProp("decorations", (f)=>{
          let result = f(view.state);
          if (result && result != $f18febfa986513b3$var$empty) found.push(result);
      });
      if (view.cursorWrapper) found.push($f18febfa986513b3$export$93bf62eb445cec98.create(view.state.doc, [
          view.cursorWrapper.deco
      ]));
      return $f18febfa986513b3$var$DecorationGroup.from(found);
  }
  const $f18febfa986513b3$var$observeOptions = {
      childList: true,
      characterData: true,
      characterDataOldValue: true,
      attributes: true,
      attributeOldValue: true,
      subtree: true
  };
  // IE11 has very broken mutation observers, so we also listen to DOMCharacterDataModified
  const $f18febfa986513b3$var$useCharData = $f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11;
  class $f18febfa986513b3$var$SelectionState {
      constructor(){
          this.anchorNode = null;
          this.anchorOffset = 0;
          this.focusNode = null;
          this.focusOffset = 0;
      }
      set(sel) {
          this.anchorNode = sel.anchorNode;
          this.anchorOffset = sel.anchorOffset;
          this.focusNode = sel.focusNode;
          this.focusOffset = sel.focusOffset;
      }
      clear() {
          this.anchorNode = this.focusNode = null;
      }
      eq(sel) {
          return sel.anchorNode == this.anchorNode && sel.anchorOffset == this.anchorOffset && sel.focusNode == this.focusNode && sel.focusOffset == this.focusOffset;
      }
  }
  class $f18febfa986513b3$var$DOMObserver {
      constructor(view, handleDOMChange){
          this.view = view;
          this.handleDOMChange = handleDOMChange;
          this.queue = [];
          this.flushingSoon = -1;
          this.observer = null;
          this.currentSelection = new $f18febfa986513b3$var$SelectionState;
          this.onCharData = null;
          this.suppressingSelectionUpdates = false;
          this.observer = window.MutationObserver && new window.MutationObserver((mutations)=>{
              for(let i = 0; i < mutations.length; i++)this.queue.push(mutations[i]);
              // IE11 will sometimes (on backspacing out a single character
              // text node after a BR node) call the observer callback
              // before actually updating the DOM, which will cause
              // ProseMirror to miss the change (see #930)
              if ($f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11 && mutations.some((m)=>m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length)) this.flushSoon();
              else this.flush();
          });
          if ($f18febfa986513b3$var$useCharData) this.onCharData = (e)=>{
              this.queue.push({
                  target: e.target,
                  type: "characterData",
                  oldValue: e.prevValue
              });
              this.flushSoon();
          };
          this.onSelectionChange = this.onSelectionChange.bind(this);
      }
      flushSoon() {
          if (this.flushingSoon < 0) this.flushingSoon = window.setTimeout(()=>{
              this.flushingSoon = -1;
              this.flush();
          }, 20);
      }
      forceFlush() {
          if (this.flushingSoon > -1) {
              window.clearTimeout(this.flushingSoon);
              this.flushingSoon = -1;
              this.flush();
          }
      }
      start() {
          if (this.observer) {
              this.observer.takeRecords();
              this.observer.observe(this.view.dom, $f18febfa986513b3$var$observeOptions);
          }
          if (this.onCharData) this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
          this.connectSelection();
      }
      stop() {
          if (this.observer) {
              let take = this.observer.takeRecords();
              if (take.length) {
                  for(let i = 0; i < take.length; i++)this.queue.push(take[i]);
                  window.setTimeout(()=>this.flush(), 20);
              }
              this.observer.disconnect();
          }
          if (this.onCharData) this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
          this.disconnectSelection();
      }
      connectSelection() {
          this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
      }
      disconnectSelection() {
          this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
      }
      suppressSelectionUpdates() {
          this.suppressingSelectionUpdates = true;
          setTimeout(()=>this.suppressingSelectionUpdates = false, 50);
      }
      onSelectionChange() {
          if (!$f18febfa986513b3$var$hasFocusAndSelection(this.view)) return;
          if (this.suppressingSelectionUpdates) return $f18febfa986513b3$var$selectionToDOM(this.view);
          // Deletions on IE11 fire their events in the wrong order, giving
          // us a selection change event before the DOM changes are
          // reported.
          if ($f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11 && !this.view.state.selection.empty) {
              let sel = this.view.domSelectionRange();
              // Selection.isCollapsed isn't reliable on IE
              if (sel.focusNode && $f18febfa986513b3$var$isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)) return this.flushSoon();
          }
          this.flush();
      }
      setCurSelection() {
          this.currentSelection.set(this.view.domSelectionRange());
      }
      ignoreSelectionChange(sel) {
          if (!sel.focusNode) return true;
          let ancestors = new Set, container;
          for(let scan = sel.focusNode; scan; scan = $f18febfa986513b3$var$parentNode(scan))ancestors.add(scan);
          for(let scan = sel.anchorNode; scan; scan = $f18febfa986513b3$var$parentNode(scan))if (ancestors.has(scan)) {
              container = scan;
              break;
          }
          let desc = container && this.view.docView.nearestDesc(container);
          if (desc && desc.ignoreMutation({
              type: "selection",
              target: container.nodeType == 3 ? container.parentNode : container
          })) {
              this.setCurSelection();
              return true;
          }
      }
      pendingRecords() {
          if (this.observer) for (let mut of this.observer.takeRecords())this.queue.push(mut);
          return this.queue;
      }
      flush() {
          let { view: view } = this;
          if (!view.docView || this.flushingSoon > -1) return;
          let mutations = this.pendingRecords();
          if (mutations.length) this.queue = [];
          let sel = view.domSelectionRange();
          let newSel = !this.suppressingSelectionUpdates && !this.currentSelection.eq(sel) && $f18febfa986513b3$var$hasFocusAndSelection(view) && !this.ignoreSelectionChange(sel);
          let from = -1, to = -1, typeOver = false, added = [];
          if (view.editable) for(let i = 0; i < mutations.length; i++){
              let result = this.registerMutation(mutations[i], added);
              if (result) {
                  from = from < 0 ? result.from : Math.min(result.from, from);
                  to = to < 0 ? result.to : Math.max(result.to, to);
                  if (result.typeOver) typeOver = true;
              }
          }
          if ($f18febfa986513b3$var$gecko && added.length > 1) {
              let brs = added.filter((n)=>n.nodeName == "BR");
              if (brs.length == 2) {
                  let a = brs[0], b = brs[1];
                  if (a.parentNode && a.parentNode.parentNode == b.parentNode) b.remove();
                  else a.remove();
              }
          }
          let readSel = null;
          // If it looks like the browser has reset the selection to the
          // start of the document after focus, restore the selection from
          // the state
          if (from < 0 && newSel && view.input.lastFocus > Date.now() - 200 && Math.max(view.input.lastTouch, view.input.lastClick.time) < Date.now() - 300 && $f18febfa986513b3$var$selectionCollapsed(sel) && (readSel = $f18febfa986513b3$var$selectionFromDOM(view)) && readSel.eq((0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near(view.state.doc.resolve(0), 1))) {
              view.input.lastFocus = 0;
              $f18febfa986513b3$var$selectionToDOM(view);
              this.currentSelection.set(sel);
              view.scrollToSelection();
          } else if (from > -1 || newSel) {
              if (from > -1) {
                  view.docView.markDirty(from, to);
                  $f18febfa986513b3$var$checkCSS(view);
              }
              this.handleDOMChange(from, to, typeOver, added);
              if (view.docView && view.docView.dirty) view.updateState(view.state);
              else if (!this.currentSelection.eq(sel)) $f18febfa986513b3$var$selectionToDOM(view);
              this.currentSelection.set(sel);
          }
      }
      registerMutation(mut, added) {
          // Ignore mutations inside nodes that were already noted as inserted
          if (added.indexOf(mut.target) > -1) return null;
          let desc = this.view.docView.nearestDesc(mut.target);
          if (mut.type == "attributes" && (desc == this.view.docView || mut.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
          mut.attributeName == "style" && !mut.oldValue && !mut.target.getAttribute("style"))) return null;
          if (!desc || desc.ignoreMutation(mut)) return null;
          if (mut.type == "childList") {
              for(let i = 0; i < mut.addedNodes.length; i++)added.push(mut.addedNodes[i]);
              if (desc.contentDOM && desc.contentDOM != desc.dom && !desc.contentDOM.contains(mut.target)) return {
                  from: desc.posBefore,
                  to: desc.posAfter
              };
              let prev = mut.previousSibling, next = mut.nextSibling;
              if ($f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11 && mut.addedNodes.length) // IE11 gives us incorrect next/prev siblings for some
              // insertions, so if there are added nodes, recompute those
              for(let i = 0; i < mut.addedNodes.length; i++){
                  let { previousSibling: previousSibling, nextSibling: nextSibling } = mut.addedNodes[i];
                  if (!previousSibling || Array.prototype.indexOf.call(mut.addedNodes, previousSibling) < 0) prev = previousSibling;
                  if (!nextSibling || Array.prototype.indexOf.call(mut.addedNodes, nextSibling) < 0) next = nextSibling;
              }
              let fromOffset = prev && prev.parentNode == mut.target ? $f18febfa986513b3$var$domIndex(prev) + 1 : 0;
              let from = desc.localPosFromDOM(mut.target, fromOffset, -1);
              let toOffset = next && next.parentNode == mut.target ? $f18febfa986513b3$var$domIndex(next) : mut.target.childNodes.length;
              let to = desc.localPosFromDOM(mut.target, toOffset, 1);
              return {
                  from: from,
                  to: to
              };
          } else if (mut.type == "attributes") return {
              from: desc.posAtStart - desc.border,
              to: desc.posAtEnd + desc.border
          };
          else return {
              from: desc.posAtStart,
              to: desc.posAtEnd,
              // An event was generated for a text change that didn't change
              // any text. Mark the dom change to fall back to assuming the
              // selection was typed over with an identical value if it can't
              // find another change.
              typeOver: mut.target.nodeValue == mut.oldValue
          };
      }
  }
  let $f18febfa986513b3$var$cssChecked = new WeakMap();
  let $f18febfa986513b3$var$cssCheckWarned = false;
  function $f18febfa986513b3$var$checkCSS(view) {
      if ($f18febfa986513b3$var$cssChecked.has(view)) return;
      $f18febfa986513b3$var$cssChecked.set(view, null);
      if ([
          "normal",
          "nowrap",
          "pre-line"
      ].indexOf(getComputedStyle(view.dom).whiteSpace) !== -1) {
          view.requiresGeckoHackNode = $f18febfa986513b3$var$gecko;
          if ($f18febfa986513b3$var$cssCheckWarned) return;
          console["warn"]("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.");
          $f18febfa986513b3$var$cssCheckWarned = true;
      }
  }
  // Used to work around a Safari Selection/shadow DOM bug
  // Based on https://github.com/codemirror/dev/issues/414 fix
  function $f18febfa986513b3$var$safariShadowSelectionRange(view) {
      let found;
      function read(event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          found = event.getTargetRanges()[0];
      }
      // Because Safari (at least in 2018-2022) doesn't provide regular
      // access to the selection inside a shadowRoot, we have to perform a
      // ridiculous hack to get at it—using `execCommand` to trigger a
      // `beforeInput` event so that we can read the target range from the
      // event.
      view.dom.addEventListener("beforeinput", read, true);
      document.execCommand("indent");
      view.dom.removeEventListener("beforeinput", read, true);
      let anchorNode = found.startContainer, anchorOffset = found.startOffset;
      let focusNode = found.endContainer, focusOffset = found.endOffset;
      let currentAnchor = view.domAtPos(view.state.selection.anchor);
      // Since such a range doesn't distinguish between anchor and head,
      // use a heuristic that flips it around if its end matches the
      // current anchor.
      if ($f18febfa986513b3$var$isEquivalentPosition(currentAnchor.node, currentAnchor.offset, focusNode, focusOffset)) [anchorNode, anchorOffset, focusNode, focusOffset] = [
          focusNode,
          focusOffset,
          anchorNode,
          anchorOffset
      ];
      return {
          anchorNode: anchorNode,
          anchorOffset: anchorOffset,
          focusNode: focusNode,
          focusOffset: focusOffset
      };
  }
  // Note that all referencing and parsing is done with the
  // start-of-operation selection and document, since that's the one
  // that the DOM represents. If any changes came in in the meantime,
  // the modification is mapped over those before it is applied, in
  // readDOMChange.
  function $f18febfa986513b3$var$parseBetween(view, from_, to_) {
      let { node: parent, fromOffset: fromOffset, toOffset: toOffset, from: from, to: to } = view.docView.parseRange(from_, to_);
      let domSel = view.domSelectionRange();
      let find;
      let anchor = domSel.anchorNode;
      if (anchor && view.dom.contains(anchor.nodeType == 1 ? anchor : anchor.parentNode)) {
          find = [
              {
                  node: anchor,
                  offset: domSel.anchorOffset
              }
          ];
          if (!$f18febfa986513b3$var$selectionCollapsed(domSel)) find.push({
              node: domSel.focusNode,
              offset: domSel.focusOffset
          });
      }
      // Work around issue in Chrome where backspacing sometimes replaces
      // the deleted content with a random BR node (issues #799, #831)
      if ($f18febfa986513b3$var$chrome && view.input.lastKeyCode === 8) for(let off = toOffset; off > fromOffset; off--){
          let node = parent.childNodes[off - 1], desc = node.pmViewDesc;
          if (node.nodeName == "BR" && !desc) {
              toOffset = off;
              break;
          }
          if (!desc || desc.size) break;
      }
      let startDoc = view.state.doc;
      let parser = view.someProp("domParser") || (0, $59526ec4d3b41406$export$1059c6e7d2ce5669).fromSchema(view.state.schema);
      let $from = startDoc.resolve(from);
      let sel = null, doc = parser.parse(parent, {
          topNode: $from.parent,
          topMatch: $from.parent.contentMatchAt($from.index()),
          topOpen: true,
          from: fromOffset,
          to: toOffset,
          preserveWhitespace: $from.parent.type.whitespace == "pre" ? "full" : true,
          findPositions: find,
          ruleFromNode: $f18febfa986513b3$var$ruleFromNode,
          context: $from
      });
      if (find && find[0].pos != null) {
          let anchor = find[0].pos, head = find[1] && find[1].pos;
          if (head == null) head = anchor;
          sel = {
              anchor: anchor + from,
              head: head + from
          };
      }
      return {
          doc: doc,
          sel: sel,
          from: from,
          to: to
      };
  }
  function $f18febfa986513b3$var$ruleFromNode(dom) {
      let desc = dom.pmViewDesc;
      if (desc) return desc.parseRule();
      else if (dom.nodeName == "BR" && dom.parentNode) {
          // Safari replaces the list item or table cell with a BR
          // directly in the list node (?!) if you delete the last
          // character in a list item or table cell (#708, #862)
          if ($f18febfa986513b3$var$safari && /^(ul|ol)$/i.test(dom.parentNode.nodeName)) {
              let skip = document.createElement("div");
              skip.appendChild(document.createElement("li"));
              return {
                  skip: skip
              };
          } else if (dom.parentNode.lastChild == dom || $f18febfa986513b3$var$safari && /^(tr|table)$/i.test(dom.parentNode.nodeName)) return {
              ignore: true
          };
      } else if (dom.nodeName == "IMG" && dom.getAttribute("mark-placeholder")) return {
          ignore: true
      };
      return null;
  }
  const $f18febfa986513b3$var$isInline = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
  function $f18febfa986513b3$var$readDOMChange(view, from, to, typeOver, addedNodes) {
      let compositionID = view.input.compositionPendingChanges || (view.composing ? view.input.compositionID : 0);
      view.input.compositionPendingChanges = 0;
      if (from < 0) {
          let origin = view.input.lastSelectionTime > Date.now() - 50 ? view.input.lastSelectionOrigin : null;
          let newSel = $f18febfa986513b3$var$selectionFromDOM(view, origin);
          if (newSel && !view.state.selection.eq(newSel)) {
              if ($f18febfa986513b3$var$chrome && $f18febfa986513b3$var$android && view.input.lastKeyCode === 13 && Date.now() - 100 < view.input.lastKeyCodeTime && view.someProp("handleKeyDown", (f)=>f(view, $f18febfa986513b3$var$keyEvent(13, "Enter")))) return;
              let tr = view.state.tr.setSelection(newSel);
              if (origin == "pointer") tr.setMeta("pointer", true);
              else if (origin == "key") tr.scrollIntoView();
              if (compositionID) tr.setMeta("composition", compositionID);
              view.dispatch(tr);
          }
          return;
      }
      let $before = view.state.doc.resolve(from);
      let shared = $before.sharedDepth(to);
      from = $before.before(shared + 1);
      to = view.state.doc.resolve(to).after(shared + 1);
      let sel = view.state.selection;
      let parse = $f18febfa986513b3$var$parseBetween(view, from, to);
      let doc = view.state.doc, compare = doc.slice(parse.from, parse.to);
      let preferredPos, preferredSide;
      // Prefer anchoring to end when Backspace is pressed
      if (view.input.lastKeyCode === 8 && Date.now() - 100 < view.input.lastKeyCodeTime) {
          preferredPos = view.state.selection.to;
          preferredSide = "end";
      } else {
          preferredPos = view.state.selection.from;
          preferredSide = "start";
      }
      view.input.lastKeyCode = null;
      let change = $f18febfa986513b3$var$findDiff(compare.content, parse.doc.content, parse.from, preferredPos, preferredSide);
      if (($f18febfa986513b3$var$ios && view.input.lastIOSEnter > Date.now() - 225 || $f18febfa986513b3$var$android) && addedNodes.some((n)=>n.nodeType == 1 && !$f18febfa986513b3$var$isInline.test(n.nodeName)) && (!change || change.endA >= change.endB) && view.someProp("handleKeyDown", (f)=>f(view, $f18febfa986513b3$var$keyEvent(13, "Enter")))) {
          view.input.lastIOSEnter = 0;
          return;
      }
      if (!change) {
          if (typeOver && sel instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb) && !sel.empty && sel.$head.sameParent(sel.$anchor) && !view.composing && !(parse.sel && parse.sel.anchor != parse.sel.head)) change = {
              start: sel.from,
              endA: sel.to,
              endB: sel.to
          };
          else {
              if (parse.sel) {
                  let sel = $f18febfa986513b3$var$resolveSelection(view, view.state.doc, parse.sel);
                  if (sel && !sel.eq(view.state.selection)) {
                      let tr = view.state.tr.setSelection(sel);
                      if (compositionID) tr.setMeta("composition", compositionID);
                      view.dispatch(tr);
                  }
              }
              return;
          }
      }
      // Chrome sometimes leaves the cursor before the inserted text when
      // composing after a cursor wrapper. This moves it forward.
      if ($f18febfa986513b3$var$chrome && view.cursorWrapper && parse.sel && parse.sel.anchor == view.cursorWrapper.deco.from && parse.sel.head == parse.sel.anchor) {
          let size = change.endB - change.start;
          parse.sel = {
              anchor: parse.sel.anchor + size,
              head: parse.sel.anchor + size
          };
      }
      view.input.domChangeCount++;
      // Handle the case where overwriting a selection by typing matches
      // the start or end of the selected content, creating a change
      // that's smaller than what was actually overwritten.
      if (view.state.selection.from < view.state.selection.to && change.start == change.endB && view.state.selection instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)) {
          if (change.start > view.state.selection.from && change.start <= view.state.selection.from + 2 && view.state.selection.from >= parse.from) change.start = view.state.selection.from;
          else if (change.endA < view.state.selection.to && change.endA >= view.state.selection.to - 2 && view.state.selection.to <= parse.to) {
              change.endB += view.state.selection.to - change.endA;
              change.endA = view.state.selection.to;
          }
      }
      // IE11 will insert a non-breaking space _ahead_ of the space after
      // the cursor space when adding a space before another space. When
      // that happened, adjust the change to cover the space instead.
      if ($f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11 && change.endB == change.start + 1 && change.endA == change.start && change.start > parse.from && parse.doc.textBetween(change.start - parse.from - 1, change.start - parse.from + 1) == " \xa0") {
          change.start--;
          change.endA--;
          change.endB--;
      }
      let $from = parse.doc.resolveNoCache(change.start - parse.from);
      let $to = parse.doc.resolveNoCache(change.endB - parse.from);
      let $fromA = doc.resolve(change.start);
      let inlineChange = $from.sameParent($to) && $from.parent.inlineContent && $fromA.end() >= change.endA;
      let nextSel;
      // If this looks like the effect of pressing Enter (or was recorded
      // as being an iOS enter press), just dispatch an Enter key instead.
      if (($f18febfa986513b3$var$ios && view.input.lastIOSEnter > Date.now() - 225 && (!inlineChange || addedNodes.some((n)=>n.nodeName == "DIV" || n.nodeName == "P")) || !inlineChange && $from.pos < parse.doc.content.size && !$from.sameParent($to) && (nextSel = (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).findFrom(parse.doc.resolve($from.pos + 1), 1, true)) && nextSel.head == $to.pos) && view.someProp("handleKeyDown", (f)=>f(view, $f18febfa986513b3$var$keyEvent(13, "Enter")))) {
          view.input.lastIOSEnter = 0;
          return;
      }
      // Same for backspace
      if (view.state.selection.anchor > change.start && $f18febfa986513b3$var$looksLikeJoin(doc, change.start, change.endA, $from, $to) && view.someProp("handleKeyDown", (f)=>f(view, $f18febfa986513b3$var$keyEvent(8, "Backspace")))) {
          if ($f18febfa986513b3$var$android && $f18febfa986513b3$var$chrome) view.domObserver.suppressSelectionUpdates(); // #820
          return;
      }
      // Chrome Android will occasionally, during composition, delete the
      // entire composition and then immediately insert it again. This is
      // used to detect that situation.
      if ($f18febfa986513b3$var$chrome && $f18febfa986513b3$var$android && change.endB == change.start) view.input.lastAndroidDelete = Date.now();
      // This tries to detect Android virtual keyboard
      // enter-and-pick-suggestion action. That sometimes (see issue
      // #1059) first fires a DOM mutation, before moving the selection to
      // the newly created block. And then, because ProseMirror cleans up
      // the DOM selection, it gives up moving the selection entirely,
      // leaving the cursor in the wrong place. When that happens, we drop
      // the new paragraph from the initial change, and fire a simulated
      // enter key afterwards.
      if ($f18febfa986513b3$var$android && !inlineChange && $from.start() != $to.start() && $to.parentOffset == 0 && $from.depth == $to.depth && parse.sel && parse.sel.anchor == parse.sel.head && parse.sel.head == change.endA) {
          change.endB -= 2;
          $to = parse.doc.resolveNoCache(change.endB - parse.from);
          setTimeout(()=>{
              view.someProp("handleKeyDown", function(f) {
                  return f(view, $f18febfa986513b3$var$keyEvent(13, "Enter"));
              });
          }, 20);
      }
      let chFrom = change.start, chTo = change.endA;
      let tr, storedMarks, markChange;
      if (inlineChange) {
          if ($from.pos == $to.pos) {
              // IE11 sometimes weirdly moves the DOM selection around after
              // backspacing out the first element in a textblock
              if ($f18febfa986513b3$var$ie && $f18febfa986513b3$var$ie_version <= 11 && $from.parentOffset == 0) {
                  view.domObserver.suppressSelectionUpdates();
                  setTimeout(()=>$f18febfa986513b3$var$selectionToDOM(view), 20);
              }
              tr = view.state.tr.delete(chFrom, chTo);
              storedMarks = doc.resolve(change.start).marksAcross(doc.resolve(change.endA));
          } else if (change.endA == change.endB && (markChange = $f18febfa986513b3$var$isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset), $fromA.parent.content.cut($fromA.parentOffset, change.endA - $fromA.start())))) {
              tr = view.state.tr;
              if (markChange.type == "add") tr.addMark(chFrom, chTo, markChange.mark);
              else tr.removeMark(chFrom, chTo, markChange.mark);
          } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
              // Both positions in the same text node -- simply insert text
              let text = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
              if (view.someProp("handleTextInput", (f)=>f(view, chFrom, chTo, text))) return;
              tr = view.state.tr.insertText(text, chFrom, chTo);
          }
      }
      if (!tr) tr = view.state.tr.replace(chFrom, chTo, parse.doc.slice(change.start - parse.from, change.endB - parse.from));
      if (parse.sel) {
          let sel = $f18febfa986513b3$var$resolveSelection(view, tr.doc, parse.sel);
          // Chrome Android will sometimes, during composition, report the
          // selection in the wrong place. If it looks like that is
          // happening, don't update the selection.
          // Edge just doesn't move the cursor forward when you start typing
          // in an empty block or between br nodes.
          if (sel && !($f18febfa986513b3$var$chrome && $f18febfa986513b3$var$android && view.composing && sel.empty && (change.start != change.endB || view.input.lastAndroidDelete < Date.now() - 100) && (sel.head == chFrom || sel.head == tr.mapping.map(chTo) - 1) || $f18febfa986513b3$var$ie && sel.empty && sel.head == chFrom)) tr.setSelection(sel);
      }
      if (storedMarks) tr.ensureMarks(storedMarks);
      if (compositionID) tr.setMeta("composition", compositionID);
      view.dispatch(tr.scrollIntoView());
  }
  function $f18febfa986513b3$var$resolveSelection(view, doc, parsedSel) {
      if (Math.max(parsedSel.anchor, parsedSel.head) > doc.content.size) return null;
      return $f18febfa986513b3$var$selectionBetween(view, doc.resolve(parsedSel.anchor), doc.resolve(parsedSel.head));
  }
  // Given two same-length, non-empty fragments of inline content,
  // determine whether the first could be created from the second by
  // removing or adding a single mark type.
  function $f18febfa986513b3$var$isMarkChange(cur, prev) {
      let curMarks = cur.firstChild.marks, prevMarks = prev.firstChild.marks;
      let added = curMarks, removed = prevMarks, type, mark, update;
      for(let i = 0; i < prevMarks.length; i++)added = prevMarks[i].removeFromSet(added);
      for(let i = 0; i < curMarks.length; i++)removed = curMarks[i].removeFromSet(removed);
      if (added.length == 1 && removed.length == 0) {
          mark = added[0];
          type = "add";
          update = (node)=>node.mark(mark.addToSet(node.marks));
      } else if (added.length == 0 && removed.length == 1) {
          mark = removed[0];
          type = "remove";
          update = (node)=>node.mark(mark.removeFromSet(node.marks));
      } else return null;
      let updated = [];
      for(let i = 0; i < prev.childCount; i++)updated.push(update(prev.child(i)));
      if ((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(updated).eq(cur)) return {
          mark: mark,
          type: type
      };
  }
  function $f18febfa986513b3$var$looksLikeJoin(old, start, end, $newStart, $newEnd) {
      if (!$newStart.parent.isTextblock || // The content must have shrunk
      end - start <= $newEnd.pos - $newStart.pos || // newEnd must point directly at or after the end of the block that newStart points into
      $f18febfa986513b3$var$skipClosingAndOpening($newStart, true, false) < $newEnd.pos) return false;
      let $start = old.resolve(start);
      // Start must be at the end of a block
      if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock) return false;
      let $next = old.resolve($f18febfa986513b3$var$skipClosingAndOpening($start, true, true));
      // The next textblock must start before end and end near it
      if (!$next.parent.isTextblock || $next.pos > end || $f18febfa986513b3$var$skipClosingAndOpening($next, true, false) < end) return false;
      // The fragments after the join point must match
      return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content);
  }
  function $f18febfa986513b3$var$skipClosingAndOpening($pos, fromEnd, mayOpen) {
      let depth = $pos.depth, end = fromEnd ? $pos.end() : $pos.pos;
      while(depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)){
          depth--;
          end++;
          fromEnd = false;
      }
      if (mayOpen) {
          let next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
          while(next && !next.isLeaf){
              next = next.firstChild;
              end++;
          }
      }
      return end;
  }
  function $f18febfa986513b3$var$findDiff(a, b, pos, preferredPos, preferredSide) {
      let start = a.findDiffStart(b, pos);
      if (start == null) return null;
      let { a: endA, b: endB } = a.findDiffEnd(b, pos + a.size, pos + b.size);
      if (preferredSide == "end") {
          let adjust = Math.max(0, start - Math.min(endA, endB));
          preferredPos -= endA + adjust - start;
      }
      if (endA < start && a.size < b.size) {
          let move = preferredPos <= start && preferredPos >= endA ? start - preferredPos : 0;
          start -= move;
          endB = start + (endB - endA);
          endA = start;
      } else if (endB < start) {
          let move = preferredPos <= start && preferredPos >= endB ? start - preferredPos : 0;
          start -= move;
          endA = start + (endA - endB);
          endB = start;
      }
      return {
          start: start,
          endA: endA,
          endB: endB
      };
  }
  /**
  @internal
  */ const $f18febfa986513b3$export$38b79e3fdcfcfd68 = $f18febfa986513b3$var$serializeForClipboard;
  /**
  @internal
  */ const $f18febfa986513b3$export$5d42ca91c11c9e4d = $f18febfa986513b3$var$parseFromClipboard;
  /**
  @internal
  */ const $f18febfa986513b3$export$76b14d3c719c32fc = $f18febfa986513b3$var$endComposition;
  /**
  An editor view manages the DOM structure that represents an
  editable document. Its state and behavior are determined by its
  [props](https://prosemirror.net/docs/ref/#view.DirectEditorProps).
  */ class $f18febfa986513b3$export$eece2fccabbb77c5 {
      /**
      Create a view. `place` may be a DOM node that the editor should
      be appended to, a function that will place it into the document,
      or an object whose `mount` property holds the node to use as the
      document container. If it is `null`, the editor will not be
      added to the document.
      */ constructor(place, props){
          this._root = null;
          /**
          @internal
          */ this.focused = false;
          /**
          Kludge used to work around a Chrome bug @internal
          */ this.trackWrites = null;
          this.mounted = false;
          /**
          @internal
          */ this.markCursor = null;
          /**
          @internal
          */ this.cursorWrapper = null;
          /**
          @internal
          */ this.lastSelectedViewDesc = undefined;
          /**
          @internal
          */ this.input = new $f18febfa986513b3$var$InputState;
          this.prevDirectPlugins = [];
          this.pluginViews = [];
          /**
          Holds `true` when a hack node is needed in Firefox to prevent the
          [space is eaten issue](https://github.com/ProseMirror/prosemirror/issues/651)
          @internal
          */ this.requiresGeckoHackNode = false;
          /**
          When editor content is being dragged, this object contains
          information about the dragged slice and whether it is being
          copied or moved. At any other time, it is null.
          */ this.dragging = null;
          this._props = props;
          this.state = props.state;
          this.directPlugins = props.plugins || [];
          this.directPlugins.forEach($f18febfa986513b3$var$checkStateComponent);
          this.dispatch = this.dispatch.bind(this);
          this.dom = place && place.mount || document.createElement("div");
          if (place) {
              if (place.appendChild) place.appendChild(this.dom);
              else if (typeof place == "function") place(this.dom);
              else if (place.mount) this.mounted = true;
          }
          this.editable = $f18febfa986513b3$var$getEditable(this);
          $f18febfa986513b3$var$updateCursorWrapper(this);
          this.nodeViews = $f18febfa986513b3$var$buildNodeViews(this);
          this.docView = $f18febfa986513b3$var$docViewDesc(this.state.doc, $f18febfa986513b3$var$computeDocDeco(this), $f18febfa986513b3$var$viewDecorations(this), this.dom, this);
          this.domObserver = new $f18febfa986513b3$var$DOMObserver(this, (from, to, typeOver, added)=>$f18febfa986513b3$var$readDOMChange(this, from, to, typeOver, added));
          this.domObserver.start();
          $f18febfa986513b3$var$initInput(this);
          this.updatePluginViews();
      }
      /**
      Holds `true` when a
      [composition](https://w3c.github.io/uievents/#events-compositionevents)
      is active.
      */ get composing() {
          return this.input.composing;
      }
      /**
      The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
      */ get props() {
          if (this._props.state != this.state) {
              let prev = this._props;
              this._props = {};
              for(let name in prev)this._props[name] = prev[name];
              this._props.state = this.state;
          }
          return this._props;
      }
      /**
      Update the view's props. Will immediately cause an update to
      the DOM.
      */ update(props) {
          if (props.handleDOMEvents != this._props.handleDOMEvents) $f18febfa986513b3$var$ensureListeners(this);
          let prevProps = this._props;
          this._props = props;
          if (props.plugins) {
              props.plugins.forEach($f18febfa986513b3$var$checkStateComponent);
              this.directPlugins = props.plugins;
          }
          this.updateStateInner(props.state, prevProps);
      }
      /**
      Update the view by updating existing props object with the object
      given as argument. Equivalent to `view.update(Object.assign({},
      view.props, props))`.
      */ setProps(props) {
          let updated = {};
          for(let name in this._props)updated[name] = this._props[name];
          updated.state = this.state;
          for(let name in props)updated[name] = props[name];
          this.update(updated);
      }
      /**
      Update the editor's `state` prop, without touching any of the
      other props.
      */ updateState(state) {
          this.updateStateInner(state, this._props);
      }
      updateStateInner(state, prevProps) {
          let prev = this.state, redraw = false, updateSel = false;
          // When stored marks are added, stop composition, so that they can
          // be displayed.
          if (state.storedMarks && this.composing) {
              $f18febfa986513b3$var$clearComposition(this);
              updateSel = true;
          }
          this.state = state;
          let pluginsChanged = prev.plugins != state.plugins || this._props.plugins != prevProps.plugins;
          if (pluginsChanged || this._props.plugins != prevProps.plugins || this._props.nodeViews != prevProps.nodeViews) {
              let nodeViews = $f18febfa986513b3$var$buildNodeViews(this);
              if ($f18febfa986513b3$var$changedNodeViews(nodeViews, this.nodeViews)) {
                  this.nodeViews = nodeViews;
                  redraw = true;
              }
          }
          if (pluginsChanged || prevProps.handleDOMEvents != this._props.handleDOMEvents) $f18febfa986513b3$var$ensureListeners(this);
          this.editable = $f18febfa986513b3$var$getEditable(this);
          $f18febfa986513b3$var$updateCursorWrapper(this);
          let innerDeco = $f18febfa986513b3$var$viewDecorations(this), outerDeco = $f18febfa986513b3$var$computeDocDeco(this);
          let scroll = prev.plugins != state.plugins && !prev.doc.eq(state.doc) ? "reset" : state.scrollToSelection > prev.scrollToSelection ? "to selection" : "preserve";
          let updateDoc = redraw || !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
          if (updateDoc || !state.selection.eq(prev.selection)) updateSel = true;
          let oldScrollPos = scroll == "preserve" && updateSel && this.dom.style.overflowAnchor == null && $f18febfa986513b3$var$storeScrollPos(this);
          if (updateSel) {
              this.domObserver.stop();
              // Work around an issue in Chrome, IE, and Edge where changing
              // the DOM around an active selection puts it into a broken
              // state where the thing the user sees differs from the
              // selection reported by the Selection object (#710, #973,
              // #1011, #1013, #1035).
              let forceSelUpdate = updateDoc && ($f18febfa986513b3$var$ie || $f18febfa986513b3$var$chrome) && !this.composing && !prev.selection.empty && !state.selection.empty && $f18febfa986513b3$var$selectionContextChanged(prev.selection, state.selection);
              if (updateDoc) {
                  // If the node that the selection points into is written to,
                  // Chrome sometimes starts misreporting the selection, so this
                  // tracks that and forces a selection reset when our update
                  // did write to the node.
                  let chromeKludge = $f18febfa986513b3$var$chrome ? this.trackWrites = this.domSelectionRange().focusNode : null;
                  if (redraw || !this.docView.update(state.doc, outerDeco, innerDeco, this)) {
                      this.docView.updateOuterDeco([]);
                      this.docView.destroy();
                      this.docView = $f18febfa986513b3$var$docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
                  }
                  if (chromeKludge && !this.trackWrites) forceSelUpdate = true;
              }
              // Work around for an issue where an update arriving right between
              // a DOM selection change and the "selectionchange" event for it
              // can cause a spurious DOM selection update, disrupting mouse
              // drag selection.
              if (forceSelUpdate || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && $f18febfa986513b3$var$anchorInRightPlace(this))) $f18febfa986513b3$var$selectionToDOM(this, forceSelUpdate);
              else {
                  $f18febfa986513b3$var$syncNodeSelection(this, state.selection);
                  this.domObserver.setCurSelection();
              }
              this.domObserver.start();
          }
          this.updatePluginViews(prev);
          if (scroll == "reset") this.dom.scrollTop = 0;
          else if (scroll == "to selection") this.scrollToSelection();
          else if (oldScrollPos) $f18febfa986513b3$var$resetScrollPos(oldScrollPos);
      }
      /**
      @internal
      */ scrollToSelection() {
          let startDOM = this.domSelectionRange().focusNode;
          if (this.someProp("handleScrollToSelection", (f)=>f(this))) ;
          else if (this.state.selection instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)) {
              let target = this.docView.domAfterPos(this.state.selection.from);
              if (target.nodeType == 1) $f18febfa986513b3$var$scrollRectIntoView(this, target.getBoundingClientRect(), startDOM);
          } else $f18febfa986513b3$var$scrollRectIntoView(this, this.coordsAtPos(this.state.selection.head, 1), startDOM);
      }
      destroyPluginViews() {
          let view;
          while(view = this.pluginViews.pop())if (view.destroy) view.destroy();
      }
      updatePluginViews(prevState) {
          if (!prevState || prevState.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
              this.prevDirectPlugins = this.directPlugins;
              this.destroyPluginViews();
              for(let i = 0; i < this.directPlugins.length; i++){
                  let plugin = this.directPlugins[i];
                  if (plugin.spec.view) this.pluginViews.push(plugin.spec.view(this));
              }
              for(let i = 0; i < this.state.plugins.length; i++){
                  let plugin = this.state.plugins[i];
                  if (plugin.spec.view) this.pluginViews.push(plugin.spec.view(this));
              }
          } else for(let i = 0; i < this.pluginViews.length; i++){
              let pluginView = this.pluginViews[i];
              if (pluginView.update) pluginView.update(this, prevState);
          }
      }
      someProp(propName, f) {
          let prop = this._props && this._props[propName], value;
          if (prop != null && (value = f ? f(prop) : prop)) return value;
          for(let i = 0; i < this.directPlugins.length; i++){
              let prop = this.directPlugins[i].props[propName];
              if (prop != null && (value = f ? f(prop) : prop)) return value;
          }
          let plugins = this.state.plugins;
          if (plugins) for(let i = 0; i < plugins.length; i++){
              let prop = plugins[i].props[propName];
              if (prop != null && (value = f ? f(prop) : prop)) return value;
          }
      }
      /**
      Query whether the view has focus.
      */ hasFocus() {
          // Work around IE not handling focus correctly if resize handles are shown.
          // If the cursor is inside an element with resize handles, activeElement
          // will be that element instead of this.dom.
          if ($f18febfa986513b3$var$ie) {
              // If activeElement is within this.dom, and there are no other elements
              // setting `contenteditable` to false in between, treat it as focused.
              let node = this.root.activeElement;
              if (node == this.dom) return true;
              if (!node || !this.dom.contains(node)) return false;
              while(node && this.dom != node && this.dom.contains(node)){
                  if (node.contentEditable == "false") return false;
                  node = node.parentElement;
              }
              return true;
          }
          return this.root.activeElement == this.dom;
      }
      /**
      Focus the editor.
      */ focus() {
          this.domObserver.stop();
          if (this.editable) $f18febfa986513b3$var$focusPreventScroll(this.dom);
          $f18febfa986513b3$var$selectionToDOM(this);
          this.domObserver.start();
      }
      /**
      Get the document root in which the editor exists. This will
      usually be the top-level `document`, but might be a [shadow
      DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
      root if the editor is inside one.
      */ get root() {
          let cached = this._root;
          if (cached == null) {
              for(let search = this.dom.parentNode; search; search = search.parentNode)if (search.nodeType == 9 || search.nodeType == 11 && search.host) {
                  if (!search.getSelection) Object.getPrototypeOf(search).getSelection = ()=>search.ownerDocument.getSelection();
                  return this._root = search;
              }
          }
          return cached || document;
      }
      /**
      Given a pair of viewport coordinates, return the document
      position that corresponds to them. May return null if the given
      coordinates aren't inside of the editor. When an object is
      returned, its `pos` property is the position nearest to the
      coordinates, and its `inside` property holds the position of the
      inner node that the position falls inside of, or -1 if it is at
      the top level, not in any node.
      */ posAtCoords(coords) {
          return $f18febfa986513b3$var$posAtCoords(this, coords);
      }
      /**
      Returns the viewport rectangle at a given document position.
      `left` and `right` will be the same number, as this returns a
      flat cursor-ish rectangle. If the position is between two things
      that aren't directly adjacent, `side` determines which element
      is used. When < 0, the element before the position is used,
      otherwise the element after.
      */ coordsAtPos(pos, side = 1) {
          return $f18febfa986513b3$var$coordsAtPos(this, pos, side);
      }
      /**
      Find the DOM position that corresponds to the given document
      position. When `side` is negative, find the position as close as
      possible to the content before the position. When positive,
      prefer positions close to the content after the position. When
      zero, prefer as shallow a position as possible.
      
      Note that you should **not** mutate the editor's internal DOM,
      only inspect it (and even that is usually not necessary).
      */ domAtPos(pos, side = 0) {
          return this.docView.domFromPos(pos, side);
      }
      /**
      Find the DOM node that represents the document node after the
      given position. May return `null` when the position doesn't point
      in front of a node or if the node is inside an opaque node view.
      
      This is intended to be able to call things like
      `getBoundingClientRect` on that DOM node. Do **not** mutate the
      editor DOM directly, or add styling this way, since that will be
      immediately overriden by the editor as it redraws the node.
      */ nodeDOM(pos) {
          let desc = this.docView.descAt(pos);
          return desc ? desc.nodeDOM : null;
      }
      /**
      Find the document position that corresponds to a given DOM
      position. (Whenever possible, it is preferable to inspect the
      document structure directly, rather than poking around in the
      DOM, but sometimes—for example when interpreting an event
      target—you don't have a choice.)
      
      The `bias` parameter can be used to influence which side of a DOM
      node to use when the position is inside a leaf node.
      */ posAtDOM(node, offset, bias = -1) {
          let pos = this.docView.posFromDOM(node, offset, bias);
          if (pos == null) throw new RangeError("DOM position not inside the editor");
          return pos;
      }
      /**
      Find out whether the selection is at the end of a textblock when
      moving in a given direction. When, for example, given `"left"`,
      it will return true if moving left from the current cursor
      position would leave that position's parent textblock. Will apply
      to the view's current state by default, but it is possible to
      pass a different state.
      */ endOfTextblock(dir, state) {
          return $f18febfa986513b3$var$endOfTextblock(this, state || this.state, dir);
      }
      /**
      Run the editor's paste logic with the given HTML string. The
      `event`, if given, will be passed to the
      [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
      */ pasteHTML(html, event) {
          return $f18febfa986513b3$var$doPaste(this, "", html, false, event || new ClipboardEvent("paste"));
      }
      /**
      Run the editor's paste logic with the given plain-text input.
      */ pasteText(text, event) {
          return $f18febfa986513b3$var$doPaste(this, text, null, true, event || new ClipboardEvent("paste"));
      }
      /**
      Removes the editor from the DOM and destroys all [node
      views](https://prosemirror.net/docs/ref/#view.NodeView).
      */ destroy() {
          if (!this.docView) return;
          $f18febfa986513b3$var$destroyInput(this);
          this.destroyPluginViews();
          if (this.mounted) {
              this.docView.update(this.state.doc, [], $f18febfa986513b3$var$viewDecorations(this), this);
              this.dom.textContent = "";
          } else if (this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
          this.docView.destroy();
          this.docView = null;
      }
      /**
      This is true when the view has been
      [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
      used anymore).
      */ get isDestroyed() {
          return this.docView == null;
      }
      /**
      Used for testing.
      */ dispatchEvent(event) {
          return $f18febfa986513b3$var$dispatchEvent(this, event);
      }
      /**
      Dispatch a transaction. Will call
      [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
      when given, and otherwise defaults to applying the transaction to
      the current state and calling
      [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
      This method is bound to the view instance, so that it can be
      easily passed around.
      */ dispatch(tr) {
          let dispatchTransaction = this._props.dispatchTransaction;
          if (dispatchTransaction) dispatchTransaction.call(this, tr);
          else this.updateState(this.state.apply(tr));
      }
      /**
      @internal
      */ domSelectionRange() {
          return $f18febfa986513b3$var$safari && this.root.nodeType === 11 && $f18febfa986513b3$var$deepActiveElement(this.dom.ownerDocument) == this.dom ? $f18febfa986513b3$var$safariShadowSelectionRange(this) : this.domSelection();
      }
      /**
      @internal
      */ domSelection() {
          return this.root.getSelection();
      }
  }
  function $f18febfa986513b3$var$computeDocDeco(view) {
      let attrs = Object.create(null);
      attrs.class = "ProseMirror";
      attrs.contenteditable = String(view.editable);
      view.someProp("attributes", (value)=>{
          if (typeof value == "function") value = value(view.state);
          if (value) for(let attr in value){
              if (attr == "class") attrs.class += " " + value[attr];
              else if (attr == "style") attrs.style = (attrs.style ? attrs.style + ";" : "") + value[attr];
              else if (!attrs[attr] && attr != "contenteditable" && attr != "nodeName") attrs[attr] = String(value[attr]);
          }
      });
      if (!attrs.translate) attrs.translate = "no";
      return [
          $f18febfa986513b3$export$10e30b733df217ea.node(0, view.state.doc.content.size, attrs)
      ];
  }
  function $f18febfa986513b3$var$updateCursorWrapper(view) {
      if (view.markCursor) {
          let dom = document.createElement("img");
          dom.className = "ProseMirror-separator";
          dom.setAttribute("mark-placeholder", "true");
          dom.setAttribute("alt", "");
          view.cursorWrapper = {
              dom: dom,
              deco: $f18febfa986513b3$export$10e30b733df217ea.widget(view.state.selection.head, dom, {
                  raw: true,
                  marks: view.markCursor
              })
          };
      } else view.cursorWrapper = null;
  }
  function $f18febfa986513b3$var$getEditable(view) {
      return !view.someProp("editable", (value)=>value(view.state) === false);
  }
  function $f18febfa986513b3$var$selectionContextChanged(sel1, sel2) {
      let depth = Math.min(sel1.$anchor.sharedDepth(sel1.head), sel2.$anchor.sharedDepth(sel2.head));
      return sel1.$anchor.start(depth) != sel2.$anchor.start(depth);
  }
  function $f18febfa986513b3$var$buildNodeViews(view) {
      let result = Object.create(null);
      function add(obj) {
          for(let prop in obj)if (!Object.prototype.hasOwnProperty.call(result, prop)) result[prop] = obj[prop];
      }
      view.someProp("nodeViews", add);
      view.someProp("markViews", add);
      return result;
  }
  function $f18febfa986513b3$var$changedNodeViews(a, b) {
      let nA = 0, nB = 0;
      for(let prop in a){
          if (a[prop] != b[prop]) return true;
          nA++;
      }
      for(let _ in b)nB++;
      return nA != nB;
  }
  function $f18febfa986513b3$var$checkStateComponent(plugin) {
      if (plugin.spec.state || plugin.spec.filterTransaction || plugin.spec.appendTransaction) throw new RangeError("Plugins passed directly to the view must not have a state component");
  }
  
  
  
  var $bdf1d61f73714893$exports = {};
  
  $parcel$export($bdf1d61f73714893$exports, "nodes", () => $bdf1d61f73714893$export$695720b7e7a61533);
  $parcel$export($bdf1d61f73714893$exports, "marks", () => $bdf1d61f73714893$export$3a8025f2f3e0c64);
  $parcel$export($bdf1d61f73714893$exports, "schema", () => $bdf1d61f73714893$export$4902baddc787debb);
  
  const $bdf1d61f73714893$var$pDOM = [
      "p",
      0
  ], $bdf1d61f73714893$var$blockquoteDOM = [
      "blockquote",
      0
  ], $bdf1d61f73714893$var$hrDOM = [
      "hr"
  ], $bdf1d61f73714893$var$preDOM = [
      "pre",
      [
          "code",
          0
      ]
  ], $bdf1d61f73714893$var$brDOM = [
      "br"
  ];
  /**
  [Specs](https://prosemirror.net/docs/ref/#model.NodeSpec) for the nodes defined in this schema.
  */ const $bdf1d61f73714893$export$695720b7e7a61533 = {
      /**
      NodeSpec The top level document node.
      */ doc: {
          content: "block+"
      },
      /**
      A plain paragraph textblock. Represented in the DOM
      as a `<p>` element.
      */ paragraph: {
          content: "inline*",
          group: "block",
          parseDOM: [
              {
                  tag: "p"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$pDOM;
          }
      },
      /**
      A blockquote (`<blockquote>`) wrapping one or more blocks.
      */ blockquote: {
          content: "block+",
          group: "block",
          defining: true,
          parseDOM: [
              {
                  tag: "blockquote"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$blockquoteDOM;
          }
      },
      /**
      A horizontal rule (`<hr>`).
      */ horizontal_rule: {
          group: "block",
          parseDOM: [
              {
                  tag: "hr"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$hrDOM;
          }
      },
      /**
      A heading textblock, with a `level` attribute that
      should hold the number 1 to 6. Parsed and serialized as `<h1>` to
      `<h6>` elements.
      */ heading: {
          attrs: {
              level: {
                  default: 1
              }
          },
          content: "inline*",
          group: "block",
          defining: true,
          parseDOM: [
              {
                  tag: "h1",
                  attrs: {
                      level: 1
                  }
              },
              {
                  tag: "h2",
                  attrs: {
                      level: 2
                  }
              },
              {
                  tag: "h3",
                  attrs: {
                      level: 3
                  }
              },
              {
                  tag: "h4",
                  attrs: {
                      level: 4
                  }
              },
              {
                  tag: "h5",
                  attrs: {
                      level: 5
                  }
              },
              {
                  tag: "h6",
                  attrs: {
                      level: 6
                  }
              }
          ],
          toDOM (node) {
              return [
                  "h" + node.attrs.level,
                  0
              ];
          }
      },
      /**
      A code listing. Disallows marks or non-text inline
      nodes by default. Represented as a `<pre>` element with a
      `<code>` element inside of it.
      */ code_block: {
          content: "text*",
          marks: "",
          group: "block",
          code: true,
          defining: true,
          parseDOM: [
              {
                  tag: "pre",
                  preserveWhitespace: "full"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$preDOM;
          }
      },
      /**
      The text node.
      */ text: {
          group: "inline"
      },
      /**
      An inline image (`<img>`) node. Supports `src`,
      `alt`, and `href` attributes. The latter two default to the empty
      string.
      */ image: {
          inline: true,
          attrs: {
              src: {},
              alt: {
                  default: null
              },
              title: {
                  default: null
              }
          },
          group: "inline",
          draggable: true,
          parseDOM: [
              {
                  tag: "img[src]",
                  getAttrs (dom) {
                      return {
                          src: dom.getAttribute("src"),
                          title: dom.getAttribute("title"),
                          alt: dom.getAttribute("alt")
                      };
                  }
              }
          ],
          toDOM (node) {
              let { src: src, alt: alt, title: title } = node.attrs;
              return [
                  "img",
                  {
                      src: src,
                      alt: alt,
                      title: title
                  }
              ];
          }
      },
      /**
      A hard line break, represented in the DOM as `<br>`.
      */ hard_break: {
          inline: true,
          group: "inline",
          selectable: false,
          parseDOM: [
              {
                  tag: "br"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$brDOM;
          }
      }
  };
  const $bdf1d61f73714893$var$emDOM = [
      "em",
      0
  ], $bdf1d61f73714893$var$strongDOM = [
      "strong",
      0
  ], $bdf1d61f73714893$var$codeDOM = [
      "code",
      0
  ];
  /**
  [Specs](https://prosemirror.net/docs/ref/#model.MarkSpec) for the marks in the schema.
  */ const $bdf1d61f73714893$export$3a8025f2f3e0c64 = {
      /**
      A link. Has `href` and `title` attributes. `title`
      defaults to the empty string. Rendered and parsed as an `<a>`
      element.
      */ link: {
          attrs: {
              href: {},
              title: {
                  default: null
              }
          },
          inclusive: false,
          parseDOM: [
              {
                  tag: "a[href]",
                  getAttrs (dom) {
                      return {
                          href: dom.getAttribute("href"),
                          title: dom.getAttribute("title")
                      };
                  }
              }
          ],
          toDOM (node) {
              let { href: href, title: title } = node.attrs;
              return [
                  "a",
                  {
                      href: href,
                      title: title
                  },
                  0
              ];
          }
      },
      /**
      An emphasis mark. Rendered as an `<em>` element. Has parse rules
      that also match `<i>` and `font-style: italic`.
      */ em: {
          parseDOM: [
              {
                  tag: "i"
              },
              {
                  tag: "em"
              },
              {
                  style: "font-style=italic"
              },
              {
                  style: "font-style=normal",
                  clearMark: (m)=>m.type.name == "em"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$emDOM;
          }
      },
      /**
      A strong mark. Rendered as `<strong>`, parse rules also match
      `<b>` and `font-weight: bold`.
      */ strong: {
          parseDOM: [
              {
                  tag: "strong"
              },
              // This works around a Google Docs misbehavior where
              // pasted content will be inexplicably wrapped in `<b>`
              // tags with a font-weight normal.
              {
                  tag: "b",
                  getAttrs: (node)=>node.style.fontWeight != "normal" && null
              },
              {
                  style: "font-weight=400",
                  clearMark: (m)=>m.type.name == "strong"
              },
              {
                  style: "font-weight",
                  getAttrs: (value)=>/^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$strongDOM;
          }
      },
      /**
      Code font mark. Represented as a `<code>` element.
      */ code: {
          parseDOM: [
              {
                  tag: "code"
              }
          ],
          toDOM () {
              return $bdf1d61f73714893$var$codeDOM;
          }
      }
  };
  /**
  This schema roughly corresponds to the document schema used by
  [CommonMark](http://commonmark.org/), minus the list elements,
  which are defined in the [`prosemirror-schema-list`](https://prosemirror.net/docs/ref/#schema-list)
  module.
  
  To reuse elements from this schema, extend or read from its
  `spec.nodes` and `spec.marks` [properties](https://prosemirror.net/docs/ref/#model.Schema.spec).
  */ const $bdf1d61f73714893$export$4902baddc787debb = new (0, $59526ec4d3b41406$export$19342e026b58ebb7)({
      nodes: $bdf1d61f73714893$export$695720b7e7a61533,
      marks: $bdf1d61f73714893$export$3a8025f2f3e0c64
  });
  
  
  var $053d3e35c0447a93$exports = {};
  
  $parcel$export($053d3e35c0447a93$exports, "orderedList", () => $053d3e35c0447a93$export$a5dc81035676e7a);
  $parcel$export($053d3e35c0447a93$exports, "bulletList", () => $053d3e35c0447a93$export$a140c94e5ea26bee);
  $parcel$export($053d3e35c0447a93$exports, "listItem", () => $053d3e35c0447a93$export$76c7e83ecc9cdf05);
  $parcel$export($053d3e35c0447a93$exports, "addListNodes", () => $053d3e35c0447a93$export$fa2e7d3d1550c2ea);
  $parcel$export($053d3e35c0447a93$exports, "wrapInList", () => $053d3e35c0447a93$export$a8aef45c6262afee);
  $parcel$export($053d3e35c0447a93$exports, "splitListItem", () => $053d3e35c0447a93$export$e920ee2eb756d384);
  $parcel$export($053d3e35c0447a93$exports, "liftListItem", () => $053d3e35c0447a93$export$e74cd5adb935a538);
  $parcel$export($053d3e35c0447a93$exports, "sinkListItem", () => $053d3e35c0447a93$export$dd505f850a3798a4);
  
  
  
  const $053d3e35c0447a93$var$olDOM = [
      "ol",
      0
  ], $053d3e35c0447a93$var$ulDOM = [
      "ul",
      0
  ], $053d3e35c0447a93$var$liDOM = [
      "li",
      0
  ];
  /**
  An ordered list [node spec](https://prosemirror.net/docs/ref/#model.NodeSpec). Has a single
  attribute, `order`, which determines the number at which the list
  starts counting, and defaults to 1. Represented as an `<ol>`
  element.
  */ const $053d3e35c0447a93$export$a5dc81035676e7a = {
      attrs: {
          order: {
              default: 1
          }
      },
      parseDOM: [
          {
              tag: "ol",
              getAttrs (dom) {
                  return {
                      order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1
                  };
              }
          }
      ],
      toDOM (node) {
          return node.attrs.order == 1 ? $053d3e35c0447a93$var$olDOM : [
              "ol",
              {
                  start: node.attrs.order
              },
              0
          ];
      }
  };
  /**
  A bullet list node spec, represented in the DOM as `<ul>`.
  */ const $053d3e35c0447a93$export$a140c94e5ea26bee = {
      parseDOM: [
          {
              tag: "ul"
          }
      ],
      toDOM () {
          return $053d3e35c0447a93$var$ulDOM;
      }
  };
  /**
  A list item (`<li>`) spec.
  */ const $053d3e35c0447a93$export$76c7e83ecc9cdf05 = {
      parseDOM: [
          {
              tag: "li"
          }
      ],
      toDOM () {
          return $053d3e35c0447a93$var$liDOM;
      },
      defining: true
  };
  function $053d3e35c0447a93$var$add(obj, props) {
      let copy = {};
      for(let prop in obj)copy[prop] = obj[prop];
      for(let prop in props)copy[prop] = props[prop];
      return copy;
  }
  /**
  Convenience function for adding list-related node types to a map
  specifying the nodes for a schema. Adds
  [`orderedList`](https://prosemirror.net/docs/ref/#schema-list.orderedList) as `"ordered_list"`,
  [`bulletList`](https://prosemirror.net/docs/ref/#schema-list.bulletList) as `"bullet_list"`, and
  [`listItem`](https://prosemirror.net/docs/ref/#schema-list.listItem) as `"list_item"`.
  
  `itemContent` determines the content expression for the list items.
  If you want the commands defined in this module to apply to your
  list structure, it should have a shape like `"paragraph block*"` or
  `"paragraph (ordered_list | bullet_list)*"`. `listGroup` can be
  given to assign a group name to the list node types, for example
  `"block"`.
  */ function $053d3e35c0447a93$export$fa2e7d3d1550c2ea(nodes, itemContent, listGroup) {
      return nodes.append({
          ordered_list: $053d3e35c0447a93$var$add($053d3e35c0447a93$export$a5dc81035676e7a, {
              content: "list_item+",
              group: listGroup
          }),
          bullet_list: $053d3e35c0447a93$var$add($053d3e35c0447a93$export$a140c94e5ea26bee, {
              content: "list_item+",
              group: listGroup
          }),
          list_item: $053d3e35c0447a93$var$add($053d3e35c0447a93$export$76c7e83ecc9cdf05, {
              content: itemContent
          })
      });
  }
  /**
  Returns a command function that wraps the selection in a list with
  the given type an attributes. If `dispatch` is null, only return a
  value to indicate whether this is possible, but don't actually
  perform the change.
  */ function $053d3e35c0447a93$export$a8aef45c6262afee(listType, attrs = null) {
      return function(state, dispatch) {
          let { $from: $from, $to: $to } = state.selection;
          let range = $from.blockRange($to), doJoin = false, outerRange = range;
          if (!range) return false;
          // This is at the top of an existing list item
          if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
              // Don't do anything if this is the top of the list
              if ($from.index(range.depth - 1) == 0) return false;
              let $insert = state.doc.resolve(range.start - 2);
              outerRange = new (0, $59526ec4d3b41406$export$7bc461ceb770fb16)($insert, $insert, range.depth);
              if (range.endIndex < range.parent.childCount) range = new (0, $59526ec4d3b41406$export$7bc461ceb770fb16)($from, state.doc.resolve($to.end(range.depth)), range.depth);
              doJoin = true;
          }
          let wrap = (0, $77b6a7383a1cf23c$export$118cb9a83e81ba37)(outerRange, listType, attrs, range);
          if (!wrap) return false;
          if (dispatch) dispatch($053d3e35c0447a93$var$doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView());
          return true;
      };
  }
  function $053d3e35c0447a93$var$doWrapInList(tr, range, wrappers, joinBefore, listType) {
      let content = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
      for(let i = wrappers.length - 1; i >= 0; i--)content = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(wrappers[i].type.create(wrappers[i].attrs, content));
      tr.step(new (0, $77b6a7383a1cf23c$export$444ba800d6024a98)(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(content, 0, 0), wrappers.length, true));
      let found = 0;
      for(let i = 0; i < wrappers.length; i++)if (wrappers[i].type == listType) found = i + 1;
      let splitDepth = wrappers.length - found;
      let splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0), parent = range.parent;
      for(let i = range.startIndex, e = range.endIndex, first = true; i < e; i++, first = false){
          if (!first && (0, $77b6a7383a1cf23c$export$5aaf008897aef029)(tr.doc, splitPos, splitDepth)) {
              tr.split(splitPos, splitDepth);
              splitPos += 2 * splitDepth;
          }
          splitPos += parent.child(i).nodeSize;
      }
      return tr;
  }
  /**
  Build a command that splits a non-empty textblock at the top level
  of a list item by also splitting that list item.
  */ function $053d3e35c0447a93$export$e920ee2eb756d384(itemType, itemAttrs) {
      return function(state, dispatch) {
          let { $from: $from, $to: $to, node: node } = state.selection;
          if (node && node.isBlock || $from.depth < 2 || !$from.sameParent($to)) return false;
          let grandParent = $from.node(-1);
          if (grandParent.type != itemType) return false;
          if ($from.parent.content.size == 0 && $from.node(-1).childCount == $from.indexAfter(-1)) {
              // In an empty block. If this is a nested list, the wrapping
              // list item should be split. Otherwise, bail out and let next
              // command handle lifting.
              if ($from.depth == 3 || $from.node(-3).type != itemType || $from.index(-2) != $from.node(-2).childCount - 1) return false;
              if (dispatch) {
                  let wrap = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
                  let depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
                  // Build a fragment containing empty versions of the structure
                  // from the outer list item to the parent node of the cursor
                  for(let d = $from.depth - depthBefore; d >= $from.depth - 3; d--)wrap = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from($from.node(d).copy(wrap));
                  let depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
                  // Add a second list item with an empty default start node
                  wrap = wrap.append((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(itemType.createAndFill()));
                  let start = $from.before($from.depth - (depthBefore - 1));
                  let tr = state.tr.replace(start, $from.after(-depthAfter), new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(wrap, 4 - depthBefore, 0));
                  let sel = -1;
                  tr.doc.nodesBetween(start, tr.doc.content.size, (node, pos)=>{
                      if (sel > -1) return false;
                      if (node.isTextblock && node.content.size == 0) sel = pos + 1;
                  });
                  if (sel > -1) tr.setSelection((0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near(tr.doc.resolve(sel)));
                  dispatch(tr.scrollIntoView());
              }
              return true;
          }
          let nextType = $to.pos == $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
          let tr = state.tr.delete($from.pos, $to.pos);
          let types = nextType ? [
              itemAttrs ? {
                  type: itemType,
                  attrs: itemAttrs
              } : null,
              {
                  type: nextType
              }
          ] : undefined;
          if (!(0, $77b6a7383a1cf23c$export$5aaf008897aef029)(tr.doc, $from.pos, 2, types)) return false;
          if (dispatch) dispatch(tr.split($from.pos, 2, types).scrollIntoView());
          return true;
      };
  }
  /**
  Create a command to lift the list item around the selection up into
  a wrapping list.
  */ function $053d3e35c0447a93$export$e74cd5adb935a538(itemType) {
      return function(state, dispatch) {
          let { $from: $from, $to: $to } = state.selection;
          let range = $from.blockRange($to, (node)=>node.childCount > 0 && node.firstChild.type == itemType);
          if (!range) return false;
          if (!dispatch) return true;
          if ($from.node(range.depth - 1).type == itemType) return $053d3e35c0447a93$var$liftToOuterList(state, dispatch, itemType, range);
          else return $053d3e35c0447a93$var$liftOutOfList(state, dispatch, range);
      };
  }
  function $053d3e35c0447a93$var$liftToOuterList(state, dispatch, itemType, range) {
      let tr = state.tr, end = range.end, endOfList = range.$to.end(range.depth);
      if (end < endOfList) {
          // There are siblings after the lifted items, which must become
          // children of the last item
          tr.step(new (0, $77b6a7383a1cf23c$export$444ba800d6024a98)(end - 1, endOfList, end, endOfList, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
          range = new (0, $59526ec4d3b41406$export$7bc461ceb770fb16)(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
      }
      const target = (0, $77b6a7383a1cf23c$export$f1508b72cc76a09e)(range);
      if (target == null) return false;
      tr.lift(range, target);
      let after = tr.mapping.map(end, -1) - 1;
      if ((0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(tr.doc, after)) tr.join(after);
      dispatch(tr.scrollIntoView());
      return true;
  }
  function $053d3e35c0447a93$var$liftOutOfList(state, dispatch, range) {
      let tr = state.tr, list = range.parent;
      // Merge the list items into a single big item
      for(let pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--){
          pos -= list.child(i).nodeSize;
          tr.delete(pos - 1, pos + 1);
      }
      let $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
      if (tr.mapping.map(range.end) != range.start + $start.nodeAfter.nodeSize) return false;
      let atStart = range.startIndex == 0, atEnd = range.endIndex == list.childCount;
      let parent = $start.node(-1), indexBefore = $start.index(-1);
      if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty : (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(list)))) return false;
      let start = $start.pos, end = start + item.nodeSize;
      // Strip off the surrounding list. At the sides where we're not at
      // the end of the list, the existing list is closed. At sides where
      // this is the end, it is overwritten to its end.
      tr.step(new (0, $77b6a7383a1cf23c$export$444ba800d6024a98)(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((atStart ? (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty : (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(list.copy((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty))).append(atEnd ? (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty : (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(list.copy((0, $59526ec4d3b41406$export$ffb0004e005737fa).empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
      dispatch(tr.scrollIntoView());
      return true;
  }
  /**
  Create a command to sink the list item around the selection down
  into an inner list.
  */ function $053d3e35c0447a93$export$dd505f850a3798a4(itemType) {
      return function(state, dispatch) {
          let { $from: $from, $to: $to } = state.selection;
          let range = $from.blockRange($to, (node)=>node.childCount > 0 && node.firstChild.type == itemType);
          if (!range) return false;
          let startIndex = range.startIndex;
          if (startIndex == 0) return false;
          let parent = range.parent, nodeBefore = parent.child(startIndex - 1);
          if (nodeBefore.type != itemType) return false;
          if (dispatch) {
              let nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
              let inner = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(nestedBefore ? itemType.create() : null);
              let slice = new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)((0, $59526ec4d3b41406$export$ffb0004e005737fa).from(itemType.create(null, (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(parent.type.create(null, inner)))), nestedBefore ? 3 : 1, 0);
              let before = range.start, after = range.end;
              dispatch(state.tr.step(new (0, $77b6a7383a1cf23c$export$444ba800d6024a98)(before - (nestedBefore ? 3 : 1), after, before, after, slice, 1, true)).scrollIntoView());
          }
          return true;
      };
  }
  
  
  var $23cc8b60725a3082$exports = {};
  
  $parcel$export($23cc8b60725a3082$exports, "buildMenuItems", () => $23cc8b60725a3082$export$630b7735451169d5);
  $parcel$export($23cc8b60725a3082$exports, "buildKeymap", () => $23cc8b60725a3082$export$d9ca128b11caeeaf);
  $parcel$export($23cc8b60725a3082$exports, "buildInputRules", () => $23cc8b60725a3082$export$85d07b429441b866);
  $parcel$export($23cc8b60725a3082$exports, "exampleSetup", () => $23cc8b60725a3082$export$a24aa9c6e8fd0231);
  var $1e062bab1b3a59ef$exports = {};
  
  $parcel$export($1e062bab1b3a59ef$exports, "keymap", () => $1e062bab1b3a59ef$export$5043418e2ef368d5);
  $parcel$export($1e062bab1b3a59ef$exports, "keydownHandler", () => $1e062bab1b3a59ef$export$53f558754f8b9fd1);
  var $1c0514b6a588abd2$export$e2253033e6e1df16 = {
      8: "Backspace",
      9: "Tab",
      10: "Enter",
      12: "NumLock",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      44: "PrintScreen",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Meta",
      92: "Meta",
      106: "*",
      107: "+",
      108: ",",
      109: "-",
      110: ".",
      111: "/",
      144: "NumLock",
      145: "ScrollLock",
      160: "Shift",
      161: "Shift",
      162: "Control",
      163: "Control",
      164: "Alt",
      165: "Alt",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
  };
  var $1c0514b6a588abd2$export$fba63a578e423eb = {
      48: ")",
      49: "!",
      50: "@",
      51: "#",
      52: "$",
      53: "%",
      54: "^",
      55: "&",
      56: "*",
      57: "(",
      59: ":",
      61: "+",
      173: "_",
      186: ":",
      187: "+",
      188: "<",
      189: "_",
      190: ">",
      191: "?",
      192: "~",
      219: "{",
      220: "|",
      221: "}",
      222: '"'
  };
  var $1c0514b6a588abd2$var$mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
  var $1c0514b6a588abd2$var$ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
  // Fill in the digit keys
  for(var $1c0514b6a588abd2$var$i = 0; $1c0514b6a588abd2$var$i < 10; $1c0514b6a588abd2$var$i++)$1c0514b6a588abd2$export$e2253033e6e1df16[48 + $1c0514b6a588abd2$var$i] = $1c0514b6a588abd2$export$e2253033e6e1df16[96 + $1c0514b6a588abd2$var$i] = String($1c0514b6a588abd2$var$i);
  // The function keys
  for(var $1c0514b6a588abd2$var$i = 1; $1c0514b6a588abd2$var$i <= 24; $1c0514b6a588abd2$var$i++)$1c0514b6a588abd2$export$e2253033e6e1df16[$1c0514b6a588abd2$var$i + 111] = "F" + $1c0514b6a588abd2$var$i;
  // And the alphabetic keys
  for(var $1c0514b6a588abd2$var$i = 65; $1c0514b6a588abd2$var$i <= 90; $1c0514b6a588abd2$var$i++){
      $1c0514b6a588abd2$export$e2253033e6e1df16[$1c0514b6a588abd2$var$i] = String.fromCharCode($1c0514b6a588abd2$var$i + 32);
      $1c0514b6a588abd2$export$fba63a578e423eb[$1c0514b6a588abd2$var$i] = String.fromCharCode($1c0514b6a588abd2$var$i);
  }
  // For each code that doesn't have a shift-equivalent, copy the base name
  for(var $1c0514b6a588abd2$var$code in $1c0514b6a588abd2$export$e2253033e6e1df16)if (!$1c0514b6a588abd2$export$fba63a578e423eb.hasOwnProperty($1c0514b6a588abd2$var$code)) $1c0514b6a588abd2$export$fba63a578e423eb[$1c0514b6a588abd2$var$code] = $1c0514b6a588abd2$export$e2253033e6e1df16[$1c0514b6a588abd2$var$code];
  function $1c0514b6a588abd2$export$fb33aafd75404f4c(event) {
      // On macOS, keys held with Shift and Cmd don't reflect the effect of Shift in `.key`.
      // On IE, shift effect is never included in `.key`.
      var ignoreKey = $1c0514b6a588abd2$var$mac && event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey || $1c0514b6a588abd2$var$ie && event.shiftKey && event.key && event.key.length == 1 || event.key == "Unidentified";
      var name = !ignoreKey && event.key || (event.shiftKey ? $1c0514b6a588abd2$export$fba63a578e423eb : $1c0514b6a588abd2$export$e2253033e6e1df16)[event.keyCode] || event.key || "Unidentified";
      // Edge sometimes produces wrong names (Issue #3)
      if (name == "Esc") name = "Escape";
      if (name == "Del") name = "Delete";
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
      if (name == "Left") name = "ArrowLeft";
      if (name == "Up") name = "ArrowUp";
      if (name == "Right") name = "ArrowRight";
      if (name == "Down") name = "ArrowDown";
      return name;
  }
  
  
  
  const $1e062bab1b3a59ef$var$mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;
  function $1e062bab1b3a59ef$var$normalizeKeyName(name) {
      let parts = name.split(/-(?!$)/), result = parts[parts.length - 1];
      if (result == "Space") result = " ";
      let alt, ctrl, shift, meta;
      for(let i = 0; i < parts.length - 1; i++){
          let mod = parts[i];
          if (/^(cmd|meta|m)$/i.test(mod)) meta = true;
          else if (/^a(lt)?$/i.test(mod)) alt = true;
          else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true;
          else if (/^s(hift)?$/i.test(mod)) shift = true;
          else if (/^mod$/i.test(mod)) {
              if ($1e062bab1b3a59ef$var$mac) meta = true;
              else ctrl = true;
          } else throw new Error("Unrecognized modifier name: " + mod);
      }
      if (alt) result = "Alt-" + result;
      if (ctrl) result = "Ctrl-" + result;
      if (meta) result = "Meta-" + result;
      if (shift) result = "Shift-" + result;
      return result;
  }
  function $1e062bab1b3a59ef$var$normalize(map) {
      let copy = Object.create(null);
      for(let prop in map)copy[$1e062bab1b3a59ef$var$normalizeKeyName(prop)] = map[prop];
      return copy;
  }
  function $1e062bab1b3a59ef$var$modifiers(name, event, shift = true) {
      if (event.altKey) name = "Alt-" + name;
      if (event.ctrlKey) name = "Ctrl-" + name;
      if (event.metaKey) name = "Meta-" + name;
      if (shift && event.shiftKey) name = "Shift-" + name;
      return name;
  }
  /**
  Create a keymap plugin for the given set of bindings.
  
  Bindings should map key names to [command](https://prosemirror.net/docs/ref/#commands)-style
  functions, which will be called with `(EditorState, dispatch,
  EditorView)` arguments, and should return true when they've handled
  the key. Note that the view argument isn't part of the command
  protocol, but can be used as an escape hatch if a binding needs to
  directly interact with the UI.
  
  Key names may be strings like `"Shift-Ctrl-Enter"`—a key
  identifier prefixed with zero or more modifiers. Key identifiers
  are based on the strings that can appear in
  [`KeyEvent.key`](https:developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).
  Use lowercase letters to refer to letter keys (or uppercase letters
  if you want shift to be held). You may use `"Space"` as an alias
  for the `" "` name.
  
  Modifiers can be given in any order. `Shift-` (or `s-`), `Alt-` (or
  `a-`), `Ctrl-` (or `c-` or `Control-`) and `Cmd-` (or `m-` or
  `Meta-`) are recognized. For characters that are created by holding
  shift, the `Shift-` prefix is implied, and should not be added
  explicitly.
  
  You can use `Mod-` as a shorthand for `Cmd-` on Mac and `Ctrl-` on
  other platforms.
  
  You can add multiple keymap plugins to an editor. The order in
  which they appear determines their precedence (the ones early in
  the array get to dispatch first).
  */ function $1e062bab1b3a59ef$export$5043418e2ef368d5(bindings) {
      return new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          props: {
              handleKeyDown: $1e062bab1b3a59ef$export$53f558754f8b9fd1(bindings)
          }
      });
  }
  /**
  Given a set of bindings (using the same format as
  [`keymap`](https://prosemirror.net/docs/ref/#keymap.keymap)), return a [keydown
  handler](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown) that handles them.
  */ function $1e062bab1b3a59ef$export$53f558754f8b9fd1(bindings) {
      let map = $1e062bab1b3a59ef$var$normalize(bindings);
      return function(view, event) {
          let name = (0, $1c0514b6a588abd2$export$fb33aafd75404f4c)(event), baseName, direct = map[$1e062bab1b3a59ef$var$modifiers(name, event)];
          if (direct && direct(view.state, view.dispatch, view)) return true;
          // A character key
          if (name.length == 1 && name != " ") {
              if (event.shiftKey) {
                  // In case the name was already modified by shift, try looking
                  // it up without its shift modifier
                  let noShift = map[$1e062bab1b3a59ef$var$modifiers(name, event, false)];
                  if (noShift && noShift(view.state, view.dispatch, view)) return true;
              }
              if ((event.shiftKey || event.altKey || event.metaKey || name.charCodeAt(0) > 127) && (baseName = (0, $1c0514b6a588abd2$export$e2253033e6e1df16)[event.keyCode]) && baseName != name) {
                  // Try falling back to the keyCode when there's a modifier
                  // active or the character produced isn't ASCII, and our table
                  // produces a different name from the the keyCode. See #668,
                  // #1060
                  let fromCode = map[$1e062bab1b3a59ef$var$modifiers(baseName, event)];
                  if (fromCode && fromCode(view.state, view.dispatch, view)) return true;
              }
          }
          return false;
      };
  }
  
  
  var $a0a5029c887b2c7c$exports = {};
  
  $parcel$export($a0a5029c887b2c7c$exports, "closeHistory", () => $a0a5029c887b2c7c$export$181a649d919c589e);
  $parcel$export($a0a5029c887b2c7c$exports, "history", () => $a0a5029c887b2c7c$export$55abd4691b317664);
  $parcel$export($a0a5029c887b2c7c$exports, "undo", () => $a0a5029c887b2c7c$export$21f930c44940fd98);
  $parcel$export($a0a5029c887b2c7c$exports, "redo", () => $a0a5029c887b2c7c$export$1688e416fee0a49e);
  $parcel$export($a0a5029c887b2c7c$exports, "undoDepth", () => $a0a5029c887b2c7c$export$f8a176c2b9a10bdb);
  $parcel$export($a0a5029c887b2c7c$exports, "redoDepth", () => $a0a5029c887b2c7c$export$3ffe6b288e7d941b);
  var $87b162019924db18$var$GOOD_LEAF_SIZE = 200;
  // :: class<T> A rope sequence is a persistent sequence data structure
  // that supports appending, prepending, and slicing without doing a
  // full copy. It is represented as a mostly-balanced tree.
  var $87b162019924db18$var$RopeSequence = function RopeSequence() {};
  $87b162019924db18$var$RopeSequence.prototype.append = function append(other) {
      if (!other.length) return this;
      other = $87b162019924db18$var$RopeSequence.from(other);
      return !this.length && other || other.length < $87b162019924db18$var$GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < $87b162019924db18$var$GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
  };
  // :: (union<[T], RopeSequence<T>>) → RopeSequence<T>
  // Prepend an array or other rope to this one, returning a new rope.
  $87b162019924db18$var$RopeSequence.prototype.prepend = function prepend(other) {
      if (!other.length) return this;
      return $87b162019924db18$var$RopeSequence.from(other).append(this);
  };
  $87b162019924db18$var$RopeSequence.prototype.appendInner = function appendInner(other) {
      return new $87b162019924db18$var$Append(this, other);
  };
  // :: (?number, ?number) → RopeSequence<T>
  // Create a rope repesenting a sub-sequence of this rope.
  $87b162019924db18$var$RopeSequence.prototype.slice = function slice(from, to) {
      if (from === void 0) from = 0;
      if (to === void 0) to = this.length;
      if (from >= to) return $87b162019924db18$var$RopeSequence.empty;
      return this.sliceInner(Math.max(0, from), Math.min(this.length, to));
  };
  // :: (number) → T
  // Retrieve the element at the given position from this rope.
  $87b162019924db18$var$RopeSequence.prototype.get = function get(i) {
      if (i < 0 || i >= this.length) return undefined;
      return this.getInner(i);
  };
  // :: ((element: T, index: number) → ?bool, ?number, ?number)
  // Call the given function for each element between the given
  // indices. This tends to be more efficient than looping over the
  // indices and calling `get`, because it doesn't have to descend the
  // tree for every element.
  $87b162019924db18$var$RopeSequence.prototype.forEach = function forEach(f, from, to) {
      if (from === void 0) from = 0;
      if (to === void 0) to = this.length;
      if (from <= to) this.forEachInner(f, from, to, 0);
      else this.forEachInvertedInner(f, from, to, 0);
  };
  // :: ((element: T, index: number) → U, ?number, ?number) → [U]
  // Map the given functions over the elements of the rope, producing
  // a flat array.
  $87b162019924db18$var$RopeSequence.prototype.map = function map(f, from, to) {
      if (from === void 0) from = 0;
      if (to === void 0) to = this.length;
      var result = [];
      this.forEach(function(elt, i) {
          return result.push(f(elt, i));
      }, from, to);
      return result;
  };
  // :: (?union<[T], RopeSequence<T>>) → RopeSequence<T>
  // Create a rope representing the given array, or return the rope
  // itself if a rope was given.
  $87b162019924db18$var$RopeSequence.from = function from(values) {
      if (values instanceof $87b162019924db18$var$RopeSequence) return values;
      return values && values.length ? new $87b162019924db18$var$Leaf(values) : $87b162019924db18$var$RopeSequence.empty;
  };
  var $87b162019924db18$var$Leaf = /*@__PURE__*/ function(RopeSequence) {
      function Leaf(values) {
          RopeSequence.call(this);
          this.values = values;
      }
      if (RopeSequence) Leaf.__proto__ = RopeSequence;
      Leaf.prototype = Object.create(RopeSequence && RopeSequence.prototype);
      Leaf.prototype.constructor = Leaf;
      var prototypeAccessors = {
          length: {
              configurable: true
          },
          depth: {
              configurable: true
          }
      };
      Leaf.prototype.flatten = function flatten() {
          return this.values;
      };
      Leaf.prototype.sliceInner = function sliceInner(from, to) {
          if (from == 0 && to == this.length) return this;
          return new Leaf(this.values.slice(from, to));
      };
      Leaf.prototype.getInner = function getInner(i) {
          return this.values[i];
      };
      Leaf.prototype.forEachInner = function forEachInner(f, from, to, start) {
          for(var i = from; i < to; i++){
              if (f(this.values[i], start + i) === false) return false;
          }
      };
      Leaf.prototype.forEachInvertedInner = function forEachInvertedInner(f, from, to, start) {
          for(var i = from - 1; i >= to; i--){
              if (f(this.values[i], start + i) === false) return false;
          }
      };
      Leaf.prototype.leafAppend = function leafAppend(other) {
          if (this.length + other.length <= $87b162019924db18$var$GOOD_LEAF_SIZE) return new Leaf(this.values.concat(other.flatten()));
      };
      Leaf.prototype.leafPrepend = function leafPrepend(other) {
          if (this.length + other.length <= $87b162019924db18$var$GOOD_LEAF_SIZE) return new Leaf(other.flatten().concat(this.values));
      };
      prototypeAccessors.length.get = function() {
          return this.values.length;
      };
      prototypeAccessors.depth.get = function() {
          return 0;
      };
      Object.defineProperties(Leaf.prototype, prototypeAccessors);
      return Leaf;
  }($87b162019924db18$var$RopeSequence);
  // :: RopeSequence
  // The empty rope sequence.
  $87b162019924db18$var$RopeSequence.empty = new $87b162019924db18$var$Leaf([]);
  var $87b162019924db18$var$Append = /*@__PURE__*/ function(RopeSequence) {
      function Append(left, right) {
          RopeSequence.call(this);
          this.left = left;
          this.right = right;
          this.length = left.length + right.length;
          this.depth = Math.max(left.depth, right.depth) + 1;
      }
      if (RopeSequence) Append.__proto__ = RopeSequence;
      Append.prototype = Object.create(RopeSequence && RopeSequence.prototype);
      Append.prototype.constructor = Append;
      Append.prototype.flatten = function flatten() {
          return this.left.flatten().concat(this.right.flatten());
      };
      Append.prototype.getInner = function getInner(i) {
          return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
      };
      Append.prototype.forEachInner = function forEachInner(f, from, to, start) {
          var leftLen = this.left.length;
          if (from < leftLen && this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false) return false;
          if (to > leftLen && this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false) return false;
      };
      Append.prototype.forEachInvertedInner = function forEachInvertedInner(f, from, to, start) {
          var leftLen = this.left.length;
          if (from > leftLen && this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false) return false;
          if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false) return false;
      };
      Append.prototype.sliceInner = function sliceInner(from, to) {
          if (from == 0 && to == this.length) return this;
          var leftLen = this.left.length;
          if (to <= leftLen) return this.left.slice(from, to);
          if (from >= leftLen) return this.right.slice(from - leftLen, to - leftLen);
          return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen));
      };
      Append.prototype.leafAppend = function leafAppend(other) {
          var inner = this.right.leafAppend(other);
          if (inner) return new Append(this.left, inner);
      };
      Append.prototype.leafPrepend = function leafPrepend(other) {
          var inner = this.left.leafPrepend(other);
          if (inner) return new Append(inner, this.right);
      };
      Append.prototype.appendInner = function appendInner(other) {
          if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) return new Append(this.left, new Append(this.right, other));
          return new Append(this, other);
      };
      return Append;
  }($87b162019924db18$var$RopeSequence);
  var $87b162019924db18$export$2e2bcd8739ae039 = $87b162019924db18$var$RopeSequence;
  
  
  
  
  // ProseMirror's history isn't simply a way to roll back to a previous
  // state, because ProseMirror supports applying changes without adding
  // them to the history (for example during collaboration).
  //
  // To this end, each 'Branch' (one for the undo history and one for
  // the redo history) keeps an array of 'Items', which can optionally
  // hold a step (an actual undoable change), and always hold a position
  // map (which is needed to move changes below them to apply to the
  // current document).
  //
  // An item that has both a step and a selection bookmark is the start
  // of an 'event' — a group of changes that will be undone or redone at
  // once. (It stores only the bookmark, since that way we don't have to
  // provide a document until the selection is actually applied, which
  // is useful when compressing.)
  // Used to schedule history compression
  const $a0a5029c887b2c7c$var$max_empty_items = 500;
  class $a0a5029c887b2c7c$var$Branch {
      constructor(items, eventCount){
          this.items = items;
          this.eventCount = eventCount;
      }
      // Pop the latest event off the branch's history and apply it
      // to a document transform.
      popEvent(state, preserveItems) {
          if (this.eventCount == 0) return null;
          let end = this.items.length;
          for(;; end--){
              let next = this.items.get(end - 1);
              if (next.selection) {
                  --end;
                  break;
              }
          }
          let remap, mapFrom;
          if (preserveItems) {
              remap = this.remapping(end, this.items.length);
              mapFrom = remap.maps.length;
          }
          let transform = state.tr;
          let selection, remaining;
          let addAfter = [], addBefore = [];
          this.items.forEach((item, i)=>{
              if (!item.step) {
                  if (!remap) {
                      remap = this.remapping(end, i + 1);
                      mapFrom = remap.maps.length;
                  }
                  mapFrom--;
                  addBefore.push(item);
                  return;
              }
              if (remap) {
                  addBefore.push(new $a0a5029c887b2c7c$var$Item(item.map));
                  let step = item.step.map(remap.slice(mapFrom)), map;
                  if (step && transform.maybeStep(step).doc) {
                      map = transform.mapping.maps[transform.mapping.maps.length - 1];
                      addAfter.push(new $a0a5029c887b2c7c$var$Item(map, undefined, undefined, addAfter.length + addBefore.length));
                  }
                  mapFrom--;
                  if (map) remap.appendMap(map, mapFrom);
              } else transform.maybeStep(item.step);
              if (item.selection) {
                  selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
                  remaining = new $a0a5029c887b2c7c$var$Branch(this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this.eventCount - 1);
                  return false;
              }
          }, this.items.length, 0);
          return {
              remaining: remaining,
              transform: transform,
              selection: selection
          };
      }
      // Create a new branch with the given transform added.
      addTransform(transform, selection, histOptions, preserveItems) {
          let newItems = [], eventCount = this.eventCount;
          let oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
          for(let i = 0; i < transform.steps.length; i++){
              let step = transform.steps[i].invert(transform.docs[i]);
              let item = new $a0a5029c887b2c7c$var$Item(transform.mapping.maps[i], step, selection), merged;
              if (merged = lastItem && lastItem.merge(item)) {
                  item = merged;
                  if (i) newItems.pop();
                  else oldItems = oldItems.slice(0, oldItems.length - 1);
              }
              newItems.push(item);
              if (selection) {
                  eventCount++;
                  selection = undefined;
              }
              if (!preserveItems) lastItem = item;
          }
          let overflow = eventCount - histOptions.depth;
          if (overflow > $a0a5029c887b2c7c$var$DEPTH_OVERFLOW) {
              oldItems = $a0a5029c887b2c7c$var$cutOffEvents(oldItems, overflow);
              eventCount -= overflow;
          }
          return new $a0a5029c887b2c7c$var$Branch(oldItems.append(newItems), eventCount);
      }
      remapping(from, to) {
          let maps = new (0, $77b6a7383a1cf23c$export$f5f785078011b62);
          this.items.forEach((item, i)=>{
              let mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from ? maps.maps.length - item.mirrorOffset : undefined;
              maps.appendMap(item.map, mirrorPos);
          }, from, to);
          return maps;
      }
      addMaps(array) {
          if (this.eventCount == 0) return this;
          return new $a0a5029c887b2c7c$var$Branch(this.items.append(array.map((map)=>new $a0a5029c887b2c7c$var$Item(map))), this.eventCount);
      }
      // When the collab module receives remote changes, the history has
      // to know about those, so that it can adjust the steps that were
      // rebased on top of the remote changes, and include the position
      // maps for the remote changes in its array of items.
      rebased(rebasedTransform, rebasedCount) {
          if (!this.eventCount) return this;
          let rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);
          let mapping = rebasedTransform.mapping;
          let newUntil = rebasedTransform.steps.length;
          let eventCount = this.eventCount;
          this.items.forEach((item)=>{
              if (item.selection) eventCount--;
          }, start);
          let iRebased = rebasedCount;
          this.items.forEach((item)=>{
              let pos = mapping.getMirror(--iRebased);
              if (pos == null) return;
              newUntil = Math.min(newUntil, pos);
              let map = mapping.maps[pos];
              if (item.step) {
                  let step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
                  let selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
                  if (selection) eventCount++;
                  rebasedItems.push(new $a0a5029c887b2c7c$var$Item(map, step, selection));
              } else rebasedItems.push(new $a0a5029c887b2c7c$var$Item(map));
          }, start);
          let newMaps = [];
          for(let i = rebasedCount; i < newUntil; i++)newMaps.push(new $a0a5029c887b2c7c$var$Item(mapping.maps[i]));
          let items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
          let branch = new $a0a5029c887b2c7c$var$Branch(items, eventCount);
          if (branch.emptyItemCount() > $a0a5029c887b2c7c$var$max_empty_items) branch = branch.compress(this.items.length - rebasedItems.length);
          return branch;
      }
      emptyItemCount() {
          let count = 0;
          this.items.forEach((item)=>{
              if (!item.step) count++;
          });
          return count;
      }
      // Compressing a branch means rewriting it to push the air (map-only
      // items) out. During collaboration, these naturally accumulate
      // because each remote change adds one. The `upto` argument is used
      // to ensure that only the items below a given level are compressed,
      // because `rebased` relies on a clean, untouched set of items in
      // order to associate old items with rebased steps.
      compress(upto = this.items.length) {
          let remap = this.remapping(0, upto), mapFrom = remap.maps.length;
          let items = [], events = 0;
          this.items.forEach((item, i)=>{
              if (i >= upto) {
                  items.push(item);
                  if (item.selection) events++;
              } else if (item.step) {
                  let step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
                  mapFrom--;
                  if (map) remap.appendMap(map, mapFrom);
                  if (step) {
                      let selection = item.selection && item.selection.map(remap.slice(mapFrom));
                      if (selection) events++;
                      let newItem = new $a0a5029c887b2c7c$var$Item(map.invert(), step, selection), merged, last = items.length - 1;
                      if (merged = items.length && items[last].merge(newItem)) items[last] = merged;
                      else items.push(newItem);
                  }
              } else if (item.map) mapFrom--;
          }, this.items.length, 0);
          return new $a0a5029c887b2c7c$var$Branch((0, $87b162019924db18$export$2e2bcd8739ae039).from(items.reverse()), events);
      }
  }
  $a0a5029c887b2c7c$var$Branch.empty = new $a0a5029c887b2c7c$var$Branch((0, $87b162019924db18$export$2e2bcd8739ae039).empty, 0);
  function $a0a5029c887b2c7c$var$cutOffEvents(items, n) {
      let cutPoint;
      items.forEach((item, i)=>{
          if (item.selection && n-- == 0) {
              cutPoint = i;
              return false;
          }
      });
      return items.slice(cutPoint);
  }
  class $a0a5029c887b2c7c$var$Item {
      constructor(// The (forward) step map for this item.
      map, // The inverted step
      step, // If this is non-null, this item is the start of a group, and
      // this selection is the starting selection for the group (the one
      // that was active before the first step was applied)
      selection, // If this item is the inverse of a previous mapping on the stack,
      // this points at the inverse's offset
      mirrorOffset){
          this.map = map;
          this.step = step;
          this.selection = selection;
          this.mirrorOffset = mirrorOffset;
      }
      merge(other) {
          if (this.step && other.step && !other.selection) {
              let step = other.step.merge(this.step);
              if (step) return new $a0a5029c887b2c7c$var$Item(step.getMap().invert(), step, this.selection);
          }
      }
  }
  // The value of the state field that tracks undo/redo history for that
  // state. Will be stored in the plugin state when the history plugin
  // is active.
  class $a0a5029c887b2c7c$var$HistoryState {
      constructor(done, undone, prevRanges, prevTime, prevComposition){
          this.done = done;
          this.undone = undone;
          this.prevRanges = prevRanges;
          this.prevTime = prevTime;
          this.prevComposition = prevComposition;
      }
  }
  const $a0a5029c887b2c7c$var$DEPTH_OVERFLOW = 20;
  // Record a transformation in undo history.
  function $a0a5029c887b2c7c$var$applyTransaction(history, state, tr, options) {
      let historyTr = tr.getMeta($a0a5029c887b2c7c$var$historyKey), rebased;
      if (historyTr) return historyTr.historyState;
      if (tr.getMeta($a0a5029c887b2c7c$var$closeHistoryKey)) history = new $a0a5029c887b2c7c$var$HistoryState(history.done, history.undone, null, 0, -1);
      let appended = tr.getMeta("appendedTransaction");
      if (tr.steps.length == 0) return history;
      else if (appended && appended.getMeta($a0a5029c887b2c7c$var$historyKey)) {
          if (appended.getMeta($a0a5029c887b2c7c$var$historyKey).redo) return new $a0a5029c887b2c7c$var$HistoryState(history.done.addTransform(tr, undefined, options, $a0a5029c887b2c7c$var$mustPreserveItems(state)), history.undone, $a0a5029c887b2c7c$var$rangesFor(tr.mapping.maps[tr.steps.length - 1]), history.prevTime, history.prevComposition);
          else return new $a0a5029c887b2c7c$var$HistoryState(history.done, history.undone.addTransform(tr, undefined, options, $a0a5029c887b2c7c$var$mustPreserveItems(state)), null, history.prevTime, history.prevComposition);
      } else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
          // Group transforms that occur in quick succession into one event.
          let composition = tr.getMeta("composition");
          let newGroup = history.prevTime == 0 || !appended && history.prevComposition != composition && (history.prevTime < (tr.time || 0) - options.newGroupDelay || !$a0a5029c887b2c7c$var$isAdjacentTo(tr, history.prevRanges));
          let prevRanges = appended ? $a0a5029c887b2c7c$var$mapRanges(history.prevRanges, tr.mapping) : $a0a5029c887b2c7c$var$rangesFor(tr.mapping.maps[tr.steps.length - 1]);
          return new $a0a5029c887b2c7c$var$HistoryState(history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : undefined, options, $a0a5029c887b2c7c$var$mustPreserveItems(state)), $a0a5029c887b2c7c$var$Branch.empty, prevRanges, tr.time, composition == null ? history.prevComposition : composition);
      } else if (rebased = tr.getMeta("rebased")) // Used by the collab module to tell the history that some of its
      // content has been rebased.
      return new $a0a5029c887b2c7c$var$HistoryState(history.done.rebased(tr, rebased), history.undone.rebased(tr, rebased), $a0a5029c887b2c7c$var$mapRanges(history.prevRanges, tr.mapping), history.prevTime, history.prevComposition);
      else return new $a0a5029c887b2c7c$var$HistoryState(history.done.addMaps(tr.mapping.maps), history.undone.addMaps(tr.mapping.maps), $a0a5029c887b2c7c$var$mapRanges(history.prevRanges, tr.mapping), history.prevTime, history.prevComposition);
  }
  function $a0a5029c887b2c7c$var$isAdjacentTo(transform, prevRanges) {
      if (!prevRanges) return false;
      if (!transform.docChanged) return true;
      let adjacent = false;
      transform.mapping.maps[0].forEach((start, end)=>{
          for(let i = 0; i < prevRanges.length; i += 2)if (start <= prevRanges[i + 1] && end >= prevRanges[i]) adjacent = true;
      });
      return adjacent;
  }
  function $a0a5029c887b2c7c$var$rangesFor(map) {
      let result = [];
      map.forEach((_from, _to, from, to)=>result.push(from, to));
      return result;
  }
  function $a0a5029c887b2c7c$var$mapRanges(ranges, mapping) {
      if (!ranges) return null;
      let result = [];
      for(let i = 0; i < ranges.length; i += 2){
          let from = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
          if (from <= to) result.push(from, to);
      }
      return result;
  }
  // Apply the latest event from one branch to the document and shift the event
  // onto the other branch.
  function $a0a5029c887b2c7c$var$histTransaction(history, state, dispatch, redo) {
      let preserveItems = $a0a5029c887b2c7c$var$mustPreserveItems(state);
      let histOptions = $a0a5029c887b2c7c$var$historyKey.get(state).spec.config;
      let pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
      if (!pop) return;
      let selection = pop.selection.resolve(pop.transform.doc);
      let added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
      let newHist = new $a0a5029c887b2c7c$var$HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0, -1);
      dispatch(pop.transform.setSelection(selection).setMeta($a0a5029c887b2c7c$var$historyKey, {
          redo: redo,
          historyState: newHist
      }).scrollIntoView());
  }
  let $a0a5029c887b2c7c$var$cachedPreserveItems = false, $a0a5029c887b2c7c$var$cachedPreserveItemsPlugins = null;
  // Check whether any plugin in the given state has a
  // `historyPreserveItems` property in its spec, in which case we must
  // preserve steps exactly as they came in, so that they can be
  // rebased.
  function $a0a5029c887b2c7c$var$mustPreserveItems(state) {
      let plugins = state.plugins;
      if ($a0a5029c887b2c7c$var$cachedPreserveItemsPlugins != plugins) {
          $a0a5029c887b2c7c$var$cachedPreserveItems = false;
          $a0a5029c887b2c7c$var$cachedPreserveItemsPlugins = plugins;
          for(let i = 0; i < plugins.length; i++)if (plugins[i].spec.historyPreserveItems) {
              $a0a5029c887b2c7c$var$cachedPreserveItems = true;
              break;
          }
      }
      return $a0a5029c887b2c7c$var$cachedPreserveItems;
  }
  /**
  Set a flag on the given transaction that will prevent further steps
  from being appended to an existing history event (so that they
  require a separate undo command to undo).
  */ function $a0a5029c887b2c7c$export$181a649d919c589e(tr) {
      return tr.setMeta($a0a5029c887b2c7c$var$closeHistoryKey, true);
  }
  const $a0a5029c887b2c7c$var$historyKey = new (0, $fc1204d3bb8e8da9$export$1692d8b0e89cecc3)("history");
  const $a0a5029c887b2c7c$var$closeHistoryKey = new (0, $fc1204d3bb8e8da9$export$1692d8b0e89cecc3)("closeHistory");
  /**
  Returns a plugin that enables the undo history for an editor. The
  plugin will track undo and redo stacks, which can be used with the
  [`undo`](https://prosemirror.net/docs/ref/#history.undo) and [`redo`](https://prosemirror.net/docs/ref/#history.redo) commands.
  
  You can set an `"addToHistory"` [metadata
  property](https://prosemirror.net/docs/ref/#state.Transaction.setMeta) of `false` on a transaction
  to prevent it from being rolled back by undo.
  */ function $a0a5029c887b2c7c$export$55abd4691b317664(config = {}) {
      config = {
          depth: config.depth || 100,
          newGroupDelay: config.newGroupDelay || 500
      };
      return new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          key: $a0a5029c887b2c7c$var$historyKey,
          state: {
              init () {
                  return new $a0a5029c887b2c7c$var$HistoryState($a0a5029c887b2c7c$var$Branch.empty, $a0a5029c887b2c7c$var$Branch.empty, null, 0, -1);
              },
              apply (tr, hist, state) {
                  return $a0a5029c887b2c7c$var$applyTransaction(hist, state, tr, config);
              }
          },
          config: config,
          props: {
              handleDOMEvents: {
                  beforeinput (view, e) {
                      let inputType = e.inputType;
                      let command = inputType == "historyUndo" ? $a0a5029c887b2c7c$export$21f930c44940fd98 : inputType == "historyRedo" ? $a0a5029c887b2c7c$export$1688e416fee0a49e : null;
                      if (!command) return false;
                      e.preventDefault();
                      return command(view.state, view.dispatch);
                  }
              }
          }
      });
  }
  /**
  A command function that undoes the last change, if any.
  */ const $a0a5029c887b2c7c$export$21f930c44940fd98 = (state, dispatch)=>{
      let hist = $a0a5029c887b2c7c$var$historyKey.getState(state);
      if (!hist || hist.done.eventCount == 0) return false;
      if (dispatch) $a0a5029c887b2c7c$var$histTransaction(hist, state, dispatch, false);
      return true;
  };
  /**
  A command function that redoes the last undone change, if any.
  */ const $a0a5029c887b2c7c$export$1688e416fee0a49e = (state, dispatch)=>{
      let hist = $a0a5029c887b2c7c$var$historyKey.getState(state);
      if (!hist || hist.undone.eventCount == 0) return false;
      if (dispatch) $a0a5029c887b2c7c$var$histTransaction(hist, state, dispatch, true);
      return true;
  };
  /**
  The amount of undoable events available in a given state.
  */ function $a0a5029c887b2c7c$export$f8a176c2b9a10bdb(state) {
      let hist = $a0a5029c887b2c7c$var$historyKey.getState(state);
      return hist ? hist.done.eventCount : 0;
  }
  /**
  The amount of redoable events available in a given editor state.
  */ function $a0a5029c887b2c7c$export$3ffe6b288e7d941b(state) {
      let hist = $a0a5029c887b2c7c$var$historyKey.getState(state);
      return hist ? hist.undone.eventCount : 0;
  }
  
  
  var $7688feb235d1dd81$exports = {};
  
  $parcel$export($7688feb235d1dd81$exports, "deleteSelection", () => $7688feb235d1dd81$export$e9a518a637d1e641);
  $parcel$export($7688feb235d1dd81$exports, "joinBackward", () => $7688feb235d1dd81$export$979097b097459299);
  $parcel$export($7688feb235d1dd81$exports, "joinTextblockBackward", () => $7688feb235d1dd81$export$1dce4f5c74f5f90f);
  $parcel$export($7688feb235d1dd81$exports, "joinTextblockForward", () => $7688feb235d1dd81$export$e796bb96d22be2cd);
  $parcel$export($7688feb235d1dd81$exports, "selectNodeBackward", () => $7688feb235d1dd81$export$52b8a4af68d19794);
  $parcel$export($7688feb235d1dd81$exports, "joinForward", () => $7688feb235d1dd81$export$bf432e340007f9ef);
  $parcel$export($7688feb235d1dd81$exports, "selectNodeForward", () => $7688feb235d1dd81$export$5835b52680b80cfd);
  $parcel$export($7688feb235d1dd81$exports, "joinUp", () => $7688feb235d1dd81$export$4bb15e6d4372b393);
  $parcel$export($7688feb235d1dd81$exports, "joinDown", () => $7688feb235d1dd81$export$8dd967a262b064bb);
  $parcel$export($7688feb235d1dd81$exports, "lift", () => $7688feb235d1dd81$export$590e8b2c435046d9);
  $parcel$export($7688feb235d1dd81$exports, "newlineInCode", () => $7688feb235d1dd81$export$a5d02b4b65e94f91);
  $parcel$export($7688feb235d1dd81$exports, "exitCode", () => $7688feb235d1dd81$export$634b78845598ff5b);
  $parcel$export($7688feb235d1dd81$exports, "createParagraphNear", () => $7688feb235d1dd81$export$d0f80ac1b4510888);
  $parcel$export($7688feb235d1dd81$exports, "liftEmptyBlock", () => $7688feb235d1dd81$export$a3574cc681852c08);
  $parcel$export($7688feb235d1dd81$exports, "splitBlockAs", () => $7688feb235d1dd81$export$8bf8350f33b1e5ab);
  $parcel$export($7688feb235d1dd81$exports, "splitBlock", () => $7688feb235d1dd81$export$e99155638ff4dff0);
  $parcel$export($7688feb235d1dd81$exports, "splitBlockKeepMarks", () => $7688feb235d1dd81$export$eeb429476568b72b);
  $parcel$export($7688feb235d1dd81$exports, "selectParentNode", () => $7688feb235d1dd81$export$a37f6aaa9169911d);
  $parcel$export($7688feb235d1dd81$exports, "selectAll", () => $7688feb235d1dd81$export$90aca4adda6ff0f5);
  $parcel$export($7688feb235d1dd81$exports, "selectTextblockStart", () => $7688feb235d1dd81$export$c3a64f3c9604a1b1);
  $parcel$export($7688feb235d1dd81$exports, "selectTextblockEnd", () => $7688feb235d1dd81$export$a66c1876556415e5);
  $parcel$export($7688feb235d1dd81$exports, "wrapIn", () => $7688feb235d1dd81$export$6e5e3c49755affd0);
  $parcel$export($7688feb235d1dd81$exports, "setBlockType", () => $7688feb235d1dd81$export$36987f561c736aad);
  $parcel$export($7688feb235d1dd81$exports, "toggleMark", () => $7688feb235d1dd81$export$797ad2667b8015a8);
  $parcel$export($7688feb235d1dd81$exports, "autoJoin", () => $7688feb235d1dd81$export$29903073afddcd8b);
  $parcel$export($7688feb235d1dd81$exports, "chainCommands", () => $7688feb235d1dd81$export$146a774cdef7663a);
  $parcel$export($7688feb235d1dd81$exports, "pcBaseKeymap", () => $7688feb235d1dd81$export$eb36e8971b04df36);
  $parcel$export($7688feb235d1dd81$exports, "macBaseKeymap", () => $7688feb235d1dd81$export$f292ad8dbd5063c8);
  $parcel$export($7688feb235d1dd81$exports, "baseKeymap", () => $7688feb235d1dd81$export$4a0c2b85b1f0a889);
  
  
  
  /**
  Delete the selection, if there is one.
  */ const $7688feb235d1dd81$export$e9a518a637d1e641 = (state, dispatch)=>{
      if (state.selection.empty) return false;
      if (dispatch) dispatch(state.tr.deleteSelection().scrollIntoView());
      return true;
  };
  function $7688feb235d1dd81$var$atBlockStart(state, view) {
      let { $cursor: $cursor } = state.selection;
      if (!$cursor || (view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)) return null;
      return $cursor;
  }
  /**
  If the selection is empty and at the start of a textblock, try to
  reduce the distance between that block and the one before it—if
  there's a block directly before it that can be joined, join them.
  If not, try to move the selected block closer to the next one in
  the document structure by lifting it out of its parent or moving it
  into a parent of the previous block. Will use the view for accurate
  (bidi-aware) start-of-textblock detection if given.
  */ const $7688feb235d1dd81$export$979097b097459299 = (state, dispatch, view)=>{
      let $cursor = $7688feb235d1dd81$var$atBlockStart(state, view);
      if (!$cursor) return false;
      let $cut = $7688feb235d1dd81$var$findCutBefore($cursor);
      // If there is no node before this, try to lift
      if (!$cut) {
          let range = $cursor.blockRange(), target = range && (0, $77b6a7383a1cf23c$export$f1508b72cc76a09e)(range);
          if (target == null) return false;
          if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
          return true;
      }
      let before = $cut.nodeBefore;
      // Apply the joining algorithm
      if (!before.type.spec.isolating && $7688feb235d1dd81$var$deleteBarrier(state, $cut, dispatch)) return true;
      // If the node below has no content and the node above is
      // selectable, delete the node below and select the one above.
      if ($cursor.parent.content.size == 0 && ($7688feb235d1dd81$var$textblockAt(before, "end") || (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(before))) {
          let delStep = (0, $77b6a7383a1cf23c$export$ed6ac67359824afd)(state.doc, $cursor.before(), $cursor.after(), (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty);
          if (delStep && delStep.slice.size < delStep.to - delStep.from) {
              if (dispatch) {
                  let tr = state.tr.step(delStep);
                  tr.setSelection($7688feb235d1dd81$var$textblockAt(before, "end") ? (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) : (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(tr.doc, $cut.pos - before.nodeSize));
                  dispatch(tr.scrollIntoView());
              }
              return true;
          }
      }
      // If the node before is an atom, delete it
      if (before.isAtom && $cut.depth == $cursor.depth - 1) {
          if (dispatch) dispatch(state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView());
          return true;
      }
      return false;
  };
  /**
  A more limited form of [`joinBackward`]($commands.joinBackward)
  that only tries to join the current textblock to the one before
  it, if the cursor is at the start of a textblock.
  */ const $7688feb235d1dd81$export$1dce4f5c74f5f90f = (state, dispatch, view)=>{
      let $cursor = $7688feb235d1dd81$var$atBlockStart(state, view);
      if (!$cursor) return false;
      let $cut = $7688feb235d1dd81$var$findCutBefore($cursor);
      return $cut ? $7688feb235d1dd81$var$joinTextblocksAround(state, $cut, dispatch) : false;
  };
  /**
  A more limited form of [`joinForward`]($commands.joinForward)
  that only tries to join the current textblock to the one after
  it, if the cursor is at the end of a textblock.
  */ const $7688feb235d1dd81$export$e796bb96d22be2cd = (state, dispatch, view)=>{
      let $cursor = $7688feb235d1dd81$var$atBlockEnd(state, view);
      if (!$cursor) return false;
      let $cut = $7688feb235d1dd81$var$findCutAfter($cursor);
      return $cut ? $7688feb235d1dd81$var$joinTextblocksAround(state, $cut, dispatch) : false;
  };
  function $7688feb235d1dd81$var$joinTextblocksAround(state, $cut, dispatch) {
      let before = $cut.nodeBefore, beforeText = before, beforePos = $cut.pos - 1;
      for(; !beforeText.isTextblock; beforePos--){
          if (beforeText.type.spec.isolating) return false;
          let child = beforeText.lastChild;
          if (!child) return false;
          beforeText = child;
      }
      let after = $cut.nodeAfter, afterText = after, afterPos = $cut.pos + 1;
      for(; !afterText.isTextblock; afterPos++){
          if (afterText.type.spec.isolating) return false;
          let child = afterText.firstChild;
          if (!child) return false;
          afterText = child;
      }
      let step = (0, $77b6a7383a1cf23c$export$ed6ac67359824afd)(state.doc, beforePos, afterPos, (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty);
      if (!step || step.from != beforePos || step instanceof (0, $77b6a7383a1cf23c$export$5c860b2e74034756) && step.slice.size >= afterPos - beforePos) return false;
      if (dispatch) {
          let tr = state.tr.step(step);
          tr.setSelection((0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).create(tr.doc, beforePos));
          dispatch(tr.scrollIntoView());
      }
      return true;
  }
  function $7688feb235d1dd81$var$textblockAt(node, side, only = false) {
      for(let scan = node; scan; scan = side == "start" ? scan.firstChild : scan.lastChild){
          if (scan.isTextblock) return true;
          if (only && scan.childCount != 1) return false;
      }
      return false;
  }
  /**
  When the selection is empty and at the start of a textblock, select
  the node before that textblock, if possible. This is intended to be
  bound to keys like backspace, after
  [`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward) or other deleting
  commands, as a fall-back behavior when the schema doesn't allow
  deletion at the selected point.
  */ const $7688feb235d1dd81$export$52b8a4af68d19794 = (state, dispatch, view)=>{
      let { $head: $head, empty: empty } = state.selection, $cut = $head;
      if (!empty) return false;
      if ($head.parent.isTextblock) {
          if (view ? !view.endOfTextblock("backward", state) : $head.parentOffset > 0) return false;
          $cut = $7688feb235d1dd81$var$findCutBefore($head);
      }
      let node = $cut && $cut.nodeBefore;
      if (!node || !(0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(node)) return false;
      if (dispatch) dispatch(state.tr.setSelection((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView());
      return true;
  };
  function $7688feb235d1dd81$var$findCutBefore($pos) {
      if (!$pos.parent.type.spec.isolating) for(let i = $pos.depth - 1; i >= 0; i--){
          if ($pos.index(i) > 0) return $pos.doc.resolve($pos.before(i + 1));
          if ($pos.node(i).type.spec.isolating) break;
      }
      return null;
  }
  function $7688feb235d1dd81$var$atBlockEnd(state, view) {
      let { $cursor: $cursor } = state.selection;
      if (!$cursor || (view ? !view.endOfTextblock("forward", state) : $cursor.parentOffset < $cursor.parent.content.size)) return null;
      return $cursor;
  }
  /**
  If the selection is empty and the cursor is at the end of a
  textblock, try to reduce or remove the boundary between that block
  and the one after it, either by joining them or by moving the other
  block closer to this one in the tree structure. Will use the view
  for accurate start-of-textblock detection if given.
  */ const $7688feb235d1dd81$export$bf432e340007f9ef = (state, dispatch, view)=>{
      let $cursor = $7688feb235d1dd81$var$atBlockEnd(state, view);
      if (!$cursor) return false;
      let $cut = $7688feb235d1dd81$var$findCutAfter($cursor);
      // If there is no node after this, there's nothing to do
      if (!$cut) return false;
      let after = $cut.nodeAfter;
      // Try the joining algorithm
      if ($7688feb235d1dd81$var$deleteBarrier(state, $cut, dispatch)) return true;
      // If the node above has no content and the node below is
      // selectable, delete the node above and select the one below.
      if ($cursor.parent.content.size == 0 && ($7688feb235d1dd81$var$textblockAt(after, "start") || (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(after))) {
          let delStep = (0, $77b6a7383a1cf23c$export$ed6ac67359824afd)(state.doc, $cursor.before(), $cursor.after(), (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty);
          if (delStep && delStep.slice.size < delStep.to - delStep.from) {
              if (dispatch) {
                  let tr = state.tr.step(delStep);
                  tr.setSelection($7688feb235d1dd81$var$textblockAt(after, "start") ? (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1) : (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(tr.doc, tr.mapping.map($cut.pos)));
                  dispatch(tr.scrollIntoView());
              }
              return true;
          }
      }
      // If the next node is an atom, delete it
      if (after.isAtom && $cut.depth == $cursor.depth - 1) {
          if (dispatch) dispatch(state.tr.delete($cut.pos, $cut.pos + after.nodeSize).scrollIntoView());
          return true;
      }
      return false;
  };
  /**
  When the selection is empty and at the end of a textblock, select
  the node coming after that textblock, if possible. This is intended
  to be bound to keys like delete, after
  [`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward) and similar deleting
  commands, to provide a fall-back behavior when the schema doesn't
  allow deletion at the selected point.
  */ const $7688feb235d1dd81$export$5835b52680b80cfd = (state, dispatch, view)=>{
      let { $head: $head, empty: empty } = state.selection, $cut = $head;
      if (!empty) return false;
      if ($head.parent.isTextblock) {
          if (view ? !view.endOfTextblock("forward", state) : $head.parentOffset < $head.parent.content.size) return false;
          $cut = $7688feb235d1dd81$var$findCutAfter($head);
      }
      let node = $cut && $cut.nodeAfter;
      if (!node || !(0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(node)) return false;
      if (dispatch) dispatch(state.tr.setSelection((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(state.doc, $cut.pos)).scrollIntoView());
      return true;
  };
  function $7688feb235d1dd81$var$findCutAfter($pos) {
      if (!$pos.parent.type.spec.isolating) for(let i = $pos.depth - 1; i >= 0; i--){
          let parent = $pos.node(i);
          if ($pos.index(i) + 1 < parent.childCount) return $pos.doc.resolve($pos.after(i + 1));
          if (parent.type.spec.isolating) break;
      }
      return null;
  }
  /**
  Join the selected block or, if there is a text selection, the
  closest ancestor block of the selection that can be joined, with
  the sibling above it.
  */ const $7688feb235d1dd81$export$4bb15e6d4372b393 = (state, dispatch)=>{
      let sel = state.selection, nodeSel = sel instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b), point;
      if (nodeSel) {
          if (sel.node.isTextblock || !(0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(state.doc, sel.from)) return false;
          point = sel.from;
      } else {
          point = (0, $77b6a7383a1cf23c$export$41b1d4cb5ceb3147)(state.doc, sel.from, -1);
          if (point == null) return false;
      }
      if (dispatch) {
          let tr = state.tr.join(point);
          if (nodeSel) tr.setSelection((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(tr.doc, point - state.doc.resolve(point).nodeBefore.nodeSize));
          dispatch(tr.scrollIntoView());
      }
      return true;
  };
  /**
  Join the selected block, or the closest ancestor of the selection
  that can be joined, with the sibling after it.
  */ const $7688feb235d1dd81$export$8dd967a262b064bb = (state, dispatch)=>{
      let sel = state.selection, point;
      if (sel instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b)) {
          if (sel.node.isTextblock || !(0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(state.doc, sel.to)) return false;
          point = sel.to;
      } else {
          point = (0, $77b6a7383a1cf23c$export$41b1d4cb5ceb3147)(state.doc, sel.to, 1);
          if (point == null) return false;
      }
      if (dispatch) dispatch(state.tr.join(point).scrollIntoView());
      return true;
  };
  /**
  Lift the selected block, or the closest ancestor block of the
  selection that can be lifted, out of its parent node.
  */ const $7688feb235d1dd81$export$590e8b2c435046d9 = (state, dispatch)=>{
      let { $from: $from, $to: $to } = state.selection;
      let range = $from.blockRange($to), target = range && (0, $77b6a7383a1cf23c$export$f1508b72cc76a09e)(range);
      if (target == null) return false;
      if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
      return true;
  };
  /**
  If the selection is in a node whose type has a truthy
  [`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, replace the
  selection with a newline character.
  */ const $7688feb235d1dd81$export$a5d02b4b65e94f91 = (state, dispatch)=>{
      let { $head: $head, $anchor: $anchor } = state.selection;
      if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
      if (dispatch) dispatch(state.tr.insertText("\n").scrollIntoView());
      return true;
  };
  function $7688feb235d1dd81$var$defaultBlockAt(match) {
      for(let i = 0; i < match.edgeCount; i++){
          let { type: type } = match.edge(i);
          if (type.isTextblock && !type.hasRequiredAttrs()) return type;
      }
      return null;
  }
  /**
  When the selection is in a node with a truthy
  [`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, create a
  default block after the code block, and move the cursor there.
  */ const $7688feb235d1dd81$export$634b78845598ff5b = (state, dispatch)=>{
      let { $head: $head, $anchor: $anchor } = state.selection;
      if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
      let above = $head.node(-1), after = $head.indexAfter(-1), type = $7688feb235d1dd81$var$defaultBlockAt(above.contentMatchAt(after));
      if (!type || !above.canReplaceWith(after, after, type)) return false;
      if (dispatch) {
          let pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
          tr.setSelection((0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near(tr.doc.resolve(pos), 1));
          dispatch(tr.scrollIntoView());
      }
      return true;
  };
  /**
  If a block node is selected, create an empty paragraph before (if
  it is its parent's first child) or after it.
  */ const $7688feb235d1dd81$export$d0f80ac1b4510888 = (state, dispatch)=>{
      let sel = state.selection, { $from: $from, $to: $to } = sel;
      if (sel instanceof (0, $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95) || $from.parent.inlineContent || $to.parent.inlineContent) return false;
      let type = $7688feb235d1dd81$var$defaultBlockAt($to.parent.contentMatchAt($to.indexAfter()));
      if (!type || !type.isTextblock) return false;
      if (dispatch) {
          let side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
          let tr = state.tr.insert(side, type.createAndFill());
          tr.setSelection((0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).create(tr.doc, side + 1));
          dispatch(tr.scrollIntoView());
      }
      return true;
  };
  /**
  If the cursor is in an empty textblock that can be lifted, lift the
  block.
  */ const $7688feb235d1dd81$export$a3574cc681852c08 = (state, dispatch)=>{
      let { $cursor: $cursor } = state.selection;
      if (!$cursor || $cursor.parent.content.size) return false;
      if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
          let before = $cursor.before();
          if ((0, $77b6a7383a1cf23c$export$5aaf008897aef029)(state.doc, before)) {
              if (dispatch) dispatch(state.tr.split(before).scrollIntoView());
              return true;
          }
      }
      let range = $cursor.blockRange(), target = range && (0, $77b6a7383a1cf23c$export$f1508b72cc76a09e)(range);
      if (target == null) return false;
      if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
      return true;
  };
  /**
  Create a variant of [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock) that uses
  a custom function to determine the type of the newly split off block.
  */ function $7688feb235d1dd81$export$8bf8350f33b1e5ab(splitNode) {
      return (state, dispatch)=>{
          let { $from: $from, $to: $to } = state.selection;
          if (state.selection instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b) && state.selection.node.isBlock) {
              if (!$from.parentOffset || !(0, $77b6a7383a1cf23c$export$5aaf008897aef029)(state.doc, $from.pos)) return false;
              if (dispatch) dispatch(state.tr.split($from.pos).scrollIntoView());
              return true;
          }
          if (!$from.parent.isBlock) return false;
          if (dispatch) {
              let atEnd = $to.parentOffset == $to.parent.content.size;
              let tr = state.tr;
              if (state.selection instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb) || state.selection instanceof (0, $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95)) tr.deleteSelection();
              let deflt = $from.depth == 0 ? null : $7688feb235d1dd81$var$defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
              let splitType = splitNode && splitNode($to.parent, atEnd);
              let types = splitType ? [
                  splitType
              ] : atEnd && deflt ? [
                  {
                      type: deflt
                  }
              ] : undefined;
              let can = (0, $77b6a7383a1cf23c$export$5aaf008897aef029)(tr.doc, tr.mapping.map($from.pos), 1, types);
              if (!types && !can && (0, $77b6a7383a1cf23c$export$5aaf008897aef029)(tr.doc, tr.mapping.map($from.pos), 1, deflt ? [
                  {
                      type: deflt
                  }
              ] : undefined)) {
                  if (deflt) types = [
                      {
                          type: deflt
                      }
                  ];
                  can = true;
              }
              if (can) {
                  tr.split(tr.mapping.map($from.pos), 1, types);
                  if (!atEnd && !$from.parentOffset && $from.parent.type != deflt) {
                      let first = tr.mapping.map($from.before()), $first = tr.doc.resolve(first);
                      if (deflt && $from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
                  }
              }
              dispatch(tr.scrollIntoView());
          }
          return true;
      };
  }
  /**
  Split the parent block of the selection. If the selection is a text
  selection, also delete its content.
  */ const $7688feb235d1dd81$export$e99155638ff4dff0 = $7688feb235d1dd81$export$8bf8350f33b1e5ab();
  /**
  Acts like [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock), but without
  resetting the set of active marks at the cursor.
  */ const $7688feb235d1dd81$export$eeb429476568b72b = (state, dispatch)=>{
      return $7688feb235d1dd81$export$e99155638ff4dff0(state, dispatch && ((tr)=>{
          let marks = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
          if (marks) tr.ensureMarks(marks);
          dispatch(tr);
      }));
  };
  /**
  Move the selection to the node wrapping the current selection, if
  any. (Will not select the document node.)
  */ const $7688feb235d1dd81$export$a37f6aaa9169911d = (state, dispatch)=>{
      let { $from: $from, to: to } = state.selection, pos;
      let same = $from.sharedDepth(to);
      if (same == 0) return false;
      pos = $from.before(same);
      if (dispatch) dispatch(state.tr.setSelection((0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).create(state.doc, pos)));
      return true;
  };
  /**
  Select the whole document.
  */ const $7688feb235d1dd81$export$90aca4adda6ff0f5 = (state, dispatch)=>{
      if (dispatch) dispatch(state.tr.setSelection(new (0, $fc1204d3bb8e8da9$export$c15d9ba76bdbcd95)(state.doc)));
      return true;
  };
  function $7688feb235d1dd81$var$joinMaybeClear(state, $pos, dispatch) {
      let before = $pos.nodeBefore, after = $pos.nodeAfter, index = $pos.index();
      if (!before || !after || !before.type.compatibleContent(after.type)) return false;
      if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
          if (dispatch) dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos).scrollIntoView());
          return true;
      }
      if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || (0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(state.doc, $pos.pos))) return false;
      if (dispatch) dispatch(state.tr.clearIncompatible($pos.pos, before.type, before.contentMatchAt(before.childCount)).join($pos.pos).scrollIntoView());
      return true;
  }
  function $7688feb235d1dd81$var$deleteBarrier(state, $cut, dispatch) {
      let before = $cut.nodeBefore, after = $cut.nodeAfter, conn, match;
      if (before.type.spec.isolating || after.type.spec.isolating) return false;
      if ($7688feb235d1dd81$var$joinMaybeClear(state, $cut, dispatch)) return true;
      let canDelAfter = $cut.parent.canReplace($cut.index(), $cut.index() + 1);
      if (canDelAfter && (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) && match.matchType(conn[0] || after.type).validEnd) {
          if (dispatch) {
              let end = $cut.pos + after.nodeSize, wrap = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
              for(let i = conn.length - 1; i >= 0; i--)wrap = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(conn[i].create(null, wrap));
              wrap = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(before.copy(wrap));
              let tr = state.tr.step(new (0, $77b6a7383a1cf23c$export$444ba800d6024a98)($cut.pos - 1, end, $cut.pos, end, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(wrap, 1, 0), conn.length, true));
              let joinAt = end + 2 * conn.length;
              if ((0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(tr.doc, joinAt)) tr.join(joinAt);
              dispatch(tr.scrollIntoView());
          }
          return true;
      }
      let selAfter = (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).findFrom($cut, 1);
      let range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && (0, $77b6a7383a1cf23c$export$f1508b72cc76a09e)(range);
      if (target != null && target >= $cut.depth) {
          if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
          return true;
      }
      if (canDelAfter && $7688feb235d1dd81$var$textblockAt(after, "start", true) && $7688feb235d1dd81$var$textblockAt(before, "end")) {
          let at = before, wrap = [];
          for(;;){
              wrap.push(at);
              if (at.isTextblock) break;
              at = at.lastChild;
          }
          let afterText = after, afterDepth = 1;
          for(; !afterText.isTextblock; afterText = afterText.firstChild)afterDepth++;
          if (at.canReplace(at.childCount, at.childCount, afterText.content)) {
              if (dispatch) {
                  let end = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
                  for(let i = wrap.length - 1; i >= 0; i--)end = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(wrap[i].copy(end));
                  let tr = state.tr.step(new (0, $77b6a7383a1cf23c$export$444ba800d6024a98)($cut.pos - wrap.length, $cut.pos + after.nodeSize, $cut.pos + afterDepth, $cut.pos + after.nodeSize - afterDepth, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(end, wrap.length, 0), 0, true));
                  dispatch(tr.scrollIntoView());
              }
              return true;
          }
      }
      return false;
  }
  function $7688feb235d1dd81$var$selectTextblockSide(side) {
      return function(state, dispatch) {
          let sel = state.selection, $pos = side < 0 ? sel.$from : sel.$to;
          let depth = $pos.depth;
          while($pos.node(depth).isInline){
              if (!depth) return false;
              depth--;
          }
          if (!$pos.node(depth).isTextblock) return false;
          if (dispatch) dispatch(state.tr.setSelection((0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).create(state.doc, side < 0 ? $pos.start(depth) : $pos.end(depth))));
          return true;
      };
  }
  /**
  Moves the cursor to the start of current text block.
  */ const $7688feb235d1dd81$export$c3a64f3c9604a1b1 = $7688feb235d1dd81$var$selectTextblockSide(-1);
  /**
  Moves the cursor to the end of current text block.
  */ const $7688feb235d1dd81$export$a66c1876556415e5 = $7688feb235d1dd81$var$selectTextblockSide(1);
  // Parameterized commands
  /**
  Wrap the selection in a node of the given type with the given
  attributes.
  */ function $7688feb235d1dd81$export$6e5e3c49755affd0(nodeType, attrs = null) {
      return function(state, dispatch) {
          let { $from: $from, $to: $to } = state.selection;
          let range = $from.blockRange($to), wrapping = range && (0, $77b6a7383a1cf23c$export$118cb9a83e81ba37)(range, nodeType, attrs);
          if (!wrapping) return false;
          if (dispatch) dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
          return true;
      };
  }
  /**
  Returns a command that tries to set the selected textblocks to the
  given node type with the given attributes.
  */ function $7688feb235d1dd81$export$36987f561c736aad(nodeType, attrs = null) {
      return function(state, dispatch) {
          let applicable = false;
          for(let i = 0; i < state.selection.ranges.length && !applicable; i++){
              let { $from: { pos: from }, $to: { pos: to } } = state.selection.ranges[i];
              state.doc.nodesBetween(from, to, (node, pos)=>{
                  if (applicable) return false;
                  if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
                  if (node.type == nodeType) applicable = true;
                  else {
                      let $pos = state.doc.resolve(pos), index = $pos.index();
                      applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
                  }
              });
          }
          if (!applicable) return false;
          if (dispatch) {
              let tr = state.tr;
              for(let i = 0; i < state.selection.ranges.length; i++){
                  let { $from: { pos: from }, $to: { pos: to } } = state.selection.ranges[i];
                  tr.setBlockType(from, to, nodeType, attrs);
              }
              dispatch(tr.scrollIntoView());
          }
          return true;
      };
  }
  function $7688feb235d1dd81$var$markApplies(doc, ranges, type) {
      for(let i = 0; i < ranges.length; i++){
          let { $from: $from, $to: $to } = ranges[i];
          let can = $from.depth == 0 ? doc.inlineContent && doc.type.allowsMarkType(type) : false;
          doc.nodesBetween($from.pos, $to.pos, (node)=>{
              if (can) return false;
              can = node.inlineContent && node.type.allowsMarkType(type);
          });
          if (can) return true;
      }
      return false;
  }
  /**
  Create a command function that toggles the given mark with the
  given attributes. Will return `false` when the current selection
  doesn't support that mark. This will remove the mark if any marks
  of that type exist in the selection, or add it otherwise. If the
  selection is empty, this applies to the [stored
  marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks) instead of a range of the
  document.
  */ function $7688feb235d1dd81$export$797ad2667b8015a8(markType, attrs = null) {
      return function(state, dispatch) {
          let { empty: empty, $cursor: $cursor, ranges: ranges } = state.selection;
          if (empty && !$cursor || !$7688feb235d1dd81$var$markApplies(state.doc, ranges, markType)) return false;
          if (dispatch) {
              if ($cursor) {
                  if (markType.isInSet(state.storedMarks || $cursor.marks())) dispatch(state.tr.removeStoredMark(markType));
                  else dispatch(state.tr.addStoredMark(markType.create(attrs)));
              } else {
                  let has = false, tr = state.tr;
                  for(let i = 0; !has && i < ranges.length; i++){
                      let { $from: $from, $to: $to } = ranges[i];
                      has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
                  }
                  for(let i = 0; i < ranges.length; i++){
                      let { $from: $from, $to: $to } = ranges[i];
                      if (has) tr.removeMark($from.pos, $to.pos, markType);
                      else {
                          let from = $from.pos, to = $to.pos, start = $from.nodeAfter, end = $to.nodeBefore;
                          let spaceStart = start && start.isText ? /^\s*/.exec(start.text)[0].length : 0;
                          let spaceEnd = end && end.isText ? /\s*$/.exec(end.text)[0].length : 0;
                          if (from + spaceStart < to) {
                              from += spaceStart;
                              to -= spaceEnd;
                          }
                          tr.addMark(from, to, markType.create(attrs));
                      }
                  }
                  dispatch(tr.scrollIntoView());
              }
          }
          return true;
      };
  }
  function $7688feb235d1dd81$var$wrapDispatchForJoin(dispatch, isJoinable) {
      return (tr)=>{
          if (!tr.isGeneric) return dispatch(tr);
          let ranges = [];
          for(let i = 0; i < tr.mapping.maps.length; i++){
              let map = tr.mapping.maps[i];
              for(let j = 0; j < ranges.length; j++)ranges[j] = map.map(ranges[j]);
              map.forEach((_s, _e, from, to)=>ranges.push(from, to));
          }
          // Figure out which joinable points exist inside those ranges,
          // by checking all node boundaries in their parent nodes.
          let joinable = [];
          for(let i = 0; i < ranges.length; i += 2){
              let from = ranges[i], to = ranges[i + 1];
              let $from = tr.doc.resolve(from), depth = $from.sharedDepth(to), parent = $from.node(depth);
              for(let index = $from.indexAfter(depth), pos = $from.after(depth + 1); pos <= to; ++index){
                  let after = parent.maybeChild(index);
                  if (!after) break;
                  if (index && joinable.indexOf(pos) == -1) {
                      let before = parent.child(index - 1);
                      if (before.type == after.type && isJoinable(before, after)) joinable.push(pos);
                  }
                  pos += after.nodeSize;
              }
          }
          // Join the joinable points
          joinable.sort((a, b)=>a - b);
          for(let i = joinable.length - 1; i >= 0; i--)if ((0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(tr.doc, joinable[i])) tr.join(joinable[i]);
          dispatch(tr);
      };
  }
  /**
  Wrap a command so that, when it produces a transform that causes
  two joinable nodes to end up next to each other, those are joined.
  Nodes are considered joinable when they are of the same type and
  when the `isJoinable` predicate returns true for them or, if an
  array of strings was passed, if their node type name is in that
  array.
  */ function $7688feb235d1dd81$export$29903073afddcd8b(command, isJoinable) {
      let canJoin = Array.isArray(isJoinable) ? (node)=>isJoinable.indexOf(node.type.name) > -1 : isJoinable;
      return (state, dispatch, view)=>command(state, dispatch && $7688feb235d1dd81$var$wrapDispatchForJoin(dispatch, canJoin), view);
  }
  /**
  Combine a number of command functions into a single function (which
  calls them one by one until one returns true).
  */ function $7688feb235d1dd81$export$146a774cdef7663a(...commands) {
      return function(state, dispatch, view) {
          for(let i = 0; i < commands.length; i++)if (commands[i](state, dispatch, view)) return true;
          return false;
      };
  }
  let $7688feb235d1dd81$var$backspace = $7688feb235d1dd81$export$146a774cdef7663a($7688feb235d1dd81$export$e9a518a637d1e641, $7688feb235d1dd81$export$979097b097459299, $7688feb235d1dd81$export$52b8a4af68d19794);
  let $7688feb235d1dd81$var$del = $7688feb235d1dd81$export$146a774cdef7663a($7688feb235d1dd81$export$e9a518a637d1e641, $7688feb235d1dd81$export$bf432e340007f9ef, $7688feb235d1dd81$export$5835b52680b80cfd);
  /**
  A basic keymap containing bindings not specific to any schema.
  Binds the following keys (when multiple commands are listed, they
  are chained with [`chainCommands`](https://prosemirror.net/docs/ref/#commands.chainCommands)):
  
  * **Enter** to `newlineInCode`, `createParagraphNear`, `liftEmptyBlock`, `splitBlock`
  * **Mod-Enter** to `exitCode`
  * **Backspace** and **Mod-Backspace** to `deleteSelection`, `joinBackward`, `selectNodeBackward`
  * **Delete** and **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
  * **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
  * **Mod-a** to `selectAll`
  */ const $7688feb235d1dd81$export$eb36e8971b04df36 = {
      "Enter": $7688feb235d1dd81$export$146a774cdef7663a($7688feb235d1dd81$export$a5d02b4b65e94f91, $7688feb235d1dd81$export$d0f80ac1b4510888, $7688feb235d1dd81$export$a3574cc681852c08, $7688feb235d1dd81$export$e99155638ff4dff0),
      "Mod-Enter": $7688feb235d1dd81$export$634b78845598ff5b,
      "Backspace": $7688feb235d1dd81$var$backspace,
      "Mod-Backspace": $7688feb235d1dd81$var$backspace,
      "Shift-Backspace": $7688feb235d1dd81$var$backspace,
      "Delete": $7688feb235d1dd81$var$del,
      "Mod-Delete": $7688feb235d1dd81$var$del,
      "Mod-a": $7688feb235d1dd81$export$90aca4adda6ff0f5
  };
  /**
  A copy of `pcBaseKeymap` that also binds **Ctrl-h** like Backspace,
  **Ctrl-d** like Delete, **Alt-Backspace** like Ctrl-Backspace, and
  **Ctrl-Alt-Backspace**, **Alt-Delete**, and **Alt-d** like
  Ctrl-Delete.
  */ const $7688feb235d1dd81$export$f292ad8dbd5063c8 = {
      "Ctrl-h": $7688feb235d1dd81$export$eb36e8971b04df36["Backspace"],
      "Alt-Backspace": $7688feb235d1dd81$export$eb36e8971b04df36["Mod-Backspace"],
      "Ctrl-d": $7688feb235d1dd81$export$eb36e8971b04df36["Delete"],
      "Ctrl-Alt-Backspace": $7688feb235d1dd81$export$eb36e8971b04df36["Mod-Delete"],
      "Alt-Delete": $7688feb235d1dd81$export$eb36e8971b04df36["Mod-Delete"],
      "Alt-d": $7688feb235d1dd81$export$eb36e8971b04df36["Mod-Delete"],
      "Ctrl-a": $7688feb235d1dd81$export$c3a64f3c9604a1b1,
      "Ctrl-e": $7688feb235d1dd81$export$a66c1876556415e5
  };
  for(let key in $7688feb235d1dd81$export$eb36e8971b04df36)$7688feb235d1dd81$export$f292ad8dbd5063c8[key] = $7688feb235d1dd81$export$eb36e8971b04df36[key];
  const $7688feb235d1dd81$var$mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os != "undefined" && os.platform ? os.platform() == "darwin" : false;
  /**
  Depending on the detected platform, this will hold
  [`pcBasekeymap`](https://prosemirror.net/docs/ref/#commands.pcBaseKeymap) or
  [`macBaseKeymap`](https://prosemirror.net/docs/ref/#commands.macBaseKeymap).
  */ const $7688feb235d1dd81$export$4a0c2b85b1f0a889 = $7688feb235d1dd81$var$mac ? $7688feb235d1dd81$export$f292ad8dbd5063c8 : $7688feb235d1dd81$export$eb36e8971b04df36;
  
  
  
  
  
  /**
  Create a plugin that, when added to a ProseMirror instance,
  causes a decoration to show up at the drop position when something
  is dragged over the editor.
  
  Nodes may add a `disableDropCursor` property to their spec to
  control the showing of a drop cursor inside them. This may be a
  boolean or a function, which will be called with a view and a
  position, and should return a boolean.
  */ function $815295bbb515b2f0$export$b8e3092a3bfa2062(options = {}) {
      return new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          view (editorView) {
              return new $815295bbb515b2f0$var$DropCursorView(editorView, options);
          }
      });
  }
  class $815295bbb515b2f0$var$DropCursorView {
      constructor(editorView, options){
          var _a;
          this.editorView = editorView;
          this.cursorPos = null;
          this.element = null;
          this.timeout = -1;
          this.width = (_a = options.width) !== null && _a !== void 0 ? _a : 1;
          this.color = options.color === false ? undefined : options.color || "black";
          this.class = options.class;
          this.handlers = [
              "dragover",
              "dragend",
              "drop",
              "dragleave"
          ].map((name)=>{
              let handler = (e)=>{
                  this[name](e);
              };
              editorView.dom.addEventListener(name, handler);
              return {
                  name: name,
                  handler: handler
              };
          });
      }
      destroy() {
          this.handlers.forEach(({ name: name, handler: handler })=>this.editorView.dom.removeEventListener(name, handler));
      }
      update(editorView, prevState) {
          if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
              if (this.cursorPos > editorView.state.doc.content.size) this.setCursor(null);
              else this.updateOverlay();
          }
      }
      setCursor(pos) {
          if (pos == this.cursorPos) return;
          this.cursorPos = pos;
          if (pos == null) {
              this.element.parentNode.removeChild(this.element);
              this.element = null;
          } else this.updateOverlay();
      }
      updateOverlay() {
          let $pos = this.editorView.state.doc.resolve(this.cursorPos);
          let isBlock = !$pos.parent.inlineContent, rect;
          if (isBlock) {
              let before = $pos.nodeBefore, after = $pos.nodeAfter;
              if (before || after) {
                  let node = this.editorView.nodeDOM(this.cursorPos - (before ? before.nodeSize : 0));
                  if (node) {
                      let nodeRect = node.getBoundingClientRect();
                      let top = before ? nodeRect.bottom : nodeRect.top;
                      if (before && after) top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
                      rect = {
                          left: nodeRect.left,
                          right: nodeRect.right,
                          top: top - this.width / 2,
                          bottom: top + this.width / 2
                      };
                  }
              }
          }
          if (!rect) {
              let coords = this.editorView.coordsAtPos(this.cursorPos);
              rect = {
                  left: coords.left - this.width / 2,
                  right: coords.left + this.width / 2,
                  top: coords.top,
                  bottom: coords.bottom
              };
          }
          let parent = this.editorView.dom.offsetParent;
          if (!this.element) {
              this.element = parent.appendChild(document.createElement("div"));
              if (this.class) this.element.className = this.class;
              this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;";
              if (this.color) this.element.style.backgroundColor = this.color;
          }
          this.element.classList.toggle("prosemirror-dropcursor-block", isBlock);
          this.element.classList.toggle("prosemirror-dropcursor-inline", !isBlock);
          let parentLeft, parentTop;
          if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
              parentLeft = -pageXOffset;
              parentTop = -pageYOffset;
          } else {
              let rect = parent.getBoundingClientRect();
              parentLeft = rect.left - parent.scrollLeft;
              parentTop = rect.top - parent.scrollTop;
          }
          this.element.style.left = rect.left - parentLeft + "px";
          this.element.style.top = rect.top - parentTop + "px";
          this.element.style.width = rect.right - rect.left + "px";
          this.element.style.height = rect.bottom - rect.top + "px";
      }
      scheduleRemoval(timeout) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(()=>this.setCursor(null), timeout);
      }
      dragover(event) {
          if (!this.editorView.editable) return;
          let pos = this.editorView.posAtCoords({
              left: event.clientX,
              top: event.clientY
          });
          let node = pos && pos.inside >= 0 && this.editorView.state.doc.nodeAt(pos.inside);
          let disableDropCursor = node && node.type.spec.disableDropCursor;
          let disabled = typeof disableDropCursor == "function" ? disableDropCursor(this.editorView, pos, event) : disableDropCursor;
          if (pos && !disabled) {
              let target = pos.pos;
              if (this.editorView.dragging && this.editorView.dragging.slice) {
                  let point = (0, $77b6a7383a1cf23c$export$2819d598d048fc9c)(this.editorView.state.doc, target, this.editorView.dragging.slice);
                  if (point != null) target = point;
              }
              this.setCursor(target);
              this.scheduleRemoval(5000);
          }
      }
      dragend() {
          this.scheduleRemoval(20);
      }
      drop() {
          this.scheduleRemoval(20);
      }
      dragleave(event) {
          if (event.target == this.editorView.dom || !this.editorView.dom.contains(event.relatedTarget)) this.setCursor(null);
      }
  }
  
  
  
  
  
  
  /**
  Gap cursor selections are represented using this class. Its
  `$anchor` and `$head` properties both point at the cursor position.
  */ class $316a4008916d809b$export$3d3d259665dcb4d4 extends (0, $fc1204d3bb8e8da9$export$52baac22726c72bf) {
      /**
      Create a gap cursor.
      */ constructor($pos){
          super($pos, $pos);
      }
      map(doc, mapping) {
          let $pos = doc.resolve(mapping.map(this.head));
          return $316a4008916d809b$export$3d3d259665dcb4d4.valid($pos) ? new $316a4008916d809b$export$3d3d259665dcb4d4($pos) : (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near($pos);
      }
      content() {
          return (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e).empty;
      }
      eq(other) {
          return other instanceof $316a4008916d809b$export$3d3d259665dcb4d4 && other.head == this.head;
      }
      toJSON() {
          return {
              type: "gapcursor",
              pos: this.head
          };
      }
      /**
      @internal
      */ static fromJSON(doc, json) {
          if (typeof json.pos != "number") throw new RangeError("Invalid input for GapCursor.fromJSON");
          return new $316a4008916d809b$export$3d3d259665dcb4d4(doc.resolve(json.pos));
      }
      /**
      @internal
      */ getBookmark() {
          return new $316a4008916d809b$var$GapBookmark(this.anchor);
      }
      /**
      @internal
      */ static valid($pos) {
          let parent = $pos.parent;
          if (parent.isTextblock || !$316a4008916d809b$var$closedBefore($pos) || !$316a4008916d809b$var$closedAfter($pos)) return false;
          let override = parent.type.spec.allowGapCursor;
          if (override != null) return override;
          let deflt = parent.contentMatchAt($pos.index()).defaultType;
          return deflt && deflt.isTextblock;
      }
      /**
      @internal
      */ static findGapCursorFrom($pos, dir, mustMove = false) {
          search: for(;;){
              if (!mustMove && $316a4008916d809b$export$3d3d259665dcb4d4.valid($pos)) return $pos;
              let pos = $pos.pos, next = null;
              // Scan up from this position
              for(let d = $pos.depth;; d--){
                  let parent = $pos.node(d);
                  if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
                      next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
                      break;
                  } else if (d == 0) return null;
                  pos += dir;
                  let $cur = $pos.doc.resolve(pos);
                  if ($316a4008916d809b$export$3d3d259665dcb4d4.valid($cur)) return $cur;
              }
              // And then down into the next node
              for(;;){
                  let inside = dir > 0 ? next.firstChild : next.lastChild;
                  if (!inside) {
                      if (next.isAtom && !next.isText && !(0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(next)) {
                          $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
                          mustMove = false;
                          continue search;
                      }
                      break;
                  }
                  next = inside;
                  pos += dir;
                  let $cur = $pos.doc.resolve(pos);
                  if ($316a4008916d809b$export$3d3d259665dcb4d4.valid($cur)) return $cur;
              }
              return null;
          }
      }
  }
  $316a4008916d809b$export$3d3d259665dcb4d4.prototype.visible = false;
  $316a4008916d809b$export$3d3d259665dcb4d4.findFrom = $316a4008916d809b$export$3d3d259665dcb4d4.findGapCursorFrom;
  (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).jsonID("gapcursor", $316a4008916d809b$export$3d3d259665dcb4d4);
  class $316a4008916d809b$var$GapBookmark {
      constructor(pos){
          this.pos = pos;
      }
      map(mapping) {
          return new $316a4008916d809b$var$GapBookmark(mapping.map(this.pos));
      }
      resolve(doc) {
          let $pos = doc.resolve(this.pos);
          return $316a4008916d809b$export$3d3d259665dcb4d4.valid($pos) ? new $316a4008916d809b$export$3d3d259665dcb4d4($pos) : (0, $fc1204d3bb8e8da9$export$52baac22726c72bf).near($pos);
      }
  }
  function $316a4008916d809b$var$closedBefore($pos) {
      for(let d = $pos.depth; d >= 0; d--){
          let index = $pos.index(d), parent = $pos.node(d);
          // At the start of this parent, look at next one
          if (index == 0) {
              if (parent.type.spec.isolating) return true;
              continue;
          }
          // See if the node before (or its first ancestor) is closed
          for(let before = parent.child(index - 1);; before = before.lastChild){
              if (before.childCount == 0 && !before.inlineContent || before.isAtom || before.type.spec.isolating) return true;
              if (before.inlineContent) return false;
          }
      }
      // Hit start of document
      return true;
  }
  function $316a4008916d809b$var$closedAfter($pos) {
      for(let d = $pos.depth; d >= 0; d--){
          let index = $pos.indexAfter(d), parent = $pos.node(d);
          if (index == parent.childCount) {
              if (parent.type.spec.isolating) return true;
              continue;
          }
          for(let after = parent.child(index);; after = after.firstChild){
              if (after.childCount == 0 && !after.inlineContent || after.isAtom || after.type.spec.isolating) return true;
              if (after.inlineContent) return false;
          }
      }
      return true;
  }
  /**
  Create a gap cursor plugin. When enabled, this will capture clicks
  near and arrow-key-motion past places that don't have a normally
  selectable position nearby, and create a gap cursor selection for
  them. The cursor is drawn as an element with class
  `ProseMirror-gapcursor`. You can either include
  `style/gapcursor.css` from the package's directory or add your own
  styles to make it visible.
  */ function $316a4008916d809b$export$54f46a1492d5247() {
      return new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          props: {
              decorations: $316a4008916d809b$var$drawGapCursor,
              createSelectionBetween (_view, $anchor, $head) {
                  return $anchor.pos == $head.pos && $316a4008916d809b$export$3d3d259665dcb4d4.valid($head) ? new $316a4008916d809b$export$3d3d259665dcb4d4($head) : null;
              },
              handleClick: $316a4008916d809b$var$handleClick,
              handleKeyDown: $316a4008916d809b$var$handleKeyDown,
              handleDOMEvents: {
                  beforeinput: $316a4008916d809b$var$beforeinput
              }
          }
      });
  }
  const $316a4008916d809b$var$handleKeyDown = (0, $1e062bab1b3a59ef$export$53f558754f8b9fd1)({
      "ArrowLeft": $316a4008916d809b$var$arrow("horiz", -1),
      "ArrowRight": $316a4008916d809b$var$arrow("horiz", 1),
      "ArrowUp": $316a4008916d809b$var$arrow("vert", -1),
      "ArrowDown": $316a4008916d809b$var$arrow("vert", 1)
  });
  function $316a4008916d809b$var$arrow(axis, dir) {
      const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
      return function(state, dispatch, view) {
          let sel = state.selection;
          let $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
          if (sel instanceof (0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb)) {
              if (!view.endOfTextblock(dirStr) || $start.depth == 0) return false;
              mustMove = false;
              $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
          }
          let $found = $316a4008916d809b$export$3d3d259665dcb4d4.findGapCursorFrom($start, dir, mustMove);
          if (!$found) return false;
          if (dispatch) dispatch(state.tr.setSelection(new $316a4008916d809b$export$3d3d259665dcb4d4($found)));
          return true;
      };
  }
  function $316a4008916d809b$var$handleClick(view, pos, event) {
      if (!view || !view.editable) return false;
      let $pos = view.state.doc.resolve(pos);
      if (!$316a4008916d809b$export$3d3d259665dcb4d4.valid($pos)) return false;
      let clickPos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY
      });
      if (clickPos && clickPos.inside > -1 && (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b).isSelectable(view.state.doc.nodeAt(clickPos.inside))) return false;
      view.dispatch(view.state.tr.setSelection(new $316a4008916d809b$export$3d3d259665dcb4d4($pos)));
      return true;
  }
  // This is a hack that, when a composition starts while a gap cursor
  // is active, quickly creates an inline context for the composition to
  // happen in, to avoid it being aborted by the DOM selection being
  // moved into a valid position.
  function $316a4008916d809b$var$beforeinput(view, event) {
      if (event.inputType != "insertCompositionText" || !(view.state.selection instanceof $316a4008916d809b$export$3d3d259665dcb4d4)) return false;
      let { $from: $from } = view.state.selection;
      let insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
      if (!insert) return false;
      let frag = (0, $59526ec4d3b41406$export$ffb0004e005737fa).empty;
      for(let i = insert.length - 1; i >= 0; i--)frag = (0, $59526ec4d3b41406$export$ffb0004e005737fa).from(insert[i].createAndFill(null, frag));
      let tr = view.state.tr.replace($from.pos, $from.pos, new (0, $59526ec4d3b41406$export$b3f2e2de3a8baa1e)(frag, 0, 0));
      tr.setSelection((0, $fc1204d3bb8e8da9$export$c2b25f346d19bcbb).near(tr.doc.resolve($from.pos + 1)));
      view.dispatch(tr);
      return false;
  }
  function $316a4008916d809b$var$drawGapCursor(state) {
      if (!(state.selection instanceof $316a4008916d809b$export$3d3d259665dcb4d4)) return null;
      let node = document.createElement("div");
      node.className = "ProseMirror-gapcursor";
      return (0, $f18febfa986513b3$export$93bf62eb445cec98).create(state.doc, [
          (0, $f18febfa986513b3$export$10e30b733df217ea).widget(state.selection.head, node, {
              key: "gapcursor"
          })
      ]);
  }
  
  
  var $112cbd55c5be2ecc$exports = {};
  
  $parcel$export($112cbd55c5be2ecc$exports, "MenuItem", () => $112cbd55c5be2ecc$export$2ce376c2cc3355c8);
  $parcel$export($112cbd55c5be2ecc$exports, "Dropdown", () => $112cbd55c5be2ecc$export$931cbfb6bfb85fc);
  $parcel$export($112cbd55c5be2ecc$exports, "DropdownSubmenu", () => $112cbd55c5be2ecc$export$ef5c18bf09e4884f);
  $parcel$export($112cbd55c5be2ecc$exports, "renderGrouped", () => $112cbd55c5be2ecc$export$32280ef9552def7c);
  $parcel$export($112cbd55c5be2ecc$exports, "icons", () => $112cbd55c5be2ecc$export$df03f54e09e486fa);
  $parcel$export($112cbd55c5be2ecc$exports, "joinUpItem", () => $112cbd55c5be2ecc$export$11baffb4edd2ca7f);
  $parcel$export($112cbd55c5be2ecc$exports, "liftItem", () => $112cbd55c5be2ecc$export$58f79fea701cb352);
  $parcel$export($112cbd55c5be2ecc$exports, "selectParentNodeItem", () => $112cbd55c5be2ecc$export$e7da091474561953);
  $parcel$export($112cbd55c5be2ecc$exports, "undoItem", () => $112cbd55c5be2ecc$export$e59d9ce4b90da7a2);
  $parcel$export($112cbd55c5be2ecc$exports, "redoItem", () => $112cbd55c5be2ecc$export$fdbfb7c42a1822a2);
  $parcel$export($112cbd55c5be2ecc$exports, "wrapItem", () => $112cbd55c5be2ecc$export$8f5e79e4d0433569);
  $parcel$export($112cbd55c5be2ecc$exports, "blockTypeItem", () => $112cbd55c5be2ecc$export$92aed8e2efb56f10);
  $parcel$export($112cbd55c5be2ecc$exports, "menuBar", () => $112cbd55c5be2ecc$export$4bada28d90893e2d);
  function $bc3ddbec0692f5c6$export$2e2bcd8739ae039() {
      var elt = arguments[0];
      if (typeof elt == "string") elt = document.createElement(elt);
      var i = 1, next = arguments[1];
      if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
          for(var name in next)if (Object.prototype.hasOwnProperty.call(next, name)) {
              var value = next[name];
              if (typeof value == "string") elt.setAttribute(name, value);
              else if (value != null) elt[name] = value;
          }
          i++;
      }
      for(; i < arguments.length; i++)$bc3ddbec0692f5c6$var$add(elt, arguments[i]);
      return elt;
  }
  function $bc3ddbec0692f5c6$var$add(elt, child) {
      if (typeof child == "string") elt.appendChild(document.createTextNode(child));
      else if (child == null) ;
      else if (child.nodeType != null) elt.appendChild(child);
      else if (Array.isArray(child)) for(var i = 0; i < child.length; i++)$bc3ddbec0692f5c6$var$add(elt, child[i]);
      else throw new RangeError("Unsupported child node: " + child);
  }
  
  
  
  
  
  const $112cbd55c5be2ecc$var$SVG = "http://www.w3.org/2000/svg";
  const $112cbd55c5be2ecc$var$XLINK = "http://www.w3.org/1999/xlink";
  const $112cbd55c5be2ecc$var$prefix$2 = "ProseMirror-icon";
  function $112cbd55c5be2ecc$var$hashPath(path) {
      let hash = 0;
      for(let i = 0; i < path.length; i++)hash = (hash << 5) - hash + path.charCodeAt(i) | 0;
      return hash;
  }
  function $112cbd55c5be2ecc$var$getIcon(root, icon) {
      let doc = (root.nodeType == 9 ? root : root.ownerDocument) || document;
      let node = doc.createElement("div");
      node.className = $112cbd55c5be2ecc$var$prefix$2;
      if (icon.path) {
          let { path: path, width: width, height: height } = icon;
          let name = "pm-icon-" + $112cbd55c5be2ecc$var$hashPath(path).toString(16);
          if (!doc.getElementById(name)) $112cbd55c5be2ecc$var$buildSVG(root, name, icon);
          let svg = node.appendChild(doc.createElementNS($112cbd55c5be2ecc$var$SVG, "svg"));
          svg.style.width = width / height + "em";
          let use = svg.appendChild(doc.createElementNS($112cbd55c5be2ecc$var$SVG, "use"));
          use.setAttributeNS($112cbd55c5be2ecc$var$XLINK, "href", /([^#]*)/.exec(doc.location.toString())[1] + "#" + name);
      } else if (icon.dom) node.appendChild(icon.dom.cloneNode(true));
      else {
          let { text: text, css: css } = icon;
          node.appendChild(doc.createElement("span")).textContent = text || "";
          if (css) node.firstChild.style.cssText = css;
      }
      return node;
  }
  function $112cbd55c5be2ecc$var$buildSVG(root, name, data) {
      let [doc, top] = root.nodeType == 9 ? [
          root,
          root.body
      ] : [
          root.ownerDocument || document,
          root
      ];
      let collection = doc.getElementById($112cbd55c5be2ecc$var$prefix$2 + "-collection");
      if (!collection) {
          collection = doc.createElementNS($112cbd55c5be2ecc$var$SVG, "svg");
          collection.id = $112cbd55c5be2ecc$var$prefix$2 + "-collection";
          collection.style.display = "none";
          top.insertBefore(collection, top.firstChild);
      }
      let sym = doc.createElementNS($112cbd55c5be2ecc$var$SVG, "symbol");
      sym.id = name;
      sym.setAttribute("viewBox", "0 0 " + data.width + " " + data.height);
      let path = sym.appendChild(doc.createElementNS($112cbd55c5be2ecc$var$SVG, "path"));
      path.setAttribute("d", data.path);
      collection.appendChild(sym);
  }
  const $112cbd55c5be2ecc$var$prefix$1 = "ProseMirror-menu";
  /**
  An icon or label that, when clicked, executes a command.
  */ class $112cbd55c5be2ecc$export$2ce376c2cc3355c8 {
      /**
      Create a menu item.
      */ constructor(/**
      The spec used to create this item.
      */ spec){
          this.spec = spec;
      }
      /**
      Renders the icon according to its [display
      spec](https://prosemirror.net/docs/ref/#menu.MenuItemSpec.display), and adds an event handler which
      executes the command when the representation is clicked.
      */ render(view) {
          let spec = this.spec;
          let dom = spec.render ? spec.render(view) : spec.icon ? $112cbd55c5be2ecc$var$getIcon(view.root, spec.icon) : spec.label ? (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", null, $112cbd55c5be2ecc$var$translate(view, spec.label)) : null;
          if (!dom) throw new RangeError("MenuItem without icon or label property");
          if (spec.title) {
              const title = typeof spec.title === "function" ? spec.title(view.state) : spec.title;
              dom.setAttribute("title", $112cbd55c5be2ecc$var$translate(view, title));
          }
          if (spec.class) dom.classList.add(spec.class);
          if (spec.css) dom.style.cssText += spec.css;
          dom.addEventListener("mousedown", (e)=>{
              e.preventDefault();
              if (!dom.classList.contains($112cbd55c5be2ecc$var$prefix$1 + "-disabled")) spec.run(view.state, view.dispatch, view, e);
          });
          function update(state) {
              if (spec.select) {
                  let selected = spec.select(state);
                  dom.style.display = selected ? "" : "none";
                  if (!selected) return false;
              }
              let enabled = true;
              if (spec.enable) {
                  enabled = spec.enable(state) || false;
                  $112cbd55c5be2ecc$var$setClass(dom, $112cbd55c5be2ecc$var$prefix$1 + "-disabled", !enabled);
              }
              if (spec.active) {
                  let active = enabled && spec.active(state) || false;
                  $112cbd55c5be2ecc$var$setClass(dom, $112cbd55c5be2ecc$var$prefix$1 + "-active", active);
              }
              return true;
          }
          return {
              dom: dom,
              update: update
          };
      }
  }
  function $112cbd55c5be2ecc$var$translate(view, text) {
      return view._props.translate ? view._props.translate(text) : text;
  }
  let $112cbd55c5be2ecc$var$lastMenuEvent = {
      time: 0,
      node: null
  };
  function $112cbd55c5be2ecc$var$markMenuEvent(e) {
      $112cbd55c5be2ecc$var$lastMenuEvent.time = Date.now();
      $112cbd55c5be2ecc$var$lastMenuEvent.node = e.target;
  }
  function $112cbd55c5be2ecc$var$isMenuEvent(wrapper) {
      return Date.now() - 100 < $112cbd55c5be2ecc$var$lastMenuEvent.time && $112cbd55c5be2ecc$var$lastMenuEvent.node && wrapper.contains($112cbd55c5be2ecc$var$lastMenuEvent.node);
  }
  /**
  A drop-down menu, displayed as a label with a downwards-pointing
  triangle to the right of it.
  */ class $112cbd55c5be2ecc$export$931cbfb6bfb85fc {
      /**
      Create a dropdown wrapping the elements.
      */ constructor(content, /**
      @internal
      */ options = {}){
          this.options = options;
          this.options = options || {};
          this.content = Array.isArray(content) ? content : [
              content
          ];
      }
      /**
      Render the dropdown menu and sub-items.
      */ render(view) {
          let content = $112cbd55c5be2ecc$var$renderDropdownItems(this.content, view);
          let win = view.dom.ownerDocument.defaultView || window;
          let label = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-dropdown " + (this.options.class || ""),
              style: this.options.css
          }, $112cbd55c5be2ecc$var$translate(view, this.options.label || ""));
          if (this.options.title) label.setAttribute("title", $112cbd55c5be2ecc$var$translate(view, this.options.title));
          let wrap = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-dropdown-wrap"
          }, label);
          let open = null;
          let listeningOnClose = null;
          let close = ()=>{
              if (open && open.close()) {
                  open = null;
                  win.removeEventListener("mousedown", listeningOnClose);
              }
          };
          label.addEventListener("mousedown", (e)=>{
              e.preventDefault();
              $112cbd55c5be2ecc$var$markMenuEvent(e);
              if (open) close();
              else {
                  open = this.expand(wrap, content.dom);
                  win.addEventListener("mousedown", listeningOnClose = ()=>{
                      if (!$112cbd55c5be2ecc$var$isMenuEvent(wrap)) close();
                  });
              }
          });
          function update(state) {
              let inner = content.update(state);
              wrap.style.display = inner ? "" : "none";
              return inner;
          }
          return {
              dom: wrap,
              update: update
          };
      }
      /**
      @internal
      */ expand(dom, items) {
          let menuDOM = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-dropdown-menu " + (this.options.class || "")
          }, items);
          let done = false;
          function close() {
              if (done) return false;
              done = true;
              dom.removeChild(menuDOM);
              return true;
          }
          dom.appendChild(menuDOM);
          return {
              close: close,
              node: menuDOM
          };
      }
  }
  function $112cbd55c5be2ecc$var$renderDropdownItems(items, view) {
      let rendered = [], updates = [];
      for(let i = 0; i < items.length; i++){
          let { dom: dom, update: update } = items[i].render(view);
          rendered.push((0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-dropdown-item"
          }, dom));
          updates.push(update);
      }
      return {
          dom: rendered,
          update: $112cbd55c5be2ecc$var$combineUpdates(updates, rendered)
      };
  }
  function $112cbd55c5be2ecc$var$combineUpdates(updates, nodes) {
      return (state)=>{
          let something = false;
          for(let i = 0; i < updates.length; i++){
              let up = updates[i](state);
              nodes[i].style.display = up ? "" : "none";
              if (up) something = true;
          }
          return something;
      };
  }
  /**
  Represents a submenu wrapping a group of elements that start
  hidden and expand to the right when hovered over or tapped.
  */ class $112cbd55c5be2ecc$export$ef5c18bf09e4884f {
      /**
      Creates a submenu for the given group of menu elements. The
      following options are recognized:
      */ constructor(content, /**
      @internal
      */ options = {}){
          this.options = options;
          this.content = Array.isArray(content) ? content : [
              content
          ];
      }
      /**
      Renders the submenu.
      */ render(view) {
          let items = $112cbd55c5be2ecc$var$renderDropdownItems(this.content, view);
          let win = view.dom.ownerDocument.defaultView || window;
          let label = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-submenu-label"
          }, $112cbd55c5be2ecc$var$translate(view, this.options.label || ""));
          let wrap = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-submenu-wrap"
          }, label, (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix$1 + "-submenu"
          }, items.dom));
          let listeningOnClose = null;
          label.addEventListener("mousedown", (e)=>{
              e.preventDefault();
              $112cbd55c5be2ecc$var$markMenuEvent(e);
              $112cbd55c5be2ecc$var$setClass(wrap, $112cbd55c5be2ecc$var$prefix$1 + "-submenu-wrap-active", false);
              if (!listeningOnClose) win.addEventListener("mousedown", listeningOnClose = ()=>{
                  if (!$112cbd55c5be2ecc$var$isMenuEvent(wrap)) {
                      wrap.classList.remove($112cbd55c5be2ecc$var$prefix$1 + "-submenu-wrap-active");
                      win.removeEventListener("mousedown", listeningOnClose);
                      listeningOnClose = null;
                  }
              });
          });
          function update(state) {
              let inner = items.update(state);
              wrap.style.display = inner ? "" : "none";
              return inner;
          }
          return {
              dom: wrap,
              update: update
          };
      }
  }
  /**
  Render the given, possibly nested, array of menu elements into a
  document fragment, placing separators between them (and ensuring no
  superfluous separators appear when some of the groups turn out to
  be empty).
  */ function $112cbd55c5be2ecc$export$32280ef9552def7c(view, content) {
      let result = document.createDocumentFragment();
      let updates = [], separators = [];
      for(let i = 0; i < content.length; i++){
          let items = content[i], localUpdates = [], localNodes = [];
          for(let j = 0; j < items.length; j++){
              let { dom: dom, update: update } = items[j].render(view);
              let span = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("span", {
                  class: $112cbd55c5be2ecc$var$prefix$1 + "item"
              }, dom);
              result.appendChild(span);
              localNodes.push(span);
              localUpdates.push(update);
          }
          if (localUpdates.length) {
              updates.push($112cbd55c5be2ecc$var$combineUpdates(localUpdates, localNodes));
              if (i < content.length - 1) separators.push(result.appendChild($112cbd55c5be2ecc$var$separator()));
          }
      }
      function update(state) {
          let something = false, needSep = false;
          for(let i = 0; i < updates.length; i++){
              let hasContent = updates[i](state);
              if (i) separators[i - 1].style.display = needSep && hasContent ? "" : "none";
              needSep = hasContent;
              if (hasContent) something = true;
          }
          return something;
      }
      return {
          dom: result,
          update: update
      };
  }
  function $112cbd55c5be2ecc$var$separator() {
      return (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("span", {
          class: $112cbd55c5be2ecc$var$prefix$1 + "separator"
      });
  }
  /**
  A set of basic editor-related icons. Contains the properties
  `join`, `lift`, `selectParentNode`, `undo`, `redo`, `strong`, `em`,
  `code`, `link`, `bulletList`, `orderedList`, and `blockquote`, each
  holding an object that can be used as the `icon` option to
  `MenuItem`.
  */ const $112cbd55c5be2ecc$export$df03f54e09e486fa = {
      join: {
          width: 800,
          height: 900,
          path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"
      },
      lift: {
          width: 1024,
          height: 1024,
          path: "M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"
      },
      selectParentNode: {
          text: "⬚",
          css: "font-weight: bold"
      },
      undo: {
          width: 1024,
          height: 1024,
          path: "M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"
      },
      redo: {
          width: 1024,
          height: 1024,
          path: "M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"
      },
      strong: {
          width: 805,
          height: 1024,
          path: "M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"
      },
      em: {
          width: 585,
          height: 1024,
          path: "M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"
      },
      code: {
          width: 896,
          height: 1024,
          path: "M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"
      },
      link: {
          width: 951,
          height: 1024,
          path: "M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"
      },
      bulletList: {
          width: 768,
          height: 896,
          path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
      },
      orderedList: {
          width: 768,
          height: 896,
          path: "M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"
      },
      blockquote: {
          width: 640,
          height: 896,
          path: "M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"
      }
  };
  /**
  Menu item for the `joinUp` command.
  */ const $112cbd55c5be2ecc$export$11baffb4edd2ca7f = new $112cbd55c5be2ecc$export$2ce376c2cc3355c8({
      title: "Join with above block",
      run: (0, $7688feb235d1dd81$export$4bb15e6d4372b393),
      select: (state)=>(0, $7688feb235d1dd81$export$4bb15e6d4372b393)(state),
      icon: $112cbd55c5be2ecc$export$df03f54e09e486fa.join
  });
  /**
  Menu item for the `lift` command.
  */ const $112cbd55c5be2ecc$export$58f79fea701cb352 = new $112cbd55c5be2ecc$export$2ce376c2cc3355c8({
      title: "Lift out of enclosing block",
      run: (0, $7688feb235d1dd81$export$590e8b2c435046d9),
      select: (state)=>(0, $7688feb235d1dd81$export$590e8b2c435046d9)(state),
      icon: $112cbd55c5be2ecc$export$df03f54e09e486fa.lift
  });
  /**
  Menu item for the `selectParentNode` command.
  */ const $112cbd55c5be2ecc$export$e7da091474561953 = new $112cbd55c5be2ecc$export$2ce376c2cc3355c8({
      title: "Select parent node",
      run: (0, $7688feb235d1dd81$export$a37f6aaa9169911d),
      select: (state)=>(0, $7688feb235d1dd81$export$a37f6aaa9169911d)(state),
      icon: $112cbd55c5be2ecc$export$df03f54e09e486fa.selectParentNode
  });
  /**
  Menu item for the `undo` command.
  */ let $112cbd55c5be2ecc$export$e59d9ce4b90da7a2 = new $112cbd55c5be2ecc$export$2ce376c2cc3355c8({
      title: "Undo last change",
      run: (0, $a0a5029c887b2c7c$export$21f930c44940fd98),
      enable: (state)=>(0, $a0a5029c887b2c7c$export$21f930c44940fd98)(state),
      icon: $112cbd55c5be2ecc$export$df03f54e09e486fa.undo
  });
  /**
  Menu item for the `redo` command.
  */ let $112cbd55c5be2ecc$export$fdbfb7c42a1822a2 = new $112cbd55c5be2ecc$export$2ce376c2cc3355c8({
      title: "Redo last undone change",
      run: (0, $a0a5029c887b2c7c$export$1688e416fee0a49e),
      enable: (state)=>(0, $a0a5029c887b2c7c$export$1688e416fee0a49e)(state),
      icon: $112cbd55c5be2ecc$export$df03f54e09e486fa.redo
  });
  /**
  Build a menu item for wrapping the selection in a given node type.
  Adds `run` and `select` properties to the ones present in
  `options`. `options.attrs` may be an object that provides
  attributes for the wrapping node.
  */ function $112cbd55c5be2ecc$export$8f5e79e4d0433569(nodeType, options) {
      let passedOptions = {
          run (state, dispatch) {
              return (0, $7688feb235d1dd81$export$6e5e3c49755affd0)(nodeType, options.attrs)(state, dispatch);
          },
          select (state) {
              return (0, $7688feb235d1dd81$export$6e5e3c49755affd0)(nodeType, options.attrs)(state);
          }
      };
      for(let prop in options)passedOptions[prop] = options[prop];
      return new $112cbd55c5be2ecc$export$2ce376c2cc3355c8(passedOptions);
  }
  /**
  Build a menu item for changing the type of the textblock around the
  selection to the given type. Provides `run`, `active`, and `select`
  properties. Others must be given in `options`. `options.attrs` may
  be an object to provide the attributes for the textblock node.
  */ function $112cbd55c5be2ecc$export$92aed8e2efb56f10(nodeType, options) {
      let command = (0, $7688feb235d1dd81$export$36987f561c736aad)(nodeType, options.attrs);
      let passedOptions = {
          run: command,
          enable (state) {
              return command(state);
          },
          active (state) {
              let { $from: $from, to: to, node: node } = state.selection;
              if (node) return node.hasMarkup(nodeType, options.attrs);
              return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs);
          }
      };
      for(let prop in options)passedOptions[prop] = options[prop];
      return new $112cbd55c5be2ecc$export$2ce376c2cc3355c8(passedOptions);
  }
  // Work around classList.toggle being broken in IE11
  function $112cbd55c5be2ecc$var$setClass(dom, cls, on) {
      if (on) dom.classList.add(cls);
      else dom.classList.remove(cls);
  }
  const $112cbd55c5be2ecc$var$prefix = "ProseMirror-menubar";
  function $112cbd55c5be2ecc$var$isIOS() {
      if (typeof navigator == "undefined") return false;
      let agent = navigator.userAgent;
      return !/Edge\/\d/.test(agent) && /AppleWebKit/.test(agent) && /Mobile\/\w+/.test(agent);
  }
  /**
  A plugin that will place a menu bar above the editor. Note that
  this involves wrapping the editor in an additional `<div>`.
  */ function $112cbd55c5be2ecc$export$4bada28d90893e2d(options) {
      return new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          view (editorView) {
              return new $112cbd55c5be2ecc$var$MenuBarView(editorView, options);
          }
      });
  }
  class $112cbd55c5be2ecc$var$MenuBarView {
      constructor(editorView, options){
          this.editorView = editorView;
          this.options = options;
          this.spacer = null;
          this.maxHeight = 0;
          this.widthForMaxHeight = 0;
          this.floating = false;
          this.scrollHandler = null;
          this.wrapper = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix + "-wrapper"
          });
          this.menu = this.wrapper.appendChild((0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
              class: $112cbd55c5be2ecc$var$prefix
          }));
          this.menu.className = $112cbd55c5be2ecc$var$prefix;
          if (editorView.dom.parentNode) editorView.dom.parentNode.replaceChild(this.wrapper, editorView.dom);
          this.wrapper.appendChild(editorView.dom);
          let { dom: dom, update: update } = $112cbd55c5be2ecc$export$32280ef9552def7c(this.editorView, this.options.content);
          this.contentUpdate = update;
          this.menu.appendChild(dom);
          this.update();
          if (options.floating && !$112cbd55c5be2ecc$var$isIOS()) {
              this.updateFloat();
              let potentialScrollers = $112cbd55c5be2ecc$var$getAllWrapping(this.wrapper);
              this.scrollHandler = (e)=>{
                  let root = this.editorView.root;
                  if (!(root.body || root).contains(this.wrapper)) potentialScrollers.forEach((el)=>el.removeEventListener("scroll", this.scrollHandler));
                  else this.updateFloat(e.target.getBoundingClientRect ? e.target : undefined);
              };
              potentialScrollers.forEach((el)=>el.addEventListener("scroll", this.scrollHandler));
          }
      }
      update() {
          this.contentUpdate(this.editorView.state);
          if (this.floating) this.updateScrollCursor();
          else {
              if (this.menu.offsetWidth != this.widthForMaxHeight) {
                  this.widthForMaxHeight = this.menu.offsetWidth;
                  this.maxHeight = 0;
              }
              if (this.menu.offsetHeight > this.maxHeight) {
                  this.maxHeight = this.menu.offsetHeight;
                  this.menu.style.minHeight = this.maxHeight + "px";
              }
          }
      }
      updateScrollCursor() {
          let selection = this.editorView.root.getSelection();
          if (!selection.focusNode) return;
          let rects = selection.getRangeAt(0).getClientRects();
          let selRect = rects[$112cbd55c5be2ecc$var$selectionIsInverted(selection) ? 0 : rects.length - 1];
          if (!selRect) return;
          let menuRect = this.menu.getBoundingClientRect();
          if (selRect.top < menuRect.bottom && selRect.bottom > menuRect.top) {
              let scrollable = $112cbd55c5be2ecc$var$findWrappingScrollable(this.wrapper);
              if (scrollable) scrollable.scrollTop -= menuRect.bottom - selRect.top;
          }
      }
      updateFloat(scrollAncestor) {
          let parent = this.wrapper, editorRect = parent.getBoundingClientRect(), top = scrollAncestor ? Math.max(0, scrollAncestor.getBoundingClientRect().top) : 0;
          if (this.floating) {
              if (editorRect.top >= top || editorRect.bottom < this.menu.offsetHeight + 10) {
                  this.floating = false;
                  this.menu.style.position = this.menu.style.left = this.menu.style.top = this.menu.style.width = "";
                  this.menu.style.display = "";
                  this.spacer.parentNode.removeChild(this.spacer);
                  this.spacer = null;
              } else {
                  let border = (parent.offsetWidth - parent.clientWidth) / 2;
                  this.menu.style.left = editorRect.left + border + "px";
                  this.menu.style.display = editorRect.top > (this.editorView.dom.ownerDocument.defaultView || window).innerHeight ? "none" : "";
                  if (scrollAncestor) this.menu.style.top = top + "px";
              }
          } else if (editorRect.top < top && editorRect.bottom >= this.menu.offsetHeight + 10) {
              this.floating = true;
              let menuRect = this.menu.getBoundingClientRect();
              this.menu.style.left = menuRect.left + "px";
              this.menu.style.width = menuRect.width + "px";
              if (scrollAncestor) this.menu.style.top = top + "px";
              this.menu.style.position = "fixed";
              this.spacer = (0, $bc3ddbec0692f5c6$export$2e2bcd8739ae039)("div", {
                  class: $112cbd55c5be2ecc$var$prefix + "-spacer",
                  style: `height: ${menuRect.height}px`
              });
              parent.insertBefore(this.spacer, this.menu);
          }
      }
      destroy() {
          if (this.wrapper.parentNode) this.wrapper.parentNode.replaceChild(this.editorView.dom, this.wrapper);
      }
  }
  // Not precise, but close enough
  function $112cbd55c5be2ecc$var$selectionIsInverted(selection) {
      if (selection.anchorNode == selection.focusNode) return selection.anchorOffset > selection.focusOffset;
      return selection.anchorNode.compareDocumentPosition(selection.focusNode) == Node.DOCUMENT_POSITION_FOLLOWING;
  }
  function $112cbd55c5be2ecc$var$findWrappingScrollable(node) {
      for(let cur = node.parentNode; cur; cur = cur.parentNode)if (cur.scrollHeight > cur.clientHeight) return cur;
  }
  function $112cbd55c5be2ecc$var$getAllWrapping(node) {
      let res = [
          node.ownerDocument.defaultView || window
      ];
      for(let cur = node.parentNode; cur; cur = cur.parentNode)res.push(cur);
      return res;
  }
  
  
  
  var $c23d0ce1004c18eb$exports = {};
  
  $parcel$export($c23d0ce1004c18eb$exports, "InputRule", () => $c23d0ce1004c18eb$export$9b55e2b000ad65f2);
  $parcel$export($c23d0ce1004c18eb$exports, "inputRules", () => $c23d0ce1004c18eb$export$9bc12e8cb1b5422f);
  $parcel$export($c23d0ce1004c18eb$exports, "undoInputRule", () => $c23d0ce1004c18eb$export$8b5652a4bcfffc13);
  $parcel$export($c23d0ce1004c18eb$exports, "emDash", () => $c23d0ce1004c18eb$export$d52f6fa9078fe05f);
  $parcel$export($c23d0ce1004c18eb$exports, "ellipsis", () => $c23d0ce1004c18eb$export$a5b94313d6908893);
  $parcel$export($c23d0ce1004c18eb$exports, "openDoubleQuote", () => $c23d0ce1004c18eb$export$4850414cc8d7db21);
  $parcel$export($c23d0ce1004c18eb$exports, "closeDoubleQuote", () => $c23d0ce1004c18eb$export$8b28a69da252f0ac);
  $parcel$export($c23d0ce1004c18eb$exports, "openSingleQuote", () => $c23d0ce1004c18eb$export$e175dfb3924d6671);
  $parcel$export($c23d0ce1004c18eb$exports, "closeSingleQuote", () => $c23d0ce1004c18eb$export$48be95a1ca65a2bd);
  $parcel$export($c23d0ce1004c18eb$exports, "smartQuotes", () => $c23d0ce1004c18eb$export$896039c3677cf296);
  $parcel$export($c23d0ce1004c18eb$exports, "wrappingInputRule", () => $c23d0ce1004c18eb$export$f7316d89abe4e1c1);
  $parcel$export($c23d0ce1004c18eb$exports, "textblockTypeInputRule", () => $c23d0ce1004c18eb$export$cc081314d3f6ffb0);
  
  
  /**
  Input rules are regular expressions describing a piece of text
  that, when typed, causes something to happen. This might be
  changing two dashes into an emdash, wrapping a paragraph starting
  with `"> "` into a blockquote, or something entirely different.
  */ class $c23d0ce1004c18eb$export$9b55e2b000ad65f2 {
      // :: (RegExp, union<string, (state: EditorState, match: [string], start: number, end: number) → ?Transaction>)
      /**
      Create an input rule. The rule applies when the user typed
      something and the text directly in front of the cursor matches
      `match`, which should end with `$`.
      
      The `handler` can be a string, in which case the matched text, or
      the first matched group in the regexp, is replaced by that
      string.
      
      Or a it can be a function, which will be called with the match
      array produced by
      [`RegExp.exec`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec),
      as well as the start and end of the matched range, and which can
      return a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) that describes the
      rule's effect, or null to indicate the input was not handled.
      */ constructor(/**
      @internal
      */ match, handler){
          this.match = match;
          this.match = match;
          this.handler = typeof handler == "string" ? $c23d0ce1004c18eb$var$stringHandler(handler) : handler;
      }
  }
  function $c23d0ce1004c18eb$var$stringHandler(string) {
      return function(state, match, start, end) {
          let insert = string;
          if (match[1]) {
              let offset = match[0].lastIndexOf(match[1]);
              insert += match[0].slice(offset + match[1].length);
              start += offset;
              let cutOff = start - end;
              if (cutOff > 0) {
                  insert = match[0].slice(offset - cutOff, offset) + insert;
                  start = end;
              }
          }
          return state.tr.insertText(insert, start, end);
      };
  }
  const $c23d0ce1004c18eb$var$MAX_MATCH = 500;
  /**
  Create an input rules plugin. When enabled, it will cause text
  input that matches any of the given rules to trigger the rule's
  action.
  */ function $c23d0ce1004c18eb$export$9bc12e8cb1b5422f({ rules: rules }) {
      let plugin = new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          state: {
              init () {
                  return null;
              },
              apply (tr, prev) {
                  let stored = tr.getMeta(this);
                  if (stored) return stored;
                  return tr.selectionSet || tr.docChanged ? null : prev;
              }
          },
          props: {
              handleTextInput (view, from, to, text) {
                  return $c23d0ce1004c18eb$var$run(view, from, to, text, rules, plugin);
              },
              handleDOMEvents: {
                  compositionend: (view)=>{
                      setTimeout(()=>{
                          let { $cursor: $cursor } = view.state.selection;
                          if ($cursor) $c23d0ce1004c18eb$var$run(view, $cursor.pos, $cursor.pos, "", rules, plugin);
                      });
                  }
              }
          },
          isInputRules: true
      });
      return plugin;
  }
  function $c23d0ce1004c18eb$var$run(view, from, to, text, rules, plugin) {
      if (view.composing) return false;
      let state = view.state, $from = state.doc.resolve(from);
      if ($from.parent.type.spec.code) return false;
      let textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - $c23d0ce1004c18eb$var$MAX_MATCH), $from.parentOffset, null, "￼") + text;
      for(let i = 0; i < rules.length; i++){
          let match = rules[i].match.exec(textBefore);
          let tr = match && rules[i].handler(state, match, from - (match[0].length - text.length), to);
          if (!tr) continue;
          view.dispatch(tr.setMeta(plugin, {
              transform: tr,
              from: from,
              to: to,
              text: text
          }));
          return true;
      }
      return false;
  }
  /**
  This is a command that will undo an input rule, if applying such a
  rule was the last thing that the user did.
  */ const $c23d0ce1004c18eb$export$8b5652a4bcfffc13 = (state, dispatch)=>{
      let plugins = state.plugins;
      for(let i = 0; i < plugins.length; i++){
          let plugin = plugins[i], undoable;
          if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
              if (dispatch) {
                  let tr = state.tr, toUndo = undoable.transform;
                  for(let j = toUndo.steps.length - 1; j >= 0; j--)tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
                  if (undoable.text) {
                      let marks = tr.doc.resolve(undoable.from).marks();
                      tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks));
                  } else tr.delete(undoable.from, undoable.to);
                  dispatch(tr);
              }
              return true;
          }
      }
      return false;
  };
  /**
  Converts double dashes to an emdash.
  */ const $c23d0ce1004c18eb$export$d52f6fa9078fe05f = new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(/--$/, "—");
  /**
  Converts three dots to an ellipsis character.
  */ const $c23d0ce1004c18eb$export$a5b94313d6908893 = new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(/\.\.\.$/, "…");
  /**
  “Smart” opening double quotes.
  */ const $c23d0ce1004c18eb$export$4850414cc8d7db21 = new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“");
  /**
  “Smart” closing double quotes.
  */ const $c23d0ce1004c18eb$export$8b28a69da252f0ac = new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(/"$/, "”");
  /**
  “Smart” opening single quotes.
  */ const $c23d0ce1004c18eb$export$e175dfb3924d6671 = new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘");
  /**
  “Smart” closing single quotes.
  */ const $c23d0ce1004c18eb$export$48be95a1ca65a2bd = new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(/'$/, "’");
  /**
  Smart-quote related input rules.
  */ const $c23d0ce1004c18eb$export$896039c3677cf296 = [
      $c23d0ce1004c18eb$export$4850414cc8d7db21,
      $c23d0ce1004c18eb$export$8b28a69da252f0ac,
      $c23d0ce1004c18eb$export$e175dfb3924d6671,
      $c23d0ce1004c18eb$export$48be95a1ca65a2bd
  ];
  /**
  Build an input rule for automatically wrapping a textblock when a
  given string is typed. The `regexp` argument is
  directly passed through to the `InputRule` constructor. You'll
  probably want the regexp to start with `^`, so that the pattern can
  only occur at the start of a textblock.
  
  `nodeType` is the type of node to wrap in. If it needs attributes,
  you can either pass them directly, or pass a function that will
  compute them from the regular expression match.
  
  By default, if there's a node with the same type above the newly
  wrapped node, the rule will try to [join](https://prosemirror.net/docs/ref/#transform.Transform.join) those
  two nodes. You can pass a join predicate, which takes a regular
  expression match and the node before the wrapped node, and can
  return a boolean to indicate whether a join should happen.
  */ function $c23d0ce1004c18eb$export$f7316d89abe4e1c1(regexp, nodeType, getAttrs = null, joinPredicate) {
      return new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(regexp, (state, match, start, end)=>{
          let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
          let tr = state.tr.delete(start, end);
          let $start = tr.doc.resolve(start), range = $start.blockRange(), wrapping = range && (0, $77b6a7383a1cf23c$export$118cb9a83e81ba37)(range, nodeType, attrs);
          if (!wrapping) return null;
          tr.wrap(range, wrapping);
          let before = tr.doc.resolve(start - 1).nodeBefore;
          if (before && before.type == nodeType && (0, $77b6a7383a1cf23c$export$f15f89fd9d8cc98a)(tr.doc, start - 1) && (!joinPredicate || joinPredicate(match, before))) tr.join(start - 1);
          return tr;
      });
  }
  /**
  Build an input rule that changes the type of a textblock when the
  matched text is typed into it. You'll usually want to start your
  regexp with `^` to that it is only matched at the start of a
  textblock. The optional `getAttrs` parameter can be used to compute
  the new node's attributes, and works the same as in the
  `wrappingInputRule` function.
  */ function $c23d0ce1004c18eb$export$cc081314d3f6ffb0(regexp, nodeType, getAttrs = null) {
      return new $c23d0ce1004c18eb$export$9b55e2b000ad65f2(regexp, (state, match, start, end)=>{
          let $start = state.doc.resolve(start);
          let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
          if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) return null;
          return state.tr.delete(start, end).setBlockType(start, start, nodeType, attrs);
      });
  }
  
  
  const $23cc8b60725a3082$var$prefix = "ProseMirror-prompt";
  function $23cc8b60725a3082$var$openPrompt(options) {
      let wrapper = document.body.appendChild(document.createElement("div"));
      wrapper.className = $23cc8b60725a3082$var$prefix;
      let mouseOutside = (e)=>{
          if (!wrapper.contains(e.target)) close();
      };
      setTimeout(()=>window.addEventListener("mousedown", mouseOutside), 50);
      let close = ()=>{
          window.removeEventListener("mousedown", mouseOutside);
          if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
      };
      let domFields = [];
      for(let name in options.fields)domFields.push(options.fields[name].render());
      let submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.className = $23cc8b60725a3082$var$prefix + "-submit";
      submitButton.textContent = "OK";
      let cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = $23cc8b60725a3082$var$prefix + "-cancel";
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", close);
      let form = wrapper.appendChild(document.createElement("form"));
      if (options.title) form.appendChild(document.createElement("h5")).textContent = options.title;
      domFields.forEach((field)=>{
          form.appendChild(document.createElement("div")).appendChild(field);
      });
      let buttons = form.appendChild(document.createElement("div"));
      buttons.className = $23cc8b60725a3082$var$prefix + "-buttons";
      buttons.appendChild(submitButton);
      buttons.appendChild(document.createTextNode(" "));
      buttons.appendChild(cancelButton);
      let box = wrapper.getBoundingClientRect();
      wrapper.style.top = (window.innerHeight - box.height) / 2 + "px";
      wrapper.style.left = (window.innerWidth - box.width) / 2 + "px";
      let submit = ()=>{
          let params = $23cc8b60725a3082$var$getValues(options.fields, domFields);
          if (params) {
              close();
              options.callback(params);
          }
      };
      form.addEventListener("submit", (e)=>{
          e.preventDefault();
          submit();
      });
      form.addEventListener("keydown", (e)=>{
          if (e.keyCode == 27) {
              e.preventDefault();
              close();
          } else if (e.keyCode == 13 && !(e.ctrlKey || e.metaKey || e.shiftKey)) {
              e.preventDefault();
              submit();
          } else if (e.keyCode == 9) window.setTimeout(()=>{
              if (!wrapper.contains(document.activeElement)) close();
          }, 500);
      });
      let input = form.elements[0];
      if (input) input.focus();
  }
  function $23cc8b60725a3082$var$getValues(fields, domFields) {
      let result = Object.create(null), i = 0;
      for(let name in fields){
          let field = fields[name], dom = domFields[i++];
          let value = field.read(dom), bad = field.validate(value);
          if (bad) {
              $23cc8b60725a3082$var$reportInvalid(dom, bad);
              return null;
          }
          result[name] = field.clean(value);
      }
      return result;
  }
  function $23cc8b60725a3082$var$reportInvalid(dom, message) {
      // FIXME this is awful and needs a lot more work
      let parent = dom.parentNode;
      let msg = parent.appendChild(document.createElement("div"));
      msg.style.left = dom.offsetLeft + dom.offsetWidth + 2 + "px";
      msg.style.top = dom.offsetTop - 5 + "px";
      msg.className = "ProseMirror-invalid";
      msg.textContent = message;
      setTimeout(()=>parent.removeChild(msg), 1500);
  }
  /**
  The type of field that `openPrompt` expects to be passed to it.
  */ class $23cc8b60725a3082$var$Field {
      /**
      Create a field with the given options. Options support by all
      field types are:
      */ constructor(/**
      @internal
      */ options){
          this.options = options;
      }
      /**
      Read the field's value from its DOM node.
      */ read(dom) {
          return dom.value;
      }
      /**
      A field-type-specific validation function.
      */ validateType(value) {
          return null;
      }
      /**
      @internal
      */ validate(value) {
          if (!value && this.options.required) return "Required field";
          return this.validateType(value) || (this.options.validate ? this.options.validate(value) : null);
      }
      clean(value) {
          return this.options.clean ? this.options.clean(value) : value;
      }
  }
  /**
  A field class for single-line text fields.
  */ class $23cc8b60725a3082$var$TextField extends $23cc8b60725a3082$var$Field {
      render() {
          let input = document.createElement("input");
          input.type = "text";
          input.placeholder = this.options.label;
          input.value = this.options.value || "";
          input.autocomplete = "off";
          return input;
      }
  }
  // Helpers to create specific types of items
  function $23cc8b60725a3082$var$canInsert(state, nodeType) {
      let $from = state.selection.$from;
      for(let d = $from.depth; d >= 0; d--){
          let index = $from.index(d);
          if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
      }
      return false;
  }
  function $23cc8b60725a3082$var$insertImageItem(nodeType) {
      return new (0, $112cbd55c5be2ecc$export$2ce376c2cc3355c8)({
          title: "Insert image",
          label: "Image",
          enable (state) {
              return $23cc8b60725a3082$var$canInsert(state, nodeType);
          },
          run (state, _, view) {
              let { from: from, to: to } = state.selection, attrs = null;
              if (state.selection instanceof (0, $fc1204d3bb8e8da9$export$e2940151ac854c0b) && state.selection.node.type == nodeType) attrs = state.selection.node.attrs;
              $23cc8b60725a3082$var$openPrompt({
                  title: "Insert image",
                  fields: {
                      src: new $23cc8b60725a3082$var$TextField({
                          label: "Location",
                          required: true,
                          value: attrs && attrs.src
                      }),
                      title: new $23cc8b60725a3082$var$TextField({
                          label: "Title",
                          value: attrs && attrs.title
                      }),
                      alt: new $23cc8b60725a3082$var$TextField({
                          label: "Description",
                          value: attrs ? attrs.alt : state.doc.textBetween(from, to, " ")
                      })
                  },
                  callback (attrs) {
                      view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)));
                      view.focus();
                  }
              });
          }
      });
  }
  function $23cc8b60725a3082$var$cmdItem(cmd, options) {
      let passedOptions = {
          label: options.title,
          run: cmd
      };
      for(let prop in options)passedOptions[prop] = options[prop];
      if (!options.enable && !options.select) passedOptions[options.enable ? "enable" : "select"] = (state)=>cmd(state);
      return new (0, $112cbd55c5be2ecc$export$2ce376c2cc3355c8)(passedOptions);
  }
  function $23cc8b60725a3082$var$markActive(state, type) {
      let { from: from, $from: $from, to: to, empty: empty } = state.selection;
      if (empty) return !!type.isInSet(state.storedMarks || $from.marks());
      else return state.doc.rangeHasMark(from, to, type);
  }
  function $23cc8b60725a3082$var$markItem(markType, options) {
      let passedOptions = {
          active (state) {
              return $23cc8b60725a3082$var$markActive(state, markType);
          }
      };
      for(let prop in options)passedOptions[prop] = options[prop];
      return $23cc8b60725a3082$var$cmdItem((0, $7688feb235d1dd81$export$797ad2667b8015a8)(markType), passedOptions);
  }
  function $23cc8b60725a3082$var$linkItem(markType) {
      return new (0, $112cbd55c5be2ecc$export$2ce376c2cc3355c8)({
          title: "Add or remove link",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).link,
          active (state) {
              return $23cc8b60725a3082$var$markActive(state, markType);
          },
          enable (state) {
              return !state.selection.empty;
          },
          run (state, dispatch, view) {
              if ($23cc8b60725a3082$var$markActive(state, markType)) {
                  (0, $7688feb235d1dd81$export$797ad2667b8015a8)(markType)(state, dispatch);
                  return true;
              }
              $23cc8b60725a3082$var$openPrompt({
                  title: "Create a link",
                  fields: {
                      href: new $23cc8b60725a3082$var$TextField({
                          label: "Link target",
                          required: true
                      }),
                      title: new $23cc8b60725a3082$var$TextField({
                          label: "Title"
                      })
                  },
                  callback (attrs) {
                      (0, $7688feb235d1dd81$export$797ad2667b8015a8)(markType, attrs)(view.state, view.dispatch);
                      view.focus();
                  }
              });
          }
      });
  }
  function $23cc8b60725a3082$var$wrapListItem(nodeType, options) {
      return $23cc8b60725a3082$var$cmdItem((0, $053d3e35c0447a93$export$a8aef45c6262afee)(nodeType, options.attrs), options);
  }
  /**
  Given a schema, look for default mark and node types in it and
  return an object with relevant menu items relating to those marks.
  */ function $23cc8b60725a3082$export$630b7735451169d5(schema) {
      let r = {};
      let mark;
      if (mark = schema.marks.strong) r.toggleStrong = $23cc8b60725a3082$var$markItem(mark, {
          title: "Toggle strong style",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).strong
      });
      if (mark = schema.marks.em) r.toggleEm = $23cc8b60725a3082$var$markItem(mark, {
          title: "Toggle emphasis",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).em
      });
      if (mark = schema.marks.code) r.toggleCode = $23cc8b60725a3082$var$markItem(mark, {
          title: "Toggle code font",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).code
      });
      if (mark = schema.marks.link) r.toggleLink = $23cc8b60725a3082$var$linkItem(mark);
      let node;
      if (node = schema.nodes.image) r.insertImage = $23cc8b60725a3082$var$insertImageItem(node);
      if (node = schema.nodes.bullet_list) r.wrapBulletList = $23cc8b60725a3082$var$wrapListItem(node, {
          title: "Wrap in bullet list",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).bulletList
      });
      if (node = schema.nodes.ordered_list) r.wrapOrderedList = $23cc8b60725a3082$var$wrapListItem(node, {
          title: "Wrap in ordered list",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).orderedList
      });
      if (node = schema.nodes.blockquote) r.wrapBlockQuote = (0, $112cbd55c5be2ecc$export$8f5e79e4d0433569)(node, {
          title: "Wrap in block quote",
          icon: (0, $112cbd55c5be2ecc$export$df03f54e09e486fa).blockquote
      });
      if (node = schema.nodes.paragraph) r.makeParagraph = (0, $112cbd55c5be2ecc$export$92aed8e2efb56f10)(node, {
          title: "Change to paragraph",
          label: "Plain"
      });
      if (node = schema.nodes.code_block) r.makeCodeBlock = (0, $112cbd55c5be2ecc$export$92aed8e2efb56f10)(node, {
          title: "Change to code block",
          label: "Code"
      });
      if (node = schema.nodes.heading) for(let i = 1; i <= 10; i++)r["makeHead" + i] = (0, $112cbd55c5be2ecc$export$92aed8e2efb56f10)(node, {
          title: "Change to heading " + i,
          label: "Level " + i,
          attrs: {
              level: i
          }
      });
      if (node = schema.nodes.horizontal_rule) {
          let hr = node;
          r.insertHorizontalRule = new (0, $112cbd55c5be2ecc$export$2ce376c2cc3355c8)({
              title: "Insert horizontal rule",
              label: "Horizontal rule",
              enable (state) {
                  return $23cc8b60725a3082$var$canInsert(state, hr);
              },
              run (state, dispatch) {
                  dispatch(state.tr.replaceSelectionWith(hr.create()));
              }
          });
      }
      let cut = (arr)=>arr.filter((x)=>x);
      r.insertMenu = new (0, $112cbd55c5be2ecc$export$931cbfb6bfb85fc)(cut([
          r.insertImage,
          r.insertHorizontalRule
      ]), {
          label: "Insert"
      });
      r.typeMenu = new (0, $112cbd55c5be2ecc$export$931cbfb6bfb85fc)(cut([
          r.makeParagraph,
          r.makeCodeBlock,
          r.makeHead1 && new (0, $112cbd55c5be2ecc$export$ef5c18bf09e4884f)(cut([
              r.makeHead1,
              r.makeHead2,
              r.makeHead3,
              r.makeHead4,
              r.makeHead5,
              r.makeHead6
          ]), {
              label: "Heading"
          })
      ]), {
          label: "Type..."
      });
      r.inlineMenu = [
          cut([
              r.toggleStrong,
              r.toggleEm,
              r.toggleCode,
              r.toggleLink
          ])
      ];
      r.blockMenu = [
          cut([
              r.wrapBulletList,
              r.wrapOrderedList,
              r.wrapBlockQuote,
              (0, $112cbd55c5be2ecc$export$11baffb4edd2ca7f),
              (0, $112cbd55c5be2ecc$export$58f79fea701cb352),
              (0, $112cbd55c5be2ecc$export$e7da091474561953)
          ])
      ];
      r.fullMenu = r.inlineMenu.concat([
          [
              r.insertMenu,
              r.typeMenu
          ]
      ], [
          [
              (0, $112cbd55c5be2ecc$export$e59d9ce4b90da7a2),
              (0, $112cbd55c5be2ecc$export$fdbfb7c42a1822a2)
          ]
      ], r.blockMenu);
      return r;
  }
  const $23cc8b60725a3082$var$mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;
  /**
  Inspect the given schema looking for marks and nodes from the
  basic schema, and if found, add key bindings related to them.
  This will add:
  
  * **Mod-b** for toggling [strong](https://prosemirror.net/docs/ref/#schema-basic.StrongMark)
  * **Mod-i** for toggling [emphasis](https://prosemirror.net/docs/ref/#schema-basic.EmMark)
  * **Mod-`** for toggling [code font](https://prosemirror.net/docs/ref/#schema-basic.CodeMark)
  * **Ctrl-Shift-0** for making the current textblock a paragraph
  * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
    textblock a heading of the corresponding level
  * **Ctrl-Shift-Backslash** to make the current textblock a code block
  * **Ctrl-Shift-8** to wrap the selection in an ordered list
  * **Ctrl-Shift-9** to wrap the selection in a bullet list
  * **Ctrl->** to wrap the selection in a block quote
  * **Enter** to split a non-empty textblock in a list item while at
    the same time splitting the list item
  * **Mod-Enter** to insert a hard break
  * **Mod-_** to insert a horizontal rule
  * **Backspace** to undo an input rule
  * **Alt-ArrowUp** to `joinUp`
  * **Alt-ArrowDown** to `joinDown`
  * **Mod-BracketLeft** to `lift`
  * **Escape** to `selectParentNode`
  
  You can suppress or map these bindings by passing a `mapKeys`
  argument, which maps key names (say `"Mod-B"` to either `false`, to
  remove the binding, or a new key name string.
  */ function $23cc8b60725a3082$export$d9ca128b11caeeaf(schema, mapKeys) {
      let keys = {}, type;
      function bind(key, cmd) {
          if (mapKeys) {
              let mapped = mapKeys[key];
              if (mapped === false) return;
              if (mapped) key = mapped;
          }
          keys[key] = cmd;
      }
      bind("Mod-z", (0, $a0a5029c887b2c7c$export$21f930c44940fd98));
      bind("Shift-Mod-z", (0, $a0a5029c887b2c7c$export$1688e416fee0a49e));
      bind("Backspace", (0, $c23d0ce1004c18eb$export$8b5652a4bcfffc13));
      if (!$23cc8b60725a3082$var$mac) bind("Mod-y", (0, $a0a5029c887b2c7c$export$1688e416fee0a49e));
      bind("Alt-ArrowUp", (0, $7688feb235d1dd81$export$4bb15e6d4372b393));
      bind("Alt-ArrowDown", (0, $7688feb235d1dd81$export$8dd967a262b064bb));
      bind("Mod-BracketLeft", (0, $7688feb235d1dd81$export$590e8b2c435046d9));
      bind("Escape", (0, $7688feb235d1dd81$export$a37f6aaa9169911d));
      if (type = schema.marks.strong) {
          bind("Mod-b", (0, $7688feb235d1dd81$export$797ad2667b8015a8)(type));
          bind("Mod-B", (0, $7688feb235d1dd81$export$797ad2667b8015a8)(type));
      }
      if (type = schema.marks.em) {
          bind("Mod-i", (0, $7688feb235d1dd81$export$797ad2667b8015a8)(type));
          bind("Mod-I", (0, $7688feb235d1dd81$export$797ad2667b8015a8)(type));
      }
      if (type = schema.marks.code) bind("Mod-`", (0, $7688feb235d1dd81$export$797ad2667b8015a8)(type));
      if (type = schema.nodes.bullet_list) bind("Shift-Ctrl-8", (0, $053d3e35c0447a93$export$a8aef45c6262afee)(type));
      if (type = schema.nodes.ordered_list) bind("Shift-Ctrl-9", (0, $053d3e35c0447a93$export$a8aef45c6262afee)(type));
      if (type = schema.nodes.blockquote) bind("Ctrl->", (0, $7688feb235d1dd81$export$6e5e3c49755affd0)(type));
      if (type = schema.nodes.hard_break) {
          let br = type, cmd = (0, $7688feb235d1dd81$export$146a774cdef7663a)((0, $7688feb235d1dd81$export$634b78845598ff5b), (state, dispatch)=>{
              if (dispatch) dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
              return true;
          });
          bind("Mod-Enter", cmd);
          bind("Shift-Enter", cmd);
          if ($23cc8b60725a3082$var$mac) bind("Ctrl-Enter", cmd);
      }
      if (type = schema.nodes.list_item) {
          bind("Enter", (0, $053d3e35c0447a93$export$e920ee2eb756d384)(type));
          bind("Mod-[", (0, $053d3e35c0447a93$export$e74cd5adb935a538)(type));
          bind("Mod-]", (0, $053d3e35c0447a93$export$dd505f850a3798a4)(type));
      }
      if (type = schema.nodes.paragraph) bind("Shift-Ctrl-0", (0, $7688feb235d1dd81$export$36987f561c736aad)(type));
      if (type = schema.nodes.code_block) bind("Shift-Ctrl-\\", (0, $7688feb235d1dd81$export$36987f561c736aad)(type));
      if (type = schema.nodes.heading) for(let i = 1; i <= 6; i++)bind("Shift-Ctrl-" + i, (0, $7688feb235d1dd81$export$36987f561c736aad)(type, {
          level: i
      }));
      if (type = schema.nodes.horizontal_rule) {
          let hr = type;
          bind("Mod-_", (state, dispatch)=>{
              if (dispatch) dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
              return true;
          });
      }
      return keys;
  }
  /**
  Given a blockquote node type, returns an input rule that turns `"> "`
  at the start of a textblock into a blockquote.
  */ function $23cc8b60725a3082$var$blockQuoteRule(nodeType) {
      return (0, $c23d0ce1004c18eb$export$f7316d89abe4e1c1)(/^\s*>\s$/, nodeType);
  }
  /**
  Given a list node type, returns an input rule that turns a number
  followed by a dot at the start of a textblock into an ordered list.
  */ function $23cc8b60725a3082$var$orderedListRule(nodeType) {
      return (0, $c23d0ce1004c18eb$export$f7316d89abe4e1c1)(/^(\d+)\.\s$/, nodeType, (match)=>({
              order: +match[1]
          }), (match, node)=>node.childCount + node.attrs.order == +match[1]);
  }
  /**
  Given a list node type, returns an input rule that turns a bullet
  (dash, plush, or asterisk) at the start of a textblock into a
  bullet list.
  */ function $23cc8b60725a3082$var$bulletListRule(nodeType) {
      return (0, $c23d0ce1004c18eb$export$f7316d89abe4e1c1)(/^\s*([-+*])\s$/, nodeType);
  }
  /**
  Given a code block node type, returns an input rule that turns a
  textblock starting with three backticks into a code block.
  */ function $23cc8b60725a3082$var$codeBlockRule(nodeType) {
      return (0, $c23d0ce1004c18eb$export$cc081314d3f6ffb0)(/^```$/, nodeType);
  }
  /**
  Given a node type and a maximum level, creates an input rule that
  turns up to that number of `#` characters followed by a space at
  the start of a textblock into a heading whose level corresponds to
  the number of `#` signs.
  */ function $23cc8b60725a3082$var$headingRule(nodeType, maxLevel) {
      return (0, $c23d0ce1004c18eb$export$cc081314d3f6ffb0)(new RegExp("^(#{1," + maxLevel + "})\\s$"), nodeType, (match)=>({
              level: match[1].length
          }));
  }
  /**
  A set of input rules for creating the basic block quotes, lists,
  code blocks, and heading.
  */ function $23cc8b60725a3082$export$85d07b429441b866(schema) {
      let rules = (0, $c23d0ce1004c18eb$export$896039c3677cf296).concat((0, $c23d0ce1004c18eb$export$a5b94313d6908893), (0, $c23d0ce1004c18eb$export$d52f6fa9078fe05f)), type;
      if (type = schema.nodes.blockquote) rules.push($23cc8b60725a3082$var$blockQuoteRule(type));
      if (type = schema.nodes.ordered_list) rules.push($23cc8b60725a3082$var$orderedListRule(type));
      if (type = schema.nodes.bullet_list) rules.push($23cc8b60725a3082$var$bulletListRule(type));
      if (type = schema.nodes.code_block) rules.push($23cc8b60725a3082$var$codeBlockRule(type));
      if (type = schema.nodes.heading) rules.push($23cc8b60725a3082$var$headingRule(type, 6));
      return (0, $c23d0ce1004c18eb$export$9bc12e8cb1b5422f)({
          rules: rules
      });
  }
  /**
  Create an array of plugins pre-configured for the given schema.
  The resulting array will include the following plugins:
  
   * Input rules for smart quotes and creating the block types in the
     schema using markdown conventions (say `"> "` to create a
     blockquote)
  
   * A keymap that defines keys to create and manipulate the nodes in the
     schema
  
   * A keymap binding the default keys provided by the
     prosemirror-commands module
  
   * The undo history plugin
  
   * The drop cursor plugin
  
   * The gap cursor plugin
  
   * A custom plugin that adds a `menuContent` prop for the
     prosemirror-menu wrapper, and a CSS class that enables the
     additional styling defined in `style/style.css` in this package
  
  Probably only useful for quickly setting up a passable
  editor—you'll need more control over your settings in most
  real-world situations.
  */ function $23cc8b60725a3082$export$a24aa9c6e8fd0231(options) {
      let plugins = [
          $23cc8b60725a3082$export$85d07b429441b866(options.schema),
          (0, $1e062bab1b3a59ef$export$5043418e2ef368d5)($23cc8b60725a3082$export$d9ca128b11caeeaf(options.schema, options.mapKeys)),
          (0, $1e062bab1b3a59ef$export$5043418e2ef368d5)((0, $7688feb235d1dd81$export$4a0c2b85b1f0a889)),
          (0, $815295bbb515b2f0$export$b8e3092a3bfa2062)(),
          (0, $316a4008916d809b$export$54f46a1492d5247)()
      ];
      if (options.menuBar !== false) plugins.push((0, $112cbd55c5be2ecc$export$4bada28d90893e2d)({
          floating: options.floatingMenu !== false,
          content: options.menuContent || $23cc8b60725a3082$export$630b7735451169d5(options.schema).fullMenu
      }));
      if (options.history !== false) plugins.push((0, $a0a5029c887b2c7c$export$55abd4691b317664)());
      return plugins.concat(new (0, $fc1204d3bb8e8da9$export$901cf72dabf2112a)({
          props: {
              attributes: {
                  class: "ProseMirror-example-setup-style"
              }
          }
      }));
  }
  
  
  
  
  
  
  
  
  // import {lintPlugin} from "./customPlugins.js"
  // import {createCustomHighlighter} from "./highlighter.js"
  // import {addMentionNodes, addTagNodes,addArrowNodes, getMentionsPlugin} from './mention'
  var $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae = {
      version: 1
  };
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.state = $fc1204d3bb8e8da9$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.view = $f18febfa986513b3$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.model = $59526ec4d3b41406$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.schemaBasic = $bdf1d61f73714893$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.schemaList = $053d3e35c0447a93$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.exampleSetup = $23cc8b60725a3082$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.keymap = $1e062bab1b3a59ef$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.commands = $7688feb235d1dd81$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.tranform = $77b6a7383a1cf23c$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.history = $a0a5029c887b2c7c$exports;
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.inputrules = $c23d0ce1004c18eb$exports;
  // pmCore.markdown = markdown
  // pmCore.collab = collab
  $d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae.menu = $112cbd55c5be2ecc$exports;
  
  
  export {$d832f2ef8a5ce6ac$export$ac4b2c8de9a25dae as pmCore};
  //# sourceMappingURL=module.js.map
  