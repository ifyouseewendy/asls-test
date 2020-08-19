// ========== SYNTAX CHECKING ==========

// √ warning on return type doesn't match (void <=> i32)
// √ warning on fake type: i42
// X Got: Cannot find name 'auto'. Expected: consider auto as a valid type
// X Got: Cannot find name 'anyref'. Expected: consider anyref as a valid type
export function syntax_checking(): i32 {
  const a: i42 = 1;
  const b: auto = 1;
  var c: anyref;
  const d: isize = 1;
}

// ========== SEMANTIC CHECKING ==========
// reffer to: https://www.assemblyscript.org/types.html#type-rules

// √ duplicated identifier on function name
export function foo(): void {}
export function foo(): void {}

// Comparability
//
// √ Operator '>' cannot be applied to types 'i32' and 'u32'
// √ Operator '==' cannot be applied to types 'i32' and 'f32'
export function semantic_checking_1(): void {
  const a: i32 = 1;
  const b: u32 = 1;
  a > b;

  const c: f32 = 3.1;
  a == c;
}

// Bit shifts
//
// √ The '<<' operator cannot be applied to type 'f64'.
export function semantic_checking_2(): void {
  const a: f32 = 1.0 << 2;
}

// Macro types
//
// √ Type '~lib/string/String' is not assignable to type 'u32'
class Foo {}
export function semantic_checking_3(): void {
  const c: native<Foo> = "hello";
}

// Stdlib - Globals
export function semantic_checking_4(): void {
  const a = NaN;
  const b: bool = isNaN(a);
}

// Stdlib - Array
//
// √ Type 'i32' is not assignable to type '~lib/string/String'.
export function semantic_checking_5(): void {
  var arr = new Array<string>(10);
  arr.push(1);
}
