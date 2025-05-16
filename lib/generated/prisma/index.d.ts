
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model book_categories
 * 
 */
export type book_categories = $Result.DefaultSelection<Prisma.$book_categoriesPayload>
/**
 * Model book_category_links
 * 
 */
export type book_category_links = $Result.DefaultSelection<Prisma.$book_category_linksPayload>
/**
 * Model books
 * 
 */
export type books = $Result.DefaultSelection<Prisma.$booksPayload>
/**
 * Model comments
 * 
 */
export type comments = $Result.DefaultSelection<Prisma.$commentsPayload>
/**
 * Model payments
 * 
 */
export type payments = $Result.DefaultSelection<Prisma.$paymentsPayload>
/**
 * Model ratings
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type ratings = $Result.DefaultSelection<Prisma.$ratingsPayload>
/**
 * Model user_books
 * 
 */
export type user_books = $Result.DefaultSelection<Prisma.$user_booksPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model book_requests
 * 
 */
export type book_requests = $Result.DefaultSelection<Prisma.$book_requestsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Book_categories
 * const book_categories = await prisma.book_categories.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Book_categories
   * const book_categories = await prisma.book_categories.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.book_categories`: Exposes CRUD operations for the **book_categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Book_categories
    * const book_categories = await prisma.book_categories.findMany()
    * ```
    */
  get book_categories(): Prisma.book_categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.book_category_links`: Exposes CRUD operations for the **book_category_links** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Book_category_links
    * const book_category_links = await prisma.book_category_links.findMany()
    * ```
    */
  get book_category_links(): Prisma.book_category_linksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.books`: Exposes CRUD operations for the **books** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.books.findMany()
    * ```
    */
  get books(): Prisma.booksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comments`: Exposes CRUD operations for the **comments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comments.findMany()
    * ```
    */
  get comments(): Prisma.commentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payments`: Exposes CRUD operations for the **payments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payments.findMany()
    * ```
    */
  get payments(): Prisma.paymentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ratings`: Exposes CRUD operations for the **ratings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.ratings.findMany()
    * ```
    */
  get ratings(): Prisma.ratingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_books`: Exposes CRUD operations for the **user_books** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_books
    * const user_books = await prisma.user_books.findMany()
    * ```
    */
  get user_books(): Prisma.user_booksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.book_requests`: Exposes CRUD operations for the **book_requests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Book_requests
    * const book_requests = await prisma.book_requests.findMany()
    * ```
    */
  get book_requests(): Prisma.book_requestsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.0
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    book_categories: 'book_categories',
    book_category_links: 'book_category_links',
    books: 'books',
    comments: 'comments',
    payments: 'payments',
    ratings: 'ratings',
    user_books: 'user_books',
    users: 'users',
    book_requests: 'book_requests'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "book_categories" | "book_category_links" | "books" | "comments" | "payments" | "ratings" | "user_books" | "users" | "book_requests"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      book_categories: {
        payload: Prisma.$book_categoriesPayload<ExtArgs>
        fields: Prisma.book_categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.book_categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.book_categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>
          }
          findFirst: {
            args: Prisma.book_categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.book_categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>
          }
          findMany: {
            args: Prisma.book_categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>[]
          }
          create: {
            args: Prisma.book_categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>
          }
          createMany: {
            args: Prisma.book_categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.book_categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>
          }
          update: {
            args: Prisma.book_categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>
          }
          deleteMany: {
            args: Prisma.book_categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.book_categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.book_categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_categoriesPayload>
          }
          aggregate: {
            args: Prisma.Book_categoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook_categories>
          }
          groupBy: {
            args: Prisma.book_categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Book_categoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.book_categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<Book_categoriesCountAggregateOutputType> | number
          }
        }
      }
      book_category_links: {
        payload: Prisma.$book_category_linksPayload<ExtArgs>
        fields: Prisma.book_category_linksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.book_category_linksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.book_category_linksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>
          }
          findFirst: {
            args: Prisma.book_category_linksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.book_category_linksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>
          }
          findMany: {
            args: Prisma.book_category_linksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>[]
          }
          create: {
            args: Prisma.book_category_linksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>
          }
          createMany: {
            args: Prisma.book_category_linksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.book_category_linksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>
          }
          update: {
            args: Prisma.book_category_linksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>
          }
          deleteMany: {
            args: Prisma.book_category_linksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.book_category_linksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.book_category_linksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_category_linksPayload>
          }
          aggregate: {
            args: Prisma.Book_category_linksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook_category_links>
          }
          groupBy: {
            args: Prisma.book_category_linksGroupByArgs<ExtArgs>
            result: $Utils.Optional<Book_category_linksGroupByOutputType>[]
          }
          count: {
            args: Prisma.book_category_linksCountArgs<ExtArgs>
            result: $Utils.Optional<Book_category_linksCountAggregateOutputType> | number
          }
        }
      }
      books: {
        payload: Prisma.$booksPayload<ExtArgs>
        fields: Prisma.booksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.booksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.booksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>
          }
          findFirst: {
            args: Prisma.booksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.booksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>
          }
          findMany: {
            args: Prisma.booksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>[]
          }
          create: {
            args: Prisma.booksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>
          }
          createMany: {
            args: Prisma.booksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.booksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>
          }
          update: {
            args: Prisma.booksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>
          }
          deleteMany: {
            args: Prisma.booksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.booksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.booksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booksPayload>
          }
          aggregate: {
            args: Prisma.BooksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooks>
          }
          groupBy: {
            args: Prisma.booksGroupByArgs<ExtArgs>
            result: $Utils.Optional<BooksGroupByOutputType>[]
          }
          count: {
            args: Prisma.booksCountArgs<ExtArgs>
            result: $Utils.Optional<BooksCountAggregateOutputType> | number
          }
        }
      }
      comments: {
        payload: Prisma.$commentsPayload<ExtArgs>
        fields: Prisma.commentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.commentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.commentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          findFirst: {
            args: Prisma.commentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.commentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          findMany: {
            args: Prisma.commentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>[]
          }
          create: {
            args: Prisma.commentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          createMany: {
            args: Prisma.commentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.commentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          update: {
            args: Prisma.commentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          deleteMany: {
            args: Prisma.commentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.commentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.commentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          aggregate: {
            args: Prisma.CommentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComments>
          }
          groupBy: {
            args: Prisma.commentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.commentsCountArgs<ExtArgs>
            result: $Utils.Optional<CommentsCountAggregateOutputType> | number
          }
        }
      }
      payments: {
        payload: Prisma.$paymentsPayload<ExtArgs>
        fields: Prisma.paymentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.paymentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.paymentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>
          }
          findFirst: {
            args: Prisma.paymentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.paymentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>
          }
          findMany: {
            args: Prisma.paymentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>[]
          }
          create: {
            args: Prisma.paymentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>
          }
          createMany: {
            args: Prisma.paymentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.paymentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>
          }
          update: {
            args: Prisma.paymentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>
          }
          deleteMany: {
            args: Prisma.paymentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.paymentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.paymentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paymentsPayload>
          }
          aggregate: {
            args: Prisma.PaymentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayments>
          }
          groupBy: {
            args: Prisma.paymentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.paymentsCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentsCountAggregateOutputType> | number
          }
        }
      }
      ratings: {
        payload: Prisma.$ratingsPayload<ExtArgs>
        fields: Prisma.ratingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ratingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ratingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>
          }
          findFirst: {
            args: Prisma.ratingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ratingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>
          }
          findMany: {
            args: Prisma.ratingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>[]
          }
          create: {
            args: Prisma.ratingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>
          }
          createMany: {
            args: Prisma.ratingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ratingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>
          }
          update: {
            args: Prisma.ratingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>
          }
          deleteMany: {
            args: Prisma.ratingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ratingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ratingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ratingsPayload>
          }
          aggregate: {
            args: Prisma.RatingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRatings>
          }
          groupBy: {
            args: Prisma.ratingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ratingsCountArgs<ExtArgs>
            result: $Utils.Optional<RatingsCountAggregateOutputType> | number
          }
        }
      }
      user_books: {
        payload: Prisma.$user_booksPayload<ExtArgs>
        fields: Prisma.user_booksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_booksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_booksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>
          }
          findFirst: {
            args: Prisma.user_booksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_booksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>
          }
          findMany: {
            args: Prisma.user_booksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>[]
          }
          create: {
            args: Prisma.user_booksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>
          }
          createMany: {
            args: Prisma.user_booksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.user_booksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>
          }
          update: {
            args: Prisma.user_booksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>
          }
          deleteMany: {
            args: Prisma.user_booksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_booksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.user_booksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_booksPayload>
          }
          aggregate: {
            args: Prisma.User_booksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_books>
          }
          groupBy: {
            args: Prisma.user_booksGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_booksGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_booksCountArgs<ExtArgs>
            result: $Utils.Optional<User_booksCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      book_requests: {
        payload: Prisma.$book_requestsPayload<ExtArgs>
        fields: Prisma.book_requestsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.book_requestsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.book_requestsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>
          }
          findFirst: {
            args: Prisma.book_requestsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.book_requestsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>
          }
          findMany: {
            args: Prisma.book_requestsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>[]
          }
          create: {
            args: Prisma.book_requestsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>
          }
          createMany: {
            args: Prisma.book_requestsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.book_requestsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>
          }
          update: {
            args: Prisma.book_requestsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>
          }
          deleteMany: {
            args: Prisma.book_requestsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.book_requestsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.book_requestsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$book_requestsPayload>
          }
          aggregate: {
            args: Prisma.Book_requestsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook_requests>
          }
          groupBy: {
            args: Prisma.book_requestsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Book_requestsGroupByOutputType>[]
          }
          count: {
            args: Prisma.book_requestsCountArgs<ExtArgs>
            result: $Utils.Optional<Book_requestsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    book_categories?: book_categoriesOmit
    book_category_links?: book_category_linksOmit
    books?: booksOmit
    comments?: commentsOmit
    payments?: paymentsOmit
    ratings?: ratingsOmit
    user_books?: user_booksOmit
    users?: usersOmit
    book_requests?: book_requestsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Book_categoriesCountOutputType
   */

  export type Book_categoriesCountOutputType = {
    book_category_links: number
  }

  export type Book_categoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book_category_links?: boolean | Book_categoriesCountOutputTypeCountBook_category_linksArgs
  }

  // Custom InputTypes
  /**
   * Book_categoriesCountOutputType without action
   */
  export type Book_categoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book_categoriesCountOutputType
     */
    select?: Book_categoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Book_categoriesCountOutputType without action
   */
  export type Book_categoriesCountOutputTypeCountBook_category_linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_category_linksWhereInput
  }


  /**
   * Count Type BooksCountOutputType
   */

  export type BooksCountOutputType = {
    book_category_links: number
    book_requests: number
    comments: number
    payments: number
    ratings: number
    user_books: number
  }

  export type BooksCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book_category_links?: boolean | BooksCountOutputTypeCountBook_category_linksArgs
    book_requests?: boolean | BooksCountOutputTypeCountBook_requestsArgs
    comments?: boolean | BooksCountOutputTypeCountCommentsArgs
    payments?: boolean | BooksCountOutputTypeCountPaymentsArgs
    ratings?: boolean | BooksCountOutputTypeCountRatingsArgs
    user_books?: boolean | BooksCountOutputTypeCountUser_booksArgs
  }

  // Custom InputTypes
  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BooksCountOutputType
     */
    select?: BooksCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountBook_category_linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_category_linksWhereInput
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountBook_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_requestsWhereInput
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentsWhereInput
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paymentsWhereInput
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ratingsWhereInput
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountUser_booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_booksWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    book_requests: number
    books: number
    comments: number
    payments: number
    ratings: number
    user_books: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book_requests?: boolean | UsersCountOutputTypeCountBook_requestsArgs
    books?: boolean | UsersCountOutputTypeCountBooksArgs
    comments?: boolean | UsersCountOutputTypeCountCommentsArgs
    payments?: boolean | UsersCountOutputTypeCountPaymentsArgs
    ratings?: boolean | UsersCountOutputTypeCountRatingsArgs
    user_books?: boolean | UsersCountOutputTypeCountUser_booksArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBook_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_requestsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: booksWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paymentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ratingsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUser_booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_booksWhereInput
  }


  /**
   * Models
   */

  /**
   * Model book_categories
   */

  export type AggregateBook_categories = {
    _count: Book_categoriesCountAggregateOutputType | null
    _avg: Book_categoriesAvgAggregateOutputType | null
    _sum: Book_categoriesSumAggregateOutputType | null
    _min: Book_categoriesMinAggregateOutputType | null
    _max: Book_categoriesMaxAggregateOutputType | null
  }

  export type Book_categoriesAvgAggregateOutputType = {
    category_id: number | null
  }

  export type Book_categoriesSumAggregateOutputType = {
    category_id: number | null
  }

  export type Book_categoriesMinAggregateOutputType = {
    category_id: number | null
    category_name: string | null
  }

  export type Book_categoriesMaxAggregateOutputType = {
    category_id: number | null
    category_name: string | null
  }

  export type Book_categoriesCountAggregateOutputType = {
    category_id: number
    category_name: number
    _all: number
  }


  export type Book_categoriesAvgAggregateInputType = {
    category_id?: true
  }

  export type Book_categoriesSumAggregateInputType = {
    category_id?: true
  }

  export type Book_categoriesMinAggregateInputType = {
    category_id?: true
    category_name?: true
  }

  export type Book_categoriesMaxAggregateInputType = {
    category_id?: true
    category_name?: true
  }

  export type Book_categoriesCountAggregateInputType = {
    category_id?: true
    category_name?: true
    _all?: true
  }

  export type Book_categoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which book_categories to aggregate.
     */
    where?: book_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_categories to fetch.
     */
    orderBy?: book_categoriesOrderByWithRelationInput | book_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: book_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned book_categories
    **/
    _count?: true | Book_categoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Book_categoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Book_categoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Book_categoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Book_categoriesMaxAggregateInputType
  }

  export type GetBook_categoriesAggregateType<T extends Book_categoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateBook_categories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook_categories[P]>
      : GetScalarType<T[P], AggregateBook_categories[P]>
  }




  export type book_categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_categoriesWhereInput
    orderBy?: book_categoriesOrderByWithAggregationInput | book_categoriesOrderByWithAggregationInput[]
    by: Book_categoriesScalarFieldEnum[] | Book_categoriesScalarFieldEnum
    having?: book_categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Book_categoriesCountAggregateInputType | true
    _avg?: Book_categoriesAvgAggregateInputType
    _sum?: Book_categoriesSumAggregateInputType
    _min?: Book_categoriesMinAggregateInputType
    _max?: Book_categoriesMaxAggregateInputType
  }

  export type Book_categoriesGroupByOutputType = {
    category_id: number
    category_name: string
    _count: Book_categoriesCountAggregateOutputType | null
    _avg: Book_categoriesAvgAggregateOutputType | null
    _sum: Book_categoriesSumAggregateOutputType | null
    _min: Book_categoriesMinAggregateOutputType | null
    _max: Book_categoriesMaxAggregateOutputType | null
  }

  type GetBook_categoriesGroupByPayload<T extends book_categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Book_categoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Book_categoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Book_categoriesGroupByOutputType[P]>
            : GetScalarType<T[P], Book_categoriesGroupByOutputType[P]>
        }
      >
    >


  export type book_categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    category_id?: boolean
    category_name?: boolean
    book_category_links?: boolean | book_categories$book_category_linksArgs<ExtArgs>
    _count?: boolean | Book_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book_categories"]>



  export type book_categoriesSelectScalar = {
    category_id?: boolean
    category_name?: boolean
  }

  export type book_categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"category_id" | "category_name", ExtArgs["result"]["book_categories"]>
  export type book_categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book_category_links?: boolean | book_categories$book_category_linksArgs<ExtArgs>
    _count?: boolean | Book_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $book_categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "book_categories"
    objects: {
      book_category_links: Prisma.$book_category_linksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      category_id: number
      category_name: string
    }, ExtArgs["result"]["book_categories"]>
    composites: {}
  }

  type book_categoriesGetPayload<S extends boolean | null | undefined | book_categoriesDefaultArgs> = $Result.GetResult<Prisma.$book_categoriesPayload, S>

  type book_categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<book_categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Book_categoriesCountAggregateInputType | true
    }

  export interface book_categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['book_categories'], meta: { name: 'book_categories' } }
    /**
     * Find zero or one Book_categories that matches the filter.
     * @param {book_categoriesFindUniqueArgs} args - Arguments to find a Book_categories
     * @example
     * // Get one Book_categories
     * const book_categories = await prisma.book_categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends book_categoriesFindUniqueArgs>(args: SelectSubset<T, book_categoriesFindUniqueArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book_categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {book_categoriesFindUniqueOrThrowArgs} args - Arguments to find a Book_categories
     * @example
     * // Get one Book_categories
     * const book_categories = await prisma.book_categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends book_categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, book_categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_categoriesFindFirstArgs} args - Arguments to find a Book_categories
     * @example
     * // Get one Book_categories
     * const book_categories = await prisma.book_categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends book_categoriesFindFirstArgs>(args?: SelectSubset<T, book_categoriesFindFirstArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book_categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_categoriesFindFirstOrThrowArgs} args - Arguments to find a Book_categories
     * @example
     * // Get one Book_categories
     * const book_categories = await prisma.book_categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends book_categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, book_categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Book_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Book_categories
     * const book_categories = await prisma.book_categories.findMany()
     * 
     * // Get first 10 Book_categories
     * const book_categories = await prisma.book_categories.findMany({ take: 10 })
     * 
     * // Only select the `category_id`
     * const book_categoriesWithCategory_idOnly = await prisma.book_categories.findMany({ select: { category_id: true } })
     * 
     */
    findMany<T extends book_categoriesFindManyArgs>(args?: SelectSubset<T, book_categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book_categories.
     * @param {book_categoriesCreateArgs} args - Arguments to create a Book_categories.
     * @example
     * // Create one Book_categories
     * const Book_categories = await prisma.book_categories.create({
     *   data: {
     *     // ... data to create a Book_categories
     *   }
     * })
     * 
     */
    create<T extends book_categoriesCreateArgs>(args: SelectSubset<T, book_categoriesCreateArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Book_categories.
     * @param {book_categoriesCreateManyArgs} args - Arguments to create many Book_categories.
     * @example
     * // Create many Book_categories
     * const book_categories = await prisma.book_categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends book_categoriesCreateManyArgs>(args?: SelectSubset<T, book_categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Book_categories.
     * @param {book_categoriesDeleteArgs} args - Arguments to delete one Book_categories.
     * @example
     * // Delete one Book_categories
     * const Book_categories = await prisma.book_categories.delete({
     *   where: {
     *     // ... filter to delete one Book_categories
     *   }
     * })
     * 
     */
    delete<T extends book_categoriesDeleteArgs>(args: SelectSubset<T, book_categoriesDeleteArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book_categories.
     * @param {book_categoriesUpdateArgs} args - Arguments to update one Book_categories.
     * @example
     * // Update one Book_categories
     * const book_categories = await prisma.book_categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends book_categoriesUpdateArgs>(args: SelectSubset<T, book_categoriesUpdateArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Book_categories.
     * @param {book_categoriesDeleteManyArgs} args - Arguments to filter Book_categories to delete.
     * @example
     * // Delete a few Book_categories
     * const { count } = await prisma.book_categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends book_categoriesDeleteManyArgs>(args?: SelectSubset<T, book_categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Book_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Book_categories
     * const book_categories = await prisma.book_categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends book_categoriesUpdateManyArgs>(args: SelectSubset<T, book_categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Book_categories.
     * @param {book_categoriesUpsertArgs} args - Arguments to update or create a Book_categories.
     * @example
     * // Update or create a Book_categories
     * const book_categories = await prisma.book_categories.upsert({
     *   create: {
     *     // ... data to create a Book_categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book_categories we want to update
     *   }
     * })
     */
    upsert<T extends book_categoriesUpsertArgs>(args: SelectSubset<T, book_categoriesUpsertArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Book_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_categoriesCountArgs} args - Arguments to filter Book_categories to count.
     * @example
     * // Count the number of Book_categories
     * const count = await prisma.book_categories.count({
     *   where: {
     *     // ... the filter for the Book_categories we want to count
     *   }
     * })
    **/
    count<T extends book_categoriesCountArgs>(
      args?: Subset<T, book_categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Book_categoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Book_categoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Book_categoriesAggregateArgs>(args: Subset<T, Book_categoriesAggregateArgs>): Prisma.PrismaPromise<GetBook_categoriesAggregateType<T>>

    /**
     * Group by Book_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends book_categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: book_categoriesGroupByArgs['orderBy'] }
        : { orderBy?: book_categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, book_categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBook_categoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the book_categories model
   */
  readonly fields: book_categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for book_categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__book_categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book_category_links<T extends book_categories$book_category_linksArgs<ExtArgs> = {}>(args?: Subset<T, book_categories$book_category_linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the book_categories model
   */
  interface book_categoriesFieldRefs {
    readonly category_id: FieldRef<"book_categories", 'Int'>
    readonly category_name: FieldRef<"book_categories", 'String'>
  }
    

  // Custom InputTypes
  /**
   * book_categories findUnique
   */
  export type book_categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which book_categories to fetch.
     */
    where: book_categoriesWhereUniqueInput
  }

  /**
   * book_categories findUniqueOrThrow
   */
  export type book_categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which book_categories to fetch.
     */
    where: book_categoriesWhereUniqueInput
  }

  /**
   * book_categories findFirst
   */
  export type book_categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which book_categories to fetch.
     */
    where?: book_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_categories to fetch.
     */
    orderBy?: book_categoriesOrderByWithRelationInput | book_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for book_categories.
     */
    cursor?: book_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of book_categories.
     */
    distinct?: Book_categoriesScalarFieldEnum | Book_categoriesScalarFieldEnum[]
  }

  /**
   * book_categories findFirstOrThrow
   */
  export type book_categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which book_categories to fetch.
     */
    where?: book_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_categories to fetch.
     */
    orderBy?: book_categoriesOrderByWithRelationInput | book_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for book_categories.
     */
    cursor?: book_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of book_categories.
     */
    distinct?: Book_categoriesScalarFieldEnum | Book_categoriesScalarFieldEnum[]
  }

  /**
   * book_categories findMany
   */
  export type book_categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which book_categories to fetch.
     */
    where?: book_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_categories to fetch.
     */
    orderBy?: book_categoriesOrderByWithRelationInput | book_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing book_categories.
     */
    cursor?: book_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_categories.
     */
    skip?: number
    distinct?: Book_categoriesScalarFieldEnum | Book_categoriesScalarFieldEnum[]
  }

  /**
   * book_categories create
   */
  export type book_categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a book_categories.
     */
    data: XOR<book_categoriesCreateInput, book_categoriesUncheckedCreateInput>
  }

  /**
   * book_categories createMany
   */
  export type book_categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many book_categories.
     */
    data: book_categoriesCreateManyInput | book_categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * book_categories update
   */
  export type book_categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a book_categories.
     */
    data: XOR<book_categoriesUpdateInput, book_categoriesUncheckedUpdateInput>
    /**
     * Choose, which book_categories to update.
     */
    where: book_categoriesWhereUniqueInput
  }

  /**
   * book_categories updateMany
   */
  export type book_categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update book_categories.
     */
    data: XOR<book_categoriesUpdateManyMutationInput, book_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which book_categories to update
     */
    where?: book_categoriesWhereInput
    /**
     * Limit how many book_categories to update.
     */
    limit?: number
  }

  /**
   * book_categories upsert
   */
  export type book_categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the book_categories to update in case it exists.
     */
    where: book_categoriesWhereUniqueInput
    /**
     * In case the book_categories found by the `where` argument doesn't exist, create a new book_categories with this data.
     */
    create: XOR<book_categoriesCreateInput, book_categoriesUncheckedCreateInput>
    /**
     * In case the book_categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<book_categoriesUpdateInput, book_categoriesUncheckedUpdateInput>
  }

  /**
   * book_categories delete
   */
  export type book_categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
    /**
     * Filter which book_categories to delete.
     */
    where: book_categoriesWhereUniqueInput
  }

  /**
   * book_categories deleteMany
   */
  export type book_categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which book_categories to delete
     */
    where?: book_categoriesWhereInput
    /**
     * Limit how many book_categories to delete.
     */
    limit?: number
  }

  /**
   * book_categories.book_category_links
   */
  export type book_categories$book_category_linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    where?: book_category_linksWhereInput
    orderBy?: book_category_linksOrderByWithRelationInput | book_category_linksOrderByWithRelationInput[]
    cursor?: book_category_linksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Book_category_linksScalarFieldEnum | Book_category_linksScalarFieldEnum[]
  }

  /**
   * book_categories without action
   */
  export type book_categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_categories
     */
    select?: book_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_categories
     */
    omit?: book_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_categoriesInclude<ExtArgs> | null
  }


  /**
   * Model book_category_links
   */

  export type AggregateBook_category_links = {
    _count: Book_category_linksCountAggregateOutputType | null
    _avg: Book_category_linksAvgAggregateOutputType | null
    _sum: Book_category_linksSumAggregateOutputType | null
    _min: Book_category_linksMinAggregateOutputType | null
    _max: Book_category_linksMaxAggregateOutputType | null
  }

  export type Book_category_linksAvgAggregateOutputType = {
    book_id: number | null
    category_id: number | null
  }

  export type Book_category_linksSumAggregateOutputType = {
    book_id: number | null
    category_id: number | null
  }

  export type Book_category_linksMinAggregateOutputType = {
    book_id: number | null
    category_id: number | null
  }

  export type Book_category_linksMaxAggregateOutputType = {
    book_id: number | null
    category_id: number | null
  }

  export type Book_category_linksCountAggregateOutputType = {
    book_id: number
    category_id: number
    _all: number
  }


  export type Book_category_linksAvgAggregateInputType = {
    book_id?: true
    category_id?: true
  }

  export type Book_category_linksSumAggregateInputType = {
    book_id?: true
    category_id?: true
  }

  export type Book_category_linksMinAggregateInputType = {
    book_id?: true
    category_id?: true
  }

  export type Book_category_linksMaxAggregateInputType = {
    book_id?: true
    category_id?: true
  }

  export type Book_category_linksCountAggregateInputType = {
    book_id?: true
    category_id?: true
    _all?: true
  }

  export type Book_category_linksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which book_category_links to aggregate.
     */
    where?: book_category_linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_category_links to fetch.
     */
    orderBy?: book_category_linksOrderByWithRelationInput | book_category_linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: book_category_linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_category_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_category_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned book_category_links
    **/
    _count?: true | Book_category_linksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Book_category_linksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Book_category_linksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Book_category_linksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Book_category_linksMaxAggregateInputType
  }

  export type GetBook_category_linksAggregateType<T extends Book_category_linksAggregateArgs> = {
        [P in keyof T & keyof AggregateBook_category_links]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook_category_links[P]>
      : GetScalarType<T[P], AggregateBook_category_links[P]>
  }




  export type book_category_linksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_category_linksWhereInput
    orderBy?: book_category_linksOrderByWithAggregationInput | book_category_linksOrderByWithAggregationInput[]
    by: Book_category_linksScalarFieldEnum[] | Book_category_linksScalarFieldEnum
    having?: book_category_linksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Book_category_linksCountAggregateInputType | true
    _avg?: Book_category_linksAvgAggregateInputType
    _sum?: Book_category_linksSumAggregateInputType
    _min?: Book_category_linksMinAggregateInputType
    _max?: Book_category_linksMaxAggregateInputType
  }

  export type Book_category_linksGroupByOutputType = {
    book_id: number
    category_id: number
    _count: Book_category_linksCountAggregateOutputType | null
    _avg: Book_category_linksAvgAggregateOutputType | null
    _sum: Book_category_linksSumAggregateOutputType | null
    _min: Book_category_linksMinAggregateOutputType | null
    _max: Book_category_linksMaxAggregateOutputType | null
  }

  type GetBook_category_linksGroupByPayload<T extends book_category_linksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Book_category_linksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Book_category_linksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Book_category_linksGroupByOutputType[P]>
            : GetScalarType<T[P], Book_category_linksGroupByOutputType[P]>
        }
      >
    >


  export type book_category_linksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    book_id?: boolean
    category_id?: boolean
    books?: boolean | booksDefaultArgs<ExtArgs>
    book_categories?: boolean | book_categoriesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book_category_links"]>



  export type book_category_linksSelectScalar = {
    book_id?: boolean
    category_id?: boolean
  }

  export type book_category_linksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"book_id" | "category_id", ExtArgs["result"]["book_category_links"]>
  export type book_category_linksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | booksDefaultArgs<ExtArgs>
    book_categories?: boolean | book_categoriesDefaultArgs<ExtArgs>
  }

  export type $book_category_linksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "book_category_links"
    objects: {
      books: Prisma.$booksPayload<ExtArgs>
      book_categories: Prisma.$book_categoriesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      book_id: number
      category_id: number
    }, ExtArgs["result"]["book_category_links"]>
    composites: {}
  }

  type book_category_linksGetPayload<S extends boolean | null | undefined | book_category_linksDefaultArgs> = $Result.GetResult<Prisma.$book_category_linksPayload, S>

  type book_category_linksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<book_category_linksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Book_category_linksCountAggregateInputType | true
    }

  export interface book_category_linksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['book_category_links'], meta: { name: 'book_category_links' } }
    /**
     * Find zero or one Book_category_links that matches the filter.
     * @param {book_category_linksFindUniqueArgs} args - Arguments to find a Book_category_links
     * @example
     * // Get one Book_category_links
     * const book_category_links = await prisma.book_category_links.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends book_category_linksFindUniqueArgs>(args: SelectSubset<T, book_category_linksFindUniqueArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book_category_links that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {book_category_linksFindUniqueOrThrowArgs} args - Arguments to find a Book_category_links
     * @example
     * // Get one Book_category_links
     * const book_category_links = await prisma.book_category_links.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends book_category_linksFindUniqueOrThrowArgs>(args: SelectSubset<T, book_category_linksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book_category_links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_category_linksFindFirstArgs} args - Arguments to find a Book_category_links
     * @example
     * // Get one Book_category_links
     * const book_category_links = await prisma.book_category_links.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends book_category_linksFindFirstArgs>(args?: SelectSubset<T, book_category_linksFindFirstArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book_category_links that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_category_linksFindFirstOrThrowArgs} args - Arguments to find a Book_category_links
     * @example
     * // Get one Book_category_links
     * const book_category_links = await prisma.book_category_links.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends book_category_linksFindFirstOrThrowArgs>(args?: SelectSubset<T, book_category_linksFindFirstOrThrowArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Book_category_links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_category_linksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Book_category_links
     * const book_category_links = await prisma.book_category_links.findMany()
     * 
     * // Get first 10 Book_category_links
     * const book_category_links = await prisma.book_category_links.findMany({ take: 10 })
     * 
     * // Only select the `book_id`
     * const book_category_linksWithBook_idOnly = await prisma.book_category_links.findMany({ select: { book_id: true } })
     * 
     */
    findMany<T extends book_category_linksFindManyArgs>(args?: SelectSubset<T, book_category_linksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book_category_links.
     * @param {book_category_linksCreateArgs} args - Arguments to create a Book_category_links.
     * @example
     * // Create one Book_category_links
     * const Book_category_links = await prisma.book_category_links.create({
     *   data: {
     *     // ... data to create a Book_category_links
     *   }
     * })
     * 
     */
    create<T extends book_category_linksCreateArgs>(args: SelectSubset<T, book_category_linksCreateArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Book_category_links.
     * @param {book_category_linksCreateManyArgs} args - Arguments to create many Book_category_links.
     * @example
     * // Create many Book_category_links
     * const book_category_links = await prisma.book_category_links.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends book_category_linksCreateManyArgs>(args?: SelectSubset<T, book_category_linksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Book_category_links.
     * @param {book_category_linksDeleteArgs} args - Arguments to delete one Book_category_links.
     * @example
     * // Delete one Book_category_links
     * const Book_category_links = await prisma.book_category_links.delete({
     *   where: {
     *     // ... filter to delete one Book_category_links
     *   }
     * })
     * 
     */
    delete<T extends book_category_linksDeleteArgs>(args: SelectSubset<T, book_category_linksDeleteArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book_category_links.
     * @param {book_category_linksUpdateArgs} args - Arguments to update one Book_category_links.
     * @example
     * // Update one Book_category_links
     * const book_category_links = await prisma.book_category_links.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends book_category_linksUpdateArgs>(args: SelectSubset<T, book_category_linksUpdateArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Book_category_links.
     * @param {book_category_linksDeleteManyArgs} args - Arguments to filter Book_category_links to delete.
     * @example
     * // Delete a few Book_category_links
     * const { count } = await prisma.book_category_links.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends book_category_linksDeleteManyArgs>(args?: SelectSubset<T, book_category_linksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Book_category_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_category_linksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Book_category_links
     * const book_category_links = await prisma.book_category_links.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends book_category_linksUpdateManyArgs>(args: SelectSubset<T, book_category_linksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Book_category_links.
     * @param {book_category_linksUpsertArgs} args - Arguments to update or create a Book_category_links.
     * @example
     * // Update or create a Book_category_links
     * const book_category_links = await prisma.book_category_links.upsert({
     *   create: {
     *     // ... data to create a Book_category_links
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book_category_links we want to update
     *   }
     * })
     */
    upsert<T extends book_category_linksUpsertArgs>(args: SelectSubset<T, book_category_linksUpsertArgs<ExtArgs>>): Prisma__book_category_linksClient<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Book_category_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_category_linksCountArgs} args - Arguments to filter Book_category_links to count.
     * @example
     * // Count the number of Book_category_links
     * const count = await prisma.book_category_links.count({
     *   where: {
     *     // ... the filter for the Book_category_links we want to count
     *   }
     * })
    **/
    count<T extends book_category_linksCountArgs>(
      args?: Subset<T, book_category_linksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Book_category_linksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book_category_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Book_category_linksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Book_category_linksAggregateArgs>(args: Subset<T, Book_category_linksAggregateArgs>): Prisma.PrismaPromise<GetBook_category_linksAggregateType<T>>

    /**
     * Group by Book_category_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_category_linksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends book_category_linksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: book_category_linksGroupByArgs['orderBy'] }
        : { orderBy?: book_category_linksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, book_category_linksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBook_category_linksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the book_category_links model
   */
  readonly fields: book_category_linksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for book_category_links.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__book_category_linksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends booksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, booksDefaultArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    book_categories<T extends book_categoriesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, book_categoriesDefaultArgs<ExtArgs>>): Prisma__book_categoriesClient<$Result.GetResult<Prisma.$book_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the book_category_links model
   */
  interface book_category_linksFieldRefs {
    readonly book_id: FieldRef<"book_category_links", 'Int'>
    readonly category_id: FieldRef<"book_category_links", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * book_category_links findUnique
   */
  export type book_category_linksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * Filter, which book_category_links to fetch.
     */
    where: book_category_linksWhereUniqueInput
  }

  /**
   * book_category_links findUniqueOrThrow
   */
  export type book_category_linksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * Filter, which book_category_links to fetch.
     */
    where: book_category_linksWhereUniqueInput
  }

  /**
   * book_category_links findFirst
   */
  export type book_category_linksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * Filter, which book_category_links to fetch.
     */
    where?: book_category_linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_category_links to fetch.
     */
    orderBy?: book_category_linksOrderByWithRelationInput | book_category_linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for book_category_links.
     */
    cursor?: book_category_linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_category_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_category_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of book_category_links.
     */
    distinct?: Book_category_linksScalarFieldEnum | Book_category_linksScalarFieldEnum[]
  }

  /**
   * book_category_links findFirstOrThrow
   */
  export type book_category_linksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * Filter, which book_category_links to fetch.
     */
    where?: book_category_linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_category_links to fetch.
     */
    orderBy?: book_category_linksOrderByWithRelationInput | book_category_linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for book_category_links.
     */
    cursor?: book_category_linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_category_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_category_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of book_category_links.
     */
    distinct?: Book_category_linksScalarFieldEnum | Book_category_linksScalarFieldEnum[]
  }

  /**
   * book_category_links findMany
   */
  export type book_category_linksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * Filter, which book_category_links to fetch.
     */
    where?: book_category_linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_category_links to fetch.
     */
    orderBy?: book_category_linksOrderByWithRelationInput | book_category_linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing book_category_links.
     */
    cursor?: book_category_linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_category_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_category_links.
     */
    skip?: number
    distinct?: Book_category_linksScalarFieldEnum | Book_category_linksScalarFieldEnum[]
  }

  /**
   * book_category_links create
   */
  export type book_category_linksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * The data needed to create a book_category_links.
     */
    data: XOR<book_category_linksCreateInput, book_category_linksUncheckedCreateInput>
  }

  /**
   * book_category_links createMany
   */
  export type book_category_linksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many book_category_links.
     */
    data: book_category_linksCreateManyInput | book_category_linksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * book_category_links update
   */
  export type book_category_linksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * The data needed to update a book_category_links.
     */
    data: XOR<book_category_linksUpdateInput, book_category_linksUncheckedUpdateInput>
    /**
     * Choose, which book_category_links to update.
     */
    where: book_category_linksWhereUniqueInput
  }

  /**
   * book_category_links updateMany
   */
  export type book_category_linksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update book_category_links.
     */
    data: XOR<book_category_linksUpdateManyMutationInput, book_category_linksUncheckedUpdateManyInput>
    /**
     * Filter which book_category_links to update
     */
    where?: book_category_linksWhereInput
    /**
     * Limit how many book_category_links to update.
     */
    limit?: number
  }

  /**
   * book_category_links upsert
   */
  export type book_category_linksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * The filter to search for the book_category_links to update in case it exists.
     */
    where: book_category_linksWhereUniqueInput
    /**
     * In case the book_category_links found by the `where` argument doesn't exist, create a new book_category_links with this data.
     */
    create: XOR<book_category_linksCreateInput, book_category_linksUncheckedCreateInput>
    /**
     * In case the book_category_links was found with the provided `where` argument, update it with this data.
     */
    update: XOR<book_category_linksUpdateInput, book_category_linksUncheckedUpdateInput>
  }

  /**
   * book_category_links delete
   */
  export type book_category_linksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    /**
     * Filter which book_category_links to delete.
     */
    where: book_category_linksWhereUniqueInput
  }

  /**
   * book_category_links deleteMany
   */
  export type book_category_linksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which book_category_links to delete
     */
    where?: book_category_linksWhereInput
    /**
     * Limit how many book_category_links to delete.
     */
    limit?: number
  }

  /**
   * book_category_links without action
   */
  export type book_category_linksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
  }


  /**
   * Model books
   */

  export type AggregateBooks = {
    _count: BooksCountAggregateOutputType | null
    _avg: BooksAvgAggregateOutputType | null
    _sum: BooksSumAggregateOutputType | null
    _min: BooksMinAggregateOutputType | null
    _max: BooksMaxAggregateOutputType | null
  }

  export type BooksAvgAggregateOutputType = {
    book_id: number | null
    author_id: number | null
    price: Decimal | null
  }

  export type BooksSumAggregateOutputType = {
    book_id: number | null
    author_id: number | null
    price: Decimal | null
  }

  export type BooksMinAggregateOutputType = {
    book_id: number | null
    isbn: string | null
    name: string | null
    author_id: number | null
    description: string | null
    cover_image: string | null
    file_path: string | null
    price: Decimal | null
    published_date: Date | null
    created_at: Date | null
  }

  export type BooksMaxAggregateOutputType = {
    book_id: number | null
    isbn: string | null
    name: string | null
    author_id: number | null
    description: string | null
    cover_image: string | null
    file_path: string | null
    price: Decimal | null
    published_date: Date | null
    created_at: Date | null
  }

  export type BooksCountAggregateOutputType = {
    book_id: number
    isbn: number
    name: number
    author_id: number
    description: number
    cover_image: number
    file_path: number
    price: number
    published_date: number
    created_at: number
    _all: number
  }


  export type BooksAvgAggregateInputType = {
    book_id?: true
    author_id?: true
    price?: true
  }

  export type BooksSumAggregateInputType = {
    book_id?: true
    author_id?: true
    price?: true
  }

  export type BooksMinAggregateInputType = {
    book_id?: true
    isbn?: true
    name?: true
    author_id?: true
    description?: true
    cover_image?: true
    file_path?: true
    price?: true
    published_date?: true
    created_at?: true
  }

  export type BooksMaxAggregateInputType = {
    book_id?: true
    isbn?: true
    name?: true
    author_id?: true
    description?: true
    cover_image?: true
    file_path?: true
    price?: true
    published_date?: true
    created_at?: true
  }

  export type BooksCountAggregateInputType = {
    book_id?: true
    isbn?: true
    name?: true
    author_id?: true
    description?: true
    cover_image?: true
    file_path?: true
    price?: true
    published_date?: true
    created_at?: true
    _all?: true
  }

  export type BooksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which books to aggregate.
     */
    where?: booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of books to fetch.
     */
    orderBy?: booksOrderByWithRelationInput | booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned books
    **/
    _count?: true | BooksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BooksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BooksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BooksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BooksMaxAggregateInputType
  }

  export type GetBooksAggregateType<T extends BooksAggregateArgs> = {
        [P in keyof T & keyof AggregateBooks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooks[P]>
      : GetScalarType<T[P], AggregateBooks[P]>
  }




  export type booksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: booksWhereInput
    orderBy?: booksOrderByWithAggregationInput | booksOrderByWithAggregationInput[]
    by: BooksScalarFieldEnum[] | BooksScalarFieldEnum
    having?: booksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BooksCountAggregateInputType | true
    _avg?: BooksAvgAggregateInputType
    _sum?: BooksSumAggregateInputType
    _min?: BooksMinAggregateInputType
    _max?: BooksMaxAggregateInputType
  }

  export type BooksGroupByOutputType = {
    book_id: number
    isbn: string
    name: string
    author_id: number
    description: string | null
    cover_image: string | null
    file_path: string | null
    price: Decimal
    published_date: Date | null
    created_at: Date
    _count: BooksCountAggregateOutputType | null
    _avg: BooksAvgAggregateOutputType | null
    _sum: BooksSumAggregateOutputType | null
    _min: BooksMinAggregateOutputType | null
    _max: BooksMaxAggregateOutputType | null
  }

  type GetBooksGroupByPayload<T extends booksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BooksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BooksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BooksGroupByOutputType[P]>
            : GetScalarType<T[P], BooksGroupByOutputType[P]>
        }
      >
    >


  export type booksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    book_id?: boolean
    isbn?: boolean
    name?: boolean
    author_id?: boolean
    description?: boolean
    cover_image?: boolean
    file_path?: boolean
    price?: boolean
    published_date?: boolean
    created_at?: boolean
    book_category_links?: boolean | books$book_category_linksArgs<ExtArgs>
    book_requests?: boolean | books$book_requestsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    comments?: boolean | books$commentsArgs<ExtArgs>
    payments?: boolean | books$paymentsArgs<ExtArgs>
    ratings?: boolean | books$ratingsArgs<ExtArgs>
    user_books?: boolean | books$user_booksArgs<ExtArgs>
    _count?: boolean | BooksCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["books"]>



  export type booksSelectScalar = {
    book_id?: boolean
    isbn?: boolean
    name?: boolean
    author_id?: boolean
    description?: boolean
    cover_image?: boolean
    file_path?: boolean
    price?: boolean
    published_date?: boolean
    created_at?: boolean
  }

  export type booksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"book_id" | "isbn" | "name" | "author_id" | "description" | "cover_image" | "file_path" | "price" | "published_date" | "created_at", ExtArgs["result"]["books"]>
  export type booksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book_category_links?: boolean | books$book_category_linksArgs<ExtArgs>
    book_requests?: boolean | books$book_requestsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    comments?: boolean | books$commentsArgs<ExtArgs>
    payments?: boolean | books$paymentsArgs<ExtArgs>
    ratings?: boolean | books$ratingsArgs<ExtArgs>
    user_books?: boolean | books$user_booksArgs<ExtArgs>
    _count?: boolean | BooksCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $booksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "books"
    objects: {
      book_category_links: Prisma.$book_category_linksPayload<ExtArgs>[]
      book_requests: Prisma.$book_requestsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
      comments: Prisma.$commentsPayload<ExtArgs>[]
      payments: Prisma.$paymentsPayload<ExtArgs>[]
      ratings: Prisma.$ratingsPayload<ExtArgs>[]
      user_books: Prisma.$user_booksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      book_id: number
      isbn: string
      name: string
      author_id: number
      description: string | null
      cover_image: string | null
      file_path: string | null
      price: Prisma.Decimal
      published_date: Date | null
      created_at: Date
    }, ExtArgs["result"]["books"]>
    composites: {}
  }

  type booksGetPayload<S extends boolean | null | undefined | booksDefaultArgs> = $Result.GetResult<Prisma.$booksPayload, S>

  type booksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<booksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BooksCountAggregateInputType | true
    }

  export interface booksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['books'], meta: { name: 'books' } }
    /**
     * Find zero or one Books that matches the filter.
     * @param {booksFindUniqueArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends booksFindUniqueArgs>(args: SelectSubset<T, booksFindUniqueArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Books that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {booksFindUniqueOrThrowArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends booksFindUniqueOrThrowArgs>(args: SelectSubset<T, booksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booksFindFirstArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends booksFindFirstArgs>(args?: SelectSubset<T, booksFindFirstArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Books that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booksFindFirstOrThrowArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends booksFindFirstOrThrowArgs>(args?: SelectSubset<T, booksFindFirstOrThrowArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.books.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.books.findMany({ take: 10 })
     * 
     * // Only select the `book_id`
     * const booksWithBook_idOnly = await prisma.books.findMany({ select: { book_id: true } })
     * 
     */
    findMany<T extends booksFindManyArgs>(args?: SelectSubset<T, booksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Books.
     * @param {booksCreateArgs} args - Arguments to create a Books.
     * @example
     * // Create one Books
     * const Books = await prisma.books.create({
     *   data: {
     *     // ... data to create a Books
     *   }
     * })
     * 
     */
    create<T extends booksCreateArgs>(args: SelectSubset<T, booksCreateArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Books.
     * @param {booksCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const books = await prisma.books.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends booksCreateManyArgs>(args?: SelectSubset<T, booksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Books.
     * @param {booksDeleteArgs} args - Arguments to delete one Books.
     * @example
     * // Delete one Books
     * const Books = await prisma.books.delete({
     *   where: {
     *     // ... filter to delete one Books
     *   }
     * })
     * 
     */
    delete<T extends booksDeleteArgs>(args: SelectSubset<T, booksDeleteArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Books.
     * @param {booksUpdateArgs} args - Arguments to update one Books.
     * @example
     * // Update one Books
     * const books = await prisma.books.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends booksUpdateArgs>(args: SelectSubset<T, booksUpdateArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Books.
     * @param {booksDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.books.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends booksDeleteManyArgs>(args?: SelectSubset<T, booksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const books = await prisma.books.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends booksUpdateManyArgs>(args: SelectSubset<T, booksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Books.
     * @param {booksUpsertArgs} args - Arguments to update or create a Books.
     * @example
     * // Update or create a Books
     * const books = await prisma.books.upsert({
     *   create: {
     *     // ... data to create a Books
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Books we want to update
     *   }
     * })
     */
    upsert<T extends booksUpsertArgs>(args: SelectSubset<T, booksUpsertArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booksCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.books.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends booksCountArgs>(
      args?: Subset<T, booksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BooksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BooksAggregateArgs>(args: Subset<T, BooksAggregateArgs>): Prisma.PrismaPromise<GetBooksAggregateType<T>>

    /**
     * Group by Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends booksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: booksGroupByArgs['orderBy'] }
        : { orderBy?: booksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, booksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBooksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the books model
   */
  readonly fields: booksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for books.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__booksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book_category_links<T extends books$book_category_linksArgs<ExtArgs> = {}>(args?: Subset<T, books$book_category_linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_category_linksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    book_requests<T extends books$book_requestsArgs<ExtArgs> = {}>(args?: Subset<T, books$book_requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends books$commentsArgs<ExtArgs> = {}>(args?: Subset<T, books$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends books$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, books$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ratings<T extends books$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, books$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_books<T extends books$user_booksArgs<ExtArgs> = {}>(args?: Subset<T, books$user_booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the books model
   */
  interface booksFieldRefs {
    readonly book_id: FieldRef<"books", 'Int'>
    readonly isbn: FieldRef<"books", 'String'>
    readonly name: FieldRef<"books", 'String'>
    readonly author_id: FieldRef<"books", 'Int'>
    readonly description: FieldRef<"books", 'String'>
    readonly cover_image: FieldRef<"books", 'String'>
    readonly file_path: FieldRef<"books", 'String'>
    readonly price: FieldRef<"books", 'Decimal'>
    readonly published_date: FieldRef<"books", 'DateTime'>
    readonly created_at: FieldRef<"books", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * books findUnique
   */
  export type booksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * Filter, which books to fetch.
     */
    where: booksWhereUniqueInput
  }

  /**
   * books findUniqueOrThrow
   */
  export type booksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * Filter, which books to fetch.
     */
    where: booksWhereUniqueInput
  }

  /**
   * books findFirst
   */
  export type booksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * Filter, which books to fetch.
     */
    where?: booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of books to fetch.
     */
    orderBy?: booksOrderByWithRelationInput | booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for books.
     */
    cursor?: booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of books.
     */
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * books findFirstOrThrow
   */
  export type booksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * Filter, which books to fetch.
     */
    where?: booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of books to fetch.
     */
    orderBy?: booksOrderByWithRelationInput | booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for books.
     */
    cursor?: booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of books.
     */
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * books findMany
   */
  export type booksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * Filter, which books to fetch.
     */
    where?: booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of books to fetch.
     */
    orderBy?: booksOrderByWithRelationInput | booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing books.
     */
    cursor?: booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` books.
     */
    skip?: number
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * books create
   */
  export type booksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * The data needed to create a books.
     */
    data: XOR<booksCreateInput, booksUncheckedCreateInput>
  }

  /**
   * books createMany
   */
  export type booksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many books.
     */
    data: booksCreateManyInput | booksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * books update
   */
  export type booksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * The data needed to update a books.
     */
    data: XOR<booksUpdateInput, booksUncheckedUpdateInput>
    /**
     * Choose, which books to update.
     */
    where: booksWhereUniqueInput
  }

  /**
   * books updateMany
   */
  export type booksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update books.
     */
    data: XOR<booksUpdateManyMutationInput, booksUncheckedUpdateManyInput>
    /**
     * Filter which books to update
     */
    where?: booksWhereInput
    /**
     * Limit how many books to update.
     */
    limit?: number
  }

  /**
   * books upsert
   */
  export type booksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * The filter to search for the books to update in case it exists.
     */
    where: booksWhereUniqueInput
    /**
     * In case the books found by the `where` argument doesn't exist, create a new books with this data.
     */
    create: XOR<booksCreateInput, booksUncheckedCreateInput>
    /**
     * In case the books was found with the provided `where` argument, update it with this data.
     */
    update: XOR<booksUpdateInput, booksUncheckedUpdateInput>
  }

  /**
   * books delete
   */
  export type booksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    /**
     * Filter which books to delete.
     */
    where: booksWhereUniqueInput
  }

  /**
   * books deleteMany
   */
  export type booksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which books to delete
     */
    where?: booksWhereInput
    /**
     * Limit how many books to delete.
     */
    limit?: number
  }

  /**
   * books.book_category_links
   */
  export type books$book_category_linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_category_links
     */
    select?: book_category_linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_category_links
     */
    omit?: book_category_linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_category_linksInclude<ExtArgs> | null
    where?: book_category_linksWhereInput
    orderBy?: book_category_linksOrderByWithRelationInput | book_category_linksOrderByWithRelationInput[]
    cursor?: book_category_linksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Book_category_linksScalarFieldEnum | Book_category_linksScalarFieldEnum[]
  }

  /**
   * books.book_requests
   */
  export type books$book_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    where?: book_requestsWhereInput
    orderBy?: book_requestsOrderByWithRelationInput | book_requestsOrderByWithRelationInput[]
    cursor?: book_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Book_requestsScalarFieldEnum | Book_requestsScalarFieldEnum[]
  }

  /**
   * books.comments
   */
  export type books$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    where?: commentsWhereInput
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    cursor?: commentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * books.payments
   */
  export type books$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    where?: paymentsWhereInput
    orderBy?: paymentsOrderByWithRelationInput | paymentsOrderByWithRelationInput[]
    cursor?: paymentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * books.ratings
   */
  export type books$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    where?: ratingsWhereInput
    orderBy?: ratingsOrderByWithRelationInput | ratingsOrderByWithRelationInput[]
    cursor?: ratingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingsScalarFieldEnum | RatingsScalarFieldEnum[]
  }

  /**
   * books.user_books
   */
  export type books$user_booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    where?: user_booksWhereInput
    orderBy?: user_booksOrderByWithRelationInput | user_booksOrderByWithRelationInput[]
    cursor?: user_booksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_booksScalarFieldEnum | User_booksScalarFieldEnum[]
  }

  /**
   * books without action
   */
  export type booksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
  }


  /**
   * Model comments
   */

  export type AggregateComments = {
    _count: CommentsCountAggregateOutputType | null
    _avg: CommentsAvgAggregateOutputType | null
    _sum: CommentsSumAggregateOutputType | null
    _min: CommentsMinAggregateOutputType | null
    _max: CommentsMaxAggregateOutputType | null
  }

  export type CommentsAvgAggregateOutputType = {
    comments_id: number | null
    book_id: number | null
    user_id: number | null
  }

  export type CommentsSumAggregateOutputType = {
    comments_id: number | null
    book_id: number | null
    user_id: number | null
  }

  export type CommentsMinAggregateOutputType = {
    comments_id: number | null
    book_id: number | null
    user_id: number | null
    content: string | null
    created_at: Date | null
  }

  export type CommentsMaxAggregateOutputType = {
    comments_id: number | null
    book_id: number | null
    user_id: number | null
    content: string | null
    created_at: Date | null
  }

  export type CommentsCountAggregateOutputType = {
    comments_id: number
    book_id: number
    user_id: number
    content: number
    created_at: number
    _all: number
  }


  export type CommentsAvgAggregateInputType = {
    comments_id?: true
    book_id?: true
    user_id?: true
  }

  export type CommentsSumAggregateInputType = {
    comments_id?: true
    book_id?: true
    user_id?: true
  }

  export type CommentsMinAggregateInputType = {
    comments_id?: true
    book_id?: true
    user_id?: true
    content?: true
    created_at?: true
  }

  export type CommentsMaxAggregateInputType = {
    comments_id?: true
    book_id?: true
    user_id?: true
    content?: true
    created_at?: true
  }

  export type CommentsCountAggregateInputType = {
    comments_id?: true
    book_id?: true
    user_id?: true
    content?: true
    created_at?: true
    _all?: true
  }

  export type CommentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comments to aggregate.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned comments
    **/
    _count?: true | CommentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentsMaxAggregateInputType
  }

  export type GetCommentsAggregateType<T extends CommentsAggregateArgs> = {
        [P in keyof T & keyof AggregateComments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComments[P]>
      : GetScalarType<T[P], AggregateComments[P]>
  }




  export type commentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentsWhereInput
    orderBy?: commentsOrderByWithAggregationInput | commentsOrderByWithAggregationInput[]
    by: CommentsScalarFieldEnum[] | CommentsScalarFieldEnum
    having?: commentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentsCountAggregateInputType | true
    _avg?: CommentsAvgAggregateInputType
    _sum?: CommentsSumAggregateInputType
    _min?: CommentsMinAggregateInputType
    _max?: CommentsMaxAggregateInputType
  }

  export type CommentsGroupByOutputType = {
    comments_id: number
    book_id: number
    user_id: number
    content: string
    created_at: Date
    _count: CommentsCountAggregateOutputType | null
    _avg: CommentsAvgAggregateOutputType | null
    _sum: CommentsSumAggregateOutputType | null
    _min: CommentsMinAggregateOutputType | null
    _max: CommentsMaxAggregateOutputType | null
  }

  type GetCommentsGroupByPayload<T extends commentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentsGroupByOutputType[P]>
            : GetScalarType<T[P], CommentsGroupByOutputType[P]>
        }
      >
    >


  export type commentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    comments_id?: boolean
    book_id?: boolean
    user_id?: boolean
    content?: boolean
    created_at?: boolean
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comments"]>



  export type commentsSelectScalar = {
    comments_id?: boolean
    book_id?: boolean
    user_id?: boolean
    content?: boolean
    created_at?: boolean
  }

  export type commentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"comments_id" | "book_id" | "user_id" | "content" | "created_at", ExtArgs["result"]["comments"]>
  export type commentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $commentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "comments"
    objects: {
      books: Prisma.$booksPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      comments_id: number
      book_id: number
      user_id: number
      content: string
      created_at: Date
    }, ExtArgs["result"]["comments"]>
    composites: {}
  }

  type commentsGetPayload<S extends boolean | null | undefined | commentsDefaultArgs> = $Result.GetResult<Prisma.$commentsPayload, S>

  type commentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<commentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentsCountAggregateInputType | true
    }

  export interface commentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['comments'], meta: { name: 'comments' } }
    /**
     * Find zero or one Comments that matches the filter.
     * @param {commentsFindUniqueArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends commentsFindUniqueArgs>(args: SelectSubset<T, commentsFindUniqueArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {commentsFindUniqueOrThrowArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends commentsFindUniqueOrThrowArgs>(args: SelectSubset<T, commentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsFindFirstArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends commentsFindFirstArgs>(args?: SelectSubset<T, commentsFindFirstArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsFindFirstOrThrowArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends commentsFindFirstOrThrowArgs>(args?: SelectSubset<T, commentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comments.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comments.findMany({ take: 10 })
     * 
     * // Only select the `comments_id`
     * const commentsWithComments_idOnly = await prisma.comments.findMany({ select: { comments_id: true } })
     * 
     */
    findMany<T extends commentsFindManyArgs>(args?: SelectSubset<T, commentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comments.
     * @param {commentsCreateArgs} args - Arguments to create a Comments.
     * @example
     * // Create one Comments
     * const Comments = await prisma.comments.create({
     *   data: {
     *     // ... data to create a Comments
     *   }
     * })
     * 
     */
    create<T extends commentsCreateArgs>(args: SelectSubset<T, commentsCreateArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {commentsCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comments = await prisma.comments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends commentsCreateManyArgs>(args?: SelectSubset<T, commentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comments.
     * @param {commentsDeleteArgs} args - Arguments to delete one Comments.
     * @example
     * // Delete one Comments
     * const Comments = await prisma.comments.delete({
     *   where: {
     *     // ... filter to delete one Comments
     *   }
     * })
     * 
     */
    delete<T extends commentsDeleteArgs>(args: SelectSubset<T, commentsDeleteArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comments.
     * @param {commentsUpdateArgs} args - Arguments to update one Comments.
     * @example
     * // Update one Comments
     * const comments = await prisma.comments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends commentsUpdateArgs>(args: SelectSubset<T, commentsUpdateArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {commentsDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends commentsDeleteManyArgs>(args?: SelectSubset<T, commentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comments = await prisma.comments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends commentsUpdateManyArgs>(args: SelectSubset<T, commentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comments.
     * @param {commentsUpsertArgs} args - Arguments to update or create a Comments.
     * @example
     * // Update or create a Comments
     * const comments = await prisma.comments.upsert({
     *   create: {
     *     // ... data to create a Comments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comments we want to update
     *   }
     * })
     */
    upsert<T extends commentsUpsertArgs>(args: SelectSubset<T, commentsUpsertArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comments.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends commentsCountArgs>(
      args?: Subset<T, commentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentsAggregateArgs>(args: Subset<T, CommentsAggregateArgs>): Prisma.PrismaPromise<GetCommentsAggregateType<T>>

    /**
     * Group by Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends commentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: commentsGroupByArgs['orderBy'] }
        : { orderBy?: commentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, commentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the comments model
   */
  readonly fields: commentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for comments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__commentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends booksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, booksDefaultArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the comments model
   */
  interface commentsFieldRefs {
    readonly comments_id: FieldRef<"comments", 'Int'>
    readonly book_id: FieldRef<"comments", 'Int'>
    readonly user_id: FieldRef<"comments", 'Int'>
    readonly content: FieldRef<"comments", 'String'>
    readonly created_at: FieldRef<"comments", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * comments findUnique
   */
  export type commentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments findUniqueOrThrow
   */
  export type commentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments findFirst
   */
  export type commentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * comments findFirstOrThrow
   */
  export type commentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * comments findMany
   */
  export type commentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing comments.
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * comments create
   */
  export type commentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * The data needed to create a comments.
     */
    data: XOR<commentsCreateInput, commentsUncheckedCreateInput>
  }

  /**
   * comments createMany
   */
  export type commentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many comments.
     */
    data: commentsCreateManyInput | commentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * comments update
   */
  export type commentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * The data needed to update a comments.
     */
    data: XOR<commentsUpdateInput, commentsUncheckedUpdateInput>
    /**
     * Choose, which comments to update.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments updateMany
   */
  export type commentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update comments.
     */
    data: XOR<commentsUpdateManyMutationInput, commentsUncheckedUpdateManyInput>
    /**
     * Filter which comments to update
     */
    where?: commentsWhereInput
    /**
     * Limit how many comments to update.
     */
    limit?: number
  }

  /**
   * comments upsert
   */
  export type commentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * The filter to search for the comments to update in case it exists.
     */
    where: commentsWhereUniqueInput
    /**
     * In case the comments found by the `where` argument doesn't exist, create a new comments with this data.
     */
    create: XOR<commentsCreateInput, commentsUncheckedCreateInput>
    /**
     * In case the comments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<commentsUpdateInput, commentsUncheckedUpdateInput>
  }

  /**
   * comments delete
   */
  export type commentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter which comments to delete.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments deleteMany
   */
  export type commentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comments to delete
     */
    where?: commentsWhereInput
    /**
     * Limit how many comments to delete.
     */
    limit?: number
  }

  /**
   * comments without action
   */
  export type commentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
  }


  /**
   * Model payments
   */

  export type AggregatePayments = {
    _count: PaymentsCountAggregateOutputType | null
    _avg: PaymentsAvgAggregateOutputType | null
    _sum: PaymentsSumAggregateOutputType | null
    _min: PaymentsMinAggregateOutputType | null
    _max: PaymentsMaxAggregateOutputType | null
  }

  export type PaymentsAvgAggregateOutputType = {
    pay_id: number | null
    user_id: number | null
    book_id: number | null
    amount: Decimal | null
  }

  export type PaymentsSumAggregateOutputType = {
    pay_id: number | null
    user_id: number | null
    book_id: number | null
    amount: Decimal | null
  }

  export type PaymentsMinAggregateOutputType = {
    pay_id: number | null
    user_id: number | null
    book_id: number | null
    amount: Decimal | null
    status: string | null
    paid_at: Date | null
  }

  export type PaymentsMaxAggregateOutputType = {
    pay_id: number | null
    user_id: number | null
    book_id: number | null
    amount: Decimal | null
    status: string | null
    paid_at: Date | null
  }

  export type PaymentsCountAggregateOutputType = {
    pay_id: number
    user_id: number
    book_id: number
    amount: number
    status: number
    paid_at: number
    _all: number
  }


  export type PaymentsAvgAggregateInputType = {
    pay_id?: true
    user_id?: true
    book_id?: true
    amount?: true
  }

  export type PaymentsSumAggregateInputType = {
    pay_id?: true
    user_id?: true
    book_id?: true
    amount?: true
  }

  export type PaymentsMinAggregateInputType = {
    pay_id?: true
    user_id?: true
    book_id?: true
    amount?: true
    status?: true
    paid_at?: true
  }

  export type PaymentsMaxAggregateInputType = {
    pay_id?: true
    user_id?: true
    book_id?: true
    amount?: true
    status?: true
    paid_at?: true
  }

  export type PaymentsCountAggregateInputType = {
    pay_id?: true
    user_id?: true
    book_id?: true
    amount?: true
    status?: true
    paid_at?: true
    _all?: true
  }

  export type PaymentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which payments to aggregate.
     */
    where?: paymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of payments to fetch.
     */
    orderBy?: paymentsOrderByWithRelationInput | paymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: paymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned payments
    **/
    _count?: true | PaymentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentsMaxAggregateInputType
  }

  export type GetPaymentsAggregateType<T extends PaymentsAggregateArgs> = {
        [P in keyof T & keyof AggregatePayments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayments[P]>
      : GetScalarType<T[P], AggregatePayments[P]>
  }




  export type paymentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paymentsWhereInput
    orderBy?: paymentsOrderByWithAggregationInput | paymentsOrderByWithAggregationInput[]
    by: PaymentsScalarFieldEnum[] | PaymentsScalarFieldEnum
    having?: paymentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentsCountAggregateInputType | true
    _avg?: PaymentsAvgAggregateInputType
    _sum?: PaymentsSumAggregateInputType
    _min?: PaymentsMinAggregateInputType
    _max?: PaymentsMaxAggregateInputType
  }

  export type PaymentsGroupByOutputType = {
    pay_id: number
    user_id: number
    book_id: number
    amount: Decimal
    status: string
    paid_at: Date
    _count: PaymentsCountAggregateOutputType | null
    _avg: PaymentsAvgAggregateOutputType | null
    _sum: PaymentsSumAggregateOutputType | null
    _min: PaymentsMinAggregateOutputType | null
    _max: PaymentsMaxAggregateOutputType | null
  }

  type GetPaymentsGroupByPayload<T extends paymentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentsGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentsGroupByOutputType[P]>
        }
      >
    >


  export type paymentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pay_id?: boolean
    user_id?: boolean
    book_id?: boolean
    amount?: boolean
    status?: boolean
    paid_at?: boolean
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>



  export type paymentsSelectScalar = {
    pay_id?: boolean
    user_id?: boolean
    book_id?: boolean
    amount?: boolean
    status?: boolean
    paid_at?: boolean
  }

  export type paymentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"pay_id" | "user_id" | "book_id" | "amount" | "status" | "paid_at", ExtArgs["result"]["payments"]>
  export type paymentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $paymentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "payments"
    objects: {
      books: Prisma.$booksPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      pay_id: number
      user_id: number
      book_id: number
      amount: Prisma.Decimal
      status: string
      paid_at: Date
    }, ExtArgs["result"]["payments"]>
    composites: {}
  }

  type paymentsGetPayload<S extends boolean | null | undefined | paymentsDefaultArgs> = $Result.GetResult<Prisma.$paymentsPayload, S>

  type paymentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<paymentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentsCountAggregateInputType | true
    }

  export interface paymentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['payments'], meta: { name: 'payments' } }
    /**
     * Find zero or one Payments that matches the filter.
     * @param {paymentsFindUniqueArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends paymentsFindUniqueArgs>(args: SelectSubset<T, paymentsFindUniqueArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {paymentsFindUniqueOrThrowArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends paymentsFindUniqueOrThrowArgs>(args: SelectSubset<T, paymentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paymentsFindFirstArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends paymentsFindFirstArgs>(args?: SelectSubset<T, paymentsFindFirstArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paymentsFindFirstOrThrowArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends paymentsFindFirstOrThrowArgs>(args?: SelectSubset<T, paymentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paymentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payments.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payments.findMany({ take: 10 })
     * 
     * // Only select the `pay_id`
     * const paymentsWithPay_idOnly = await prisma.payments.findMany({ select: { pay_id: true } })
     * 
     */
    findMany<T extends paymentsFindManyArgs>(args?: SelectSubset<T, paymentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payments.
     * @param {paymentsCreateArgs} args - Arguments to create a Payments.
     * @example
     * // Create one Payments
     * const Payments = await prisma.payments.create({
     *   data: {
     *     // ... data to create a Payments
     *   }
     * })
     * 
     */
    create<T extends paymentsCreateArgs>(args: SelectSubset<T, paymentsCreateArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {paymentsCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payments = await prisma.payments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends paymentsCreateManyArgs>(args?: SelectSubset<T, paymentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payments.
     * @param {paymentsDeleteArgs} args - Arguments to delete one Payments.
     * @example
     * // Delete one Payments
     * const Payments = await prisma.payments.delete({
     *   where: {
     *     // ... filter to delete one Payments
     *   }
     * })
     * 
     */
    delete<T extends paymentsDeleteArgs>(args: SelectSubset<T, paymentsDeleteArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payments.
     * @param {paymentsUpdateArgs} args - Arguments to update one Payments.
     * @example
     * // Update one Payments
     * const payments = await prisma.payments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends paymentsUpdateArgs>(args: SelectSubset<T, paymentsUpdateArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {paymentsDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends paymentsDeleteManyArgs>(args?: SelectSubset<T, paymentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paymentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payments = await prisma.payments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends paymentsUpdateManyArgs>(args: SelectSubset<T, paymentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payments.
     * @param {paymentsUpsertArgs} args - Arguments to update or create a Payments.
     * @example
     * // Update or create a Payments
     * const payments = await prisma.payments.upsert({
     *   create: {
     *     // ... data to create a Payments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payments we want to update
     *   }
     * })
     */
    upsert<T extends paymentsUpsertArgs>(args: SelectSubset<T, paymentsUpsertArgs<ExtArgs>>): Prisma__paymentsClient<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paymentsCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payments.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends paymentsCountArgs>(
      args?: Subset<T, paymentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentsAggregateArgs>(args: Subset<T, PaymentsAggregateArgs>): Prisma.PrismaPromise<GetPaymentsAggregateType<T>>

    /**
     * Group by Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paymentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends paymentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: paymentsGroupByArgs['orderBy'] }
        : { orderBy?: paymentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, paymentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the payments model
   */
  readonly fields: paymentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for payments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__paymentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends booksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, booksDefaultArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the payments model
   */
  interface paymentsFieldRefs {
    readonly pay_id: FieldRef<"payments", 'Int'>
    readonly user_id: FieldRef<"payments", 'Int'>
    readonly book_id: FieldRef<"payments", 'Int'>
    readonly amount: FieldRef<"payments", 'Decimal'>
    readonly status: FieldRef<"payments", 'String'>
    readonly paid_at: FieldRef<"payments", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * payments findUnique
   */
  export type paymentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * Filter, which payments to fetch.
     */
    where: paymentsWhereUniqueInput
  }

  /**
   * payments findUniqueOrThrow
   */
  export type paymentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * Filter, which payments to fetch.
     */
    where: paymentsWhereUniqueInput
  }

  /**
   * payments findFirst
   */
  export type paymentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * Filter, which payments to fetch.
     */
    where?: paymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of payments to fetch.
     */
    orderBy?: paymentsOrderByWithRelationInput | paymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for payments.
     */
    cursor?: paymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of payments.
     */
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * payments findFirstOrThrow
   */
  export type paymentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * Filter, which payments to fetch.
     */
    where?: paymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of payments to fetch.
     */
    orderBy?: paymentsOrderByWithRelationInput | paymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for payments.
     */
    cursor?: paymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of payments.
     */
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * payments findMany
   */
  export type paymentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * Filter, which payments to fetch.
     */
    where?: paymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of payments to fetch.
     */
    orderBy?: paymentsOrderByWithRelationInput | paymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing payments.
     */
    cursor?: paymentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` payments.
     */
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * payments create
   */
  export type paymentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * The data needed to create a payments.
     */
    data: XOR<paymentsCreateInput, paymentsUncheckedCreateInput>
  }

  /**
   * payments createMany
   */
  export type paymentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many payments.
     */
    data: paymentsCreateManyInput | paymentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * payments update
   */
  export type paymentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * The data needed to update a payments.
     */
    data: XOR<paymentsUpdateInput, paymentsUncheckedUpdateInput>
    /**
     * Choose, which payments to update.
     */
    where: paymentsWhereUniqueInput
  }

  /**
   * payments updateMany
   */
  export type paymentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update payments.
     */
    data: XOR<paymentsUpdateManyMutationInput, paymentsUncheckedUpdateManyInput>
    /**
     * Filter which payments to update
     */
    where?: paymentsWhereInput
    /**
     * Limit how many payments to update.
     */
    limit?: number
  }

  /**
   * payments upsert
   */
  export type paymentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * The filter to search for the payments to update in case it exists.
     */
    where: paymentsWhereUniqueInput
    /**
     * In case the payments found by the `where` argument doesn't exist, create a new payments with this data.
     */
    create: XOR<paymentsCreateInput, paymentsUncheckedCreateInput>
    /**
     * In case the payments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<paymentsUpdateInput, paymentsUncheckedUpdateInput>
  }

  /**
   * payments delete
   */
  export type paymentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    /**
     * Filter which payments to delete.
     */
    where: paymentsWhereUniqueInput
  }

  /**
   * payments deleteMany
   */
  export type paymentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which payments to delete
     */
    where?: paymentsWhereInput
    /**
     * Limit how many payments to delete.
     */
    limit?: number
  }

  /**
   * payments without action
   */
  export type paymentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
  }


  /**
   * Model ratings
   */

  export type AggregateRatings = {
    _count: RatingsCountAggregateOutputType | null
    _avg: RatingsAvgAggregateOutputType | null
    _sum: RatingsSumAggregateOutputType | null
    _min: RatingsMinAggregateOutputType | null
    _max: RatingsMaxAggregateOutputType | null
  }

  export type RatingsAvgAggregateOutputType = {
    rating_id: number | null
    book_id: number | null
    user_id: number | null
    rating: number | null
  }

  export type RatingsSumAggregateOutputType = {
    rating_id: number | null
    book_id: number | null
    user_id: number | null
    rating: number | null
  }

  export type RatingsMinAggregateOutputType = {
    rating_id: number | null
    book_id: number | null
    user_id: number | null
    rating: number | null
    review: string | null
    created_at: Date | null
  }

  export type RatingsMaxAggregateOutputType = {
    rating_id: number | null
    book_id: number | null
    user_id: number | null
    rating: number | null
    review: string | null
    created_at: Date | null
  }

  export type RatingsCountAggregateOutputType = {
    rating_id: number
    book_id: number
    user_id: number
    rating: number
    review: number
    created_at: number
    _all: number
  }


  export type RatingsAvgAggregateInputType = {
    rating_id?: true
    book_id?: true
    user_id?: true
    rating?: true
  }

  export type RatingsSumAggregateInputType = {
    rating_id?: true
    book_id?: true
    user_id?: true
    rating?: true
  }

  export type RatingsMinAggregateInputType = {
    rating_id?: true
    book_id?: true
    user_id?: true
    rating?: true
    review?: true
    created_at?: true
  }

  export type RatingsMaxAggregateInputType = {
    rating_id?: true
    book_id?: true
    user_id?: true
    rating?: true
    review?: true
    created_at?: true
  }

  export type RatingsCountAggregateInputType = {
    rating_id?: true
    book_id?: true
    user_id?: true
    rating?: true
    review?: true
    created_at?: true
    _all?: true
  }

  export type RatingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ratings to aggregate.
     */
    where?: ratingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ratings to fetch.
     */
    orderBy?: ratingsOrderByWithRelationInput | ratingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ratingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ratings
    **/
    _count?: true | RatingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingsMaxAggregateInputType
  }

  export type GetRatingsAggregateType<T extends RatingsAggregateArgs> = {
        [P in keyof T & keyof AggregateRatings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRatings[P]>
      : GetScalarType<T[P], AggregateRatings[P]>
  }




  export type ratingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ratingsWhereInput
    orderBy?: ratingsOrderByWithAggregationInput | ratingsOrderByWithAggregationInput[]
    by: RatingsScalarFieldEnum[] | RatingsScalarFieldEnum
    having?: ratingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingsCountAggregateInputType | true
    _avg?: RatingsAvgAggregateInputType
    _sum?: RatingsSumAggregateInputType
    _min?: RatingsMinAggregateInputType
    _max?: RatingsMaxAggregateInputType
  }

  export type RatingsGroupByOutputType = {
    rating_id: number
    book_id: number
    user_id: number
    rating: number
    review: string | null
    created_at: Date
    _count: RatingsCountAggregateOutputType | null
    _avg: RatingsAvgAggregateOutputType | null
    _sum: RatingsSumAggregateOutputType | null
    _min: RatingsMinAggregateOutputType | null
    _max: RatingsMaxAggregateOutputType | null
  }

  type GetRatingsGroupByPayload<T extends ratingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingsGroupByOutputType[P]>
            : GetScalarType<T[P], RatingsGroupByOutputType[P]>
        }
      >
    >


  export type ratingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rating_id?: boolean
    book_id?: boolean
    user_id?: boolean
    rating?: boolean
    review?: boolean
    created_at?: boolean
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ratings"]>



  export type ratingsSelectScalar = {
    rating_id?: boolean
    book_id?: boolean
    user_id?: boolean
    rating?: boolean
    review?: boolean
    created_at?: boolean
  }

  export type ratingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"rating_id" | "book_id" | "user_id" | "rating" | "review" | "created_at", ExtArgs["result"]["ratings"]>
  export type ratingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $ratingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ratings"
    objects: {
      books: Prisma.$booksPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      rating_id: number
      book_id: number
      user_id: number
      rating: number
      review: string | null
      created_at: Date
    }, ExtArgs["result"]["ratings"]>
    composites: {}
  }

  type ratingsGetPayload<S extends boolean | null | undefined | ratingsDefaultArgs> = $Result.GetResult<Prisma.$ratingsPayload, S>

  type ratingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ratingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatingsCountAggregateInputType | true
    }

  export interface ratingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ratings'], meta: { name: 'ratings' } }
    /**
     * Find zero or one Ratings that matches the filter.
     * @param {ratingsFindUniqueArgs} args - Arguments to find a Ratings
     * @example
     * // Get one Ratings
     * const ratings = await prisma.ratings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ratingsFindUniqueArgs>(args: SelectSubset<T, ratingsFindUniqueArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ratings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ratingsFindUniqueOrThrowArgs} args - Arguments to find a Ratings
     * @example
     * // Get one Ratings
     * const ratings = await prisma.ratings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ratingsFindUniqueOrThrowArgs>(args: SelectSubset<T, ratingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ratingsFindFirstArgs} args - Arguments to find a Ratings
     * @example
     * // Get one Ratings
     * const ratings = await prisma.ratings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ratingsFindFirstArgs>(args?: SelectSubset<T, ratingsFindFirstArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ratings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ratingsFindFirstOrThrowArgs} args - Arguments to find a Ratings
     * @example
     * // Get one Ratings
     * const ratings = await prisma.ratings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ratingsFindFirstOrThrowArgs>(args?: SelectSubset<T, ratingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ratingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.ratings.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.ratings.findMany({ take: 10 })
     * 
     * // Only select the `rating_id`
     * const ratingsWithRating_idOnly = await prisma.ratings.findMany({ select: { rating_id: true } })
     * 
     */
    findMany<T extends ratingsFindManyArgs>(args?: SelectSubset<T, ratingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ratings.
     * @param {ratingsCreateArgs} args - Arguments to create a Ratings.
     * @example
     * // Create one Ratings
     * const Ratings = await prisma.ratings.create({
     *   data: {
     *     // ... data to create a Ratings
     *   }
     * })
     * 
     */
    create<T extends ratingsCreateArgs>(args: SelectSubset<T, ratingsCreateArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratings.
     * @param {ratingsCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const ratings = await prisma.ratings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ratingsCreateManyArgs>(args?: SelectSubset<T, ratingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ratings.
     * @param {ratingsDeleteArgs} args - Arguments to delete one Ratings.
     * @example
     * // Delete one Ratings
     * const Ratings = await prisma.ratings.delete({
     *   where: {
     *     // ... filter to delete one Ratings
     *   }
     * })
     * 
     */
    delete<T extends ratingsDeleteArgs>(args: SelectSubset<T, ratingsDeleteArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ratings.
     * @param {ratingsUpdateArgs} args - Arguments to update one Ratings.
     * @example
     * // Update one Ratings
     * const ratings = await prisma.ratings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ratingsUpdateArgs>(args: SelectSubset<T, ratingsUpdateArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratings.
     * @param {ratingsDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.ratings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ratingsDeleteManyArgs>(args?: SelectSubset<T, ratingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ratingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const ratings = await prisma.ratings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ratingsUpdateManyArgs>(args: SelectSubset<T, ratingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ratings.
     * @param {ratingsUpsertArgs} args - Arguments to update or create a Ratings.
     * @example
     * // Update or create a Ratings
     * const ratings = await prisma.ratings.upsert({
     *   create: {
     *     // ... data to create a Ratings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ratings we want to update
     *   }
     * })
     */
    upsert<T extends ratingsUpsertArgs>(args: SelectSubset<T, ratingsUpsertArgs<ExtArgs>>): Prisma__ratingsClient<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ratingsCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.ratings.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends ratingsCountArgs>(
      args?: Subset<T, ratingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RatingsAggregateArgs>(args: Subset<T, RatingsAggregateArgs>): Prisma.PrismaPromise<GetRatingsAggregateType<T>>

    /**
     * Group by Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ratingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ratingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ratingsGroupByArgs['orderBy'] }
        : { orderBy?: ratingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ratingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ratings model
   */
  readonly fields: ratingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ratings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ratingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends booksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, booksDefaultArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ratings model
   */
  interface ratingsFieldRefs {
    readonly rating_id: FieldRef<"ratings", 'Int'>
    readonly book_id: FieldRef<"ratings", 'Int'>
    readonly user_id: FieldRef<"ratings", 'Int'>
    readonly rating: FieldRef<"ratings", 'Int'>
    readonly review: FieldRef<"ratings", 'String'>
    readonly created_at: FieldRef<"ratings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ratings findUnique
   */
  export type ratingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * Filter, which ratings to fetch.
     */
    where: ratingsWhereUniqueInput
  }

  /**
   * ratings findUniqueOrThrow
   */
  export type ratingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * Filter, which ratings to fetch.
     */
    where: ratingsWhereUniqueInput
  }

  /**
   * ratings findFirst
   */
  export type ratingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * Filter, which ratings to fetch.
     */
    where?: ratingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ratings to fetch.
     */
    orderBy?: ratingsOrderByWithRelationInput | ratingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ratings.
     */
    cursor?: ratingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ratings.
     */
    distinct?: RatingsScalarFieldEnum | RatingsScalarFieldEnum[]
  }

  /**
   * ratings findFirstOrThrow
   */
  export type ratingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * Filter, which ratings to fetch.
     */
    where?: ratingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ratings to fetch.
     */
    orderBy?: ratingsOrderByWithRelationInput | ratingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ratings.
     */
    cursor?: ratingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ratings.
     */
    distinct?: RatingsScalarFieldEnum | RatingsScalarFieldEnum[]
  }

  /**
   * ratings findMany
   */
  export type ratingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * Filter, which ratings to fetch.
     */
    where?: ratingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ratings to fetch.
     */
    orderBy?: ratingsOrderByWithRelationInput | ratingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ratings.
     */
    cursor?: ratingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ratings.
     */
    skip?: number
    distinct?: RatingsScalarFieldEnum | RatingsScalarFieldEnum[]
  }

  /**
   * ratings create
   */
  export type ratingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * The data needed to create a ratings.
     */
    data: XOR<ratingsCreateInput, ratingsUncheckedCreateInput>
  }

  /**
   * ratings createMany
   */
  export type ratingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ratings.
     */
    data: ratingsCreateManyInput | ratingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ratings update
   */
  export type ratingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * The data needed to update a ratings.
     */
    data: XOR<ratingsUpdateInput, ratingsUncheckedUpdateInput>
    /**
     * Choose, which ratings to update.
     */
    where: ratingsWhereUniqueInput
  }

  /**
   * ratings updateMany
   */
  export type ratingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ratings.
     */
    data: XOR<ratingsUpdateManyMutationInput, ratingsUncheckedUpdateManyInput>
    /**
     * Filter which ratings to update
     */
    where?: ratingsWhereInput
    /**
     * Limit how many ratings to update.
     */
    limit?: number
  }

  /**
   * ratings upsert
   */
  export type ratingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * The filter to search for the ratings to update in case it exists.
     */
    where: ratingsWhereUniqueInput
    /**
     * In case the ratings found by the `where` argument doesn't exist, create a new ratings with this data.
     */
    create: XOR<ratingsCreateInput, ratingsUncheckedCreateInput>
    /**
     * In case the ratings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ratingsUpdateInput, ratingsUncheckedUpdateInput>
  }

  /**
   * ratings delete
   */
  export type ratingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    /**
     * Filter which ratings to delete.
     */
    where: ratingsWhereUniqueInput
  }

  /**
   * ratings deleteMany
   */
  export type ratingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ratings to delete
     */
    where?: ratingsWhereInput
    /**
     * Limit how many ratings to delete.
     */
    limit?: number
  }

  /**
   * ratings without action
   */
  export type ratingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
  }


  /**
   * Model user_books
   */

  export type AggregateUser_books = {
    _count: User_booksCountAggregateOutputType | null
    _avg: User_booksAvgAggregateOutputType | null
    _sum: User_booksSumAggregateOutputType | null
    _min: User_booksMinAggregateOutputType | null
    _max: User_booksMaxAggregateOutputType | null
  }

  export type User_booksAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
  }

  export type User_booksSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
  }

  export type User_booksMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
    purchased_at: Date | null
  }

  export type User_booksMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
    purchased_at: Date | null
  }

  export type User_booksCountAggregateOutputType = {
    id: number
    user_id: number
    book_id: number
    purchased_at: number
    _all: number
  }


  export type User_booksAvgAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
  }

  export type User_booksSumAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
  }

  export type User_booksMinAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
    purchased_at?: true
  }

  export type User_booksMaxAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
    purchased_at?: true
  }

  export type User_booksCountAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
    purchased_at?: true
    _all?: true
  }

  export type User_booksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_books to aggregate.
     */
    where?: user_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_books to fetch.
     */
    orderBy?: user_booksOrderByWithRelationInput | user_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_books
    **/
    _count?: true | User_booksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_booksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_booksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_booksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_booksMaxAggregateInputType
  }

  export type GetUser_booksAggregateType<T extends User_booksAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_books]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_books[P]>
      : GetScalarType<T[P], AggregateUser_books[P]>
  }




  export type user_booksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_booksWhereInput
    orderBy?: user_booksOrderByWithAggregationInput | user_booksOrderByWithAggregationInput[]
    by: User_booksScalarFieldEnum[] | User_booksScalarFieldEnum
    having?: user_booksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_booksCountAggregateInputType | true
    _avg?: User_booksAvgAggregateInputType
    _sum?: User_booksSumAggregateInputType
    _min?: User_booksMinAggregateInputType
    _max?: User_booksMaxAggregateInputType
  }

  export type User_booksGroupByOutputType = {
    id: number
    user_id: number
    book_id: number
    purchased_at: Date
    _count: User_booksCountAggregateOutputType | null
    _avg: User_booksAvgAggregateOutputType | null
    _sum: User_booksSumAggregateOutputType | null
    _min: User_booksMinAggregateOutputType | null
    _max: User_booksMaxAggregateOutputType | null
  }

  type GetUser_booksGroupByPayload<T extends user_booksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_booksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_booksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_booksGroupByOutputType[P]>
            : GetScalarType<T[P], User_booksGroupByOutputType[P]>
        }
      >
    >


  export type user_booksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    book_id?: boolean
    purchased_at?: boolean
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_books"]>



  export type user_booksSelectScalar = {
    id?: boolean
    user_id?: boolean
    book_id?: boolean
    purchased_at?: boolean
  }

  export type user_booksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "book_id" | "purchased_at", ExtArgs["result"]["user_books"]>
  export type user_booksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | booksDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $user_booksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_books"
    objects: {
      books: Prisma.$booksPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      book_id: number
      purchased_at: Date
    }, ExtArgs["result"]["user_books"]>
    composites: {}
  }

  type user_booksGetPayload<S extends boolean | null | undefined | user_booksDefaultArgs> = $Result.GetResult<Prisma.$user_booksPayload, S>

  type user_booksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_booksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_booksCountAggregateInputType | true
    }

  export interface user_booksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_books'], meta: { name: 'user_books' } }
    /**
     * Find zero or one User_books that matches the filter.
     * @param {user_booksFindUniqueArgs} args - Arguments to find a User_books
     * @example
     * // Get one User_books
     * const user_books = await prisma.user_books.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_booksFindUniqueArgs>(args: SelectSubset<T, user_booksFindUniqueArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_books that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_booksFindUniqueOrThrowArgs} args - Arguments to find a User_books
     * @example
     * // Get one User_books
     * const user_books = await prisma.user_books.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_booksFindUniqueOrThrowArgs>(args: SelectSubset<T, user_booksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_booksFindFirstArgs} args - Arguments to find a User_books
     * @example
     * // Get one User_books
     * const user_books = await prisma.user_books.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_booksFindFirstArgs>(args?: SelectSubset<T, user_booksFindFirstArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_books that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_booksFindFirstOrThrowArgs} args - Arguments to find a User_books
     * @example
     * // Get one User_books
     * const user_books = await prisma.user_books.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_booksFindFirstOrThrowArgs>(args?: SelectSubset<T, user_booksFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_booksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_books
     * const user_books = await prisma.user_books.findMany()
     * 
     * // Get first 10 User_books
     * const user_books = await prisma.user_books.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_booksWithIdOnly = await prisma.user_books.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_booksFindManyArgs>(args?: SelectSubset<T, user_booksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_books.
     * @param {user_booksCreateArgs} args - Arguments to create a User_books.
     * @example
     * // Create one User_books
     * const User_books = await prisma.user_books.create({
     *   data: {
     *     // ... data to create a User_books
     *   }
     * })
     * 
     */
    create<T extends user_booksCreateArgs>(args: SelectSubset<T, user_booksCreateArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_books.
     * @param {user_booksCreateManyArgs} args - Arguments to create many User_books.
     * @example
     * // Create many User_books
     * const user_books = await prisma.user_books.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_booksCreateManyArgs>(args?: SelectSubset<T, user_booksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User_books.
     * @param {user_booksDeleteArgs} args - Arguments to delete one User_books.
     * @example
     * // Delete one User_books
     * const User_books = await prisma.user_books.delete({
     *   where: {
     *     // ... filter to delete one User_books
     *   }
     * })
     * 
     */
    delete<T extends user_booksDeleteArgs>(args: SelectSubset<T, user_booksDeleteArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_books.
     * @param {user_booksUpdateArgs} args - Arguments to update one User_books.
     * @example
     * // Update one User_books
     * const user_books = await prisma.user_books.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_booksUpdateArgs>(args: SelectSubset<T, user_booksUpdateArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_books.
     * @param {user_booksDeleteManyArgs} args - Arguments to filter User_books to delete.
     * @example
     * // Delete a few User_books
     * const { count } = await prisma.user_books.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_booksDeleteManyArgs>(args?: SelectSubset<T, user_booksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_booksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_books
     * const user_books = await prisma.user_books.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_booksUpdateManyArgs>(args: SelectSubset<T, user_booksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User_books.
     * @param {user_booksUpsertArgs} args - Arguments to update or create a User_books.
     * @example
     * // Update or create a User_books
     * const user_books = await prisma.user_books.upsert({
     *   create: {
     *     // ... data to create a User_books
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_books we want to update
     *   }
     * })
     */
    upsert<T extends user_booksUpsertArgs>(args: SelectSubset<T, user_booksUpsertArgs<ExtArgs>>): Prisma__user_booksClient<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_booksCountArgs} args - Arguments to filter User_books to count.
     * @example
     * // Count the number of User_books
     * const count = await prisma.user_books.count({
     *   where: {
     *     // ... the filter for the User_books we want to count
     *   }
     * })
    **/
    count<T extends user_booksCountArgs>(
      args?: Subset<T, user_booksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_booksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_booksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_booksAggregateArgs>(args: Subset<T, User_booksAggregateArgs>): Prisma.PrismaPromise<GetUser_booksAggregateType<T>>

    /**
     * Group by User_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_booksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_booksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_booksGroupByArgs['orderBy'] }
        : { orderBy?: user_booksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_booksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_booksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_books model
   */
  readonly fields: user_booksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_books.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_booksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends booksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, booksDefaultArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_books model
   */
  interface user_booksFieldRefs {
    readonly id: FieldRef<"user_books", 'Int'>
    readonly user_id: FieldRef<"user_books", 'Int'>
    readonly book_id: FieldRef<"user_books", 'Int'>
    readonly purchased_at: FieldRef<"user_books", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_books findUnique
   */
  export type user_booksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * Filter, which user_books to fetch.
     */
    where: user_booksWhereUniqueInput
  }

  /**
   * user_books findUniqueOrThrow
   */
  export type user_booksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * Filter, which user_books to fetch.
     */
    where: user_booksWhereUniqueInput
  }

  /**
   * user_books findFirst
   */
  export type user_booksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * Filter, which user_books to fetch.
     */
    where?: user_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_books to fetch.
     */
    orderBy?: user_booksOrderByWithRelationInput | user_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_books.
     */
    cursor?: user_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_books.
     */
    distinct?: User_booksScalarFieldEnum | User_booksScalarFieldEnum[]
  }

  /**
   * user_books findFirstOrThrow
   */
  export type user_booksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * Filter, which user_books to fetch.
     */
    where?: user_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_books to fetch.
     */
    orderBy?: user_booksOrderByWithRelationInput | user_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_books.
     */
    cursor?: user_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_books.
     */
    distinct?: User_booksScalarFieldEnum | User_booksScalarFieldEnum[]
  }

  /**
   * user_books findMany
   */
  export type user_booksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * Filter, which user_books to fetch.
     */
    where?: user_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_books to fetch.
     */
    orderBy?: user_booksOrderByWithRelationInput | user_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_books.
     */
    cursor?: user_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_books.
     */
    skip?: number
    distinct?: User_booksScalarFieldEnum | User_booksScalarFieldEnum[]
  }

  /**
   * user_books create
   */
  export type user_booksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * The data needed to create a user_books.
     */
    data: XOR<user_booksCreateInput, user_booksUncheckedCreateInput>
  }

  /**
   * user_books createMany
   */
  export type user_booksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_books.
     */
    data: user_booksCreateManyInput | user_booksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_books update
   */
  export type user_booksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * The data needed to update a user_books.
     */
    data: XOR<user_booksUpdateInput, user_booksUncheckedUpdateInput>
    /**
     * Choose, which user_books to update.
     */
    where: user_booksWhereUniqueInput
  }

  /**
   * user_books updateMany
   */
  export type user_booksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_books.
     */
    data: XOR<user_booksUpdateManyMutationInput, user_booksUncheckedUpdateManyInput>
    /**
     * Filter which user_books to update
     */
    where?: user_booksWhereInput
    /**
     * Limit how many user_books to update.
     */
    limit?: number
  }

  /**
   * user_books upsert
   */
  export type user_booksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * The filter to search for the user_books to update in case it exists.
     */
    where: user_booksWhereUniqueInput
    /**
     * In case the user_books found by the `where` argument doesn't exist, create a new user_books with this data.
     */
    create: XOR<user_booksCreateInput, user_booksUncheckedCreateInput>
    /**
     * In case the user_books was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_booksUpdateInput, user_booksUncheckedUpdateInput>
  }

  /**
   * user_books delete
   */
  export type user_booksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    /**
     * Filter which user_books to delete.
     */
    where: user_booksWhereUniqueInput
  }

  /**
   * user_books deleteMany
   */
  export type user_booksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_books to delete
     */
    where?: user_booksWhereInput
    /**
     * Limit how many user_books to delete.
     */
    limit?: number
  }

  /**
   * user_books without action
   */
  export type user_booksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UsersSumAggregateOutputType = {
    user_id: number | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: number | null
    username: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: number | null
    username: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    username: number
    email: number
    password: number
    name: number
    role: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    user_id?: true
  }

  export type UsersSumAggregateInputType = {
    user_id?: true
  }

  export type UsersMinAggregateInputType = {
    user_id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    role?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    role?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    role?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: number
    username: string
    email: string
    password: string
    name: string | null
    role: string
    created_at: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    created_at?: boolean
    book_requests?: boolean | users$book_requestsArgs<ExtArgs>
    books?: boolean | users$booksArgs<ExtArgs>
    comments?: boolean | users$commentsArgs<ExtArgs>
    payments?: boolean | users$paymentsArgs<ExtArgs>
    ratings?: boolean | users$ratingsArgs<ExtArgs>
    user_books?: boolean | users$user_booksArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    user_id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "username" | "email" | "password" | "name" | "role" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book_requests?: boolean | users$book_requestsArgs<ExtArgs>
    books?: boolean | users$booksArgs<ExtArgs>
    comments?: boolean | users$commentsArgs<ExtArgs>
    payments?: boolean | users$paymentsArgs<ExtArgs>
    ratings?: boolean | users$ratingsArgs<ExtArgs>
    user_books?: boolean | users$user_booksArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      book_requests: Prisma.$book_requestsPayload<ExtArgs>[]
      books: Prisma.$booksPayload<ExtArgs>[]
      comments: Prisma.$commentsPayload<ExtArgs>[]
      payments: Prisma.$paymentsPayload<ExtArgs>[]
      ratings: Prisma.$ratingsPayload<ExtArgs>[]
      user_books: Prisma.$user_booksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      username: string
      email: string
      password: string
      name: string | null
      role: string
      created_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book_requests<T extends users$book_requestsArgs<ExtArgs> = {}>(args?: Subset<T, users$book_requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    books<T extends users$booksArgs<ExtArgs> = {}>(args?: Subset<T, users$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends users$commentsArgs<ExtArgs> = {}>(args?: Subset<T, users$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends users$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, users$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ratings<T extends users$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, users$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ratingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_books<T extends users$user_booksArgs<ExtArgs> = {}>(args?: Subset<T, users$user_booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_booksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly user_id: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.book_requests
   */
  export type users$book_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    where?: book_requestsWhereInput
    orderBy?: book_requestsOrderByWithRelationInput | book_requestsOrderByWithRelationInput[]
    cursor?: book_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Book_requestsScalarFieldEnum | Book_requestsScalarFieldEnum[]
  }

  /**
   * users.books
   */
  export type users$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    where?: booksWhereInput
    orderBy?: booksOrderByWithRelationInput | booksOrderByWithRelationInput[]
    cursor?: booksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * users.comments
   */
  export type users$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    where?: commentsWhereInput
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    cursor?: commentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * users.payments
   */
  export type users$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the payments
     */
    select?: paymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the payments
     */
    omit?: paymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paymentsInclude<ExtArgs> | null
    where?: paymentsWhereInput
    orderBy?: paymentsOrderByWithRelationInput | paymentsOrderByWithRelationInput[]
    cursor?: paymentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * users.ratings
   */
  export type users$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ratings
     */
    select?: ratingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ratings
     */
    omit?: ratingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ratingsInclude<ExtArgs> | null
    where?: ratingsWhereInput
    orderBy?: ratingsOrderByWithRelationInput | ratingsOrderByWithRelationInput[]
    cursor?: ratingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingsScalarFieldEnum | RatingsScalarFieldEnum[]
  }

  /**
   * users.user_books
   */
  export type users$user_booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_books
     */
    select?: user_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_books
     */
    omit?: user_booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_booksInclude<ExtArgs> | null
    where?: user_booksWhereInput
    orderBy?: user_booksOrderByWithRelationInput | user_booksOrderByWithRelationInput[]
    cursor?: user_booksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_booksScalarFieldEnum | User_booksScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model book_requests
   */

  export type AggregateBook_requests = {
    _count: Book_requestsCountAggregateOutputType | null
    _avg: Book_requestsAvgAggregateOutputType | null
    _sum: Book_requestsSumAggregateOutputType | null
    _min: Book_requestsMinAggregateOutputType | null
    _max: Book_requestsMaxAggregateOutputType | null
  }

  export type Book_requestsAvgAggregateOutputType = {
    request_id: number | null
    book_id: number | null
    author_id: number | null
  }

  export type Book_requestsSumAggregateOutputType = {
    request_id: number | null
    book_id: number | null
    author_id: number | null
  }

  export type Book_requestsMinAggregateOutputType = {
    request_id: number | null
    book_id: number | null
    author_id: number | null
    action: string | null
    details: string | null
    status: string | null
    created_at: Date | null
  }

  export type Book_requestsMaxAggregateOutputType = {
    request_id: number | null
    book_id: number | null
    author_id: number | null
    action: string | null
    details: string | null
    status: string | null
    created_at: Date | null
  }

  export type Book_requestsCountAggregateOutputType = {
    request_id: number
    book_id: number
    author_id: number
    action: number
    details: number
    status: number
    created_at: number
    _all: number
  }


  export type Book_requestsAvgAggregateInputType = {
    request_id?: true
    book_id?: true
    author_id?: true
  }

  export type Book_requestsSumAggregateInputType = {
    request_id?: true
    book_id?: true
    author_id?: true
  }

  export type Book_requestsMinAggregateInputType = {
    request_id?: true
    book_id?: true
    author_id?: true
    action?: true
    details?: true
    status?: true
    created_at?: true
  }

  export type Book_requestsMaxAggregateInputType = {
    request_id?: true
    book_id?: true
    author_id?: true
    action?: true
    details?: true
    status?: true
    created_at?: true
  }

  export type Book_requestsCountAggregateInputType = {
    request_id?: true
    book_id?: true
    author_id?: true
    action?: true
    details?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type Book_requestsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which book_requests to aggregate.
     */
    where?: book_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_requests to fetch.
     */
    orderBy?: book_requestsOrderByWithRelationInput | book_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: book_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned book_requests
    **/
    _count?: true | Book_requestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Book_requestsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Book_requestsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Book_requestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Book_requestsMaxAggregateInputType
  }

  export type GetBook_requestsAggregateType<T extends Book_requestsAggregateArgs> = {
        [P in keyof T & keyof AggregateBook_requests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook_requests[P]>
      : GetScalarType<T[P], AggregateBook_requests[P]>
  }




  export type book_requestsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: book_requestsWhereInput
    orderBy?: book_requestsOrderByWithAggregationInput | book_requestsOrderByWithAggregationInput[]
    by: Book_requestsScalarFieldEnum[] | Book_requestsScalarFieldEnum
    having?: book_requestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Book_requestsCountAggregateInputType | true
    _avg?: Book_requestsAvgAggregateInputType
    _sum?: Book_requestsSumAggregateInputType
    _min?: Book_requestsMinAggregateInputType
    _max?: Book_requestsMaxAggregateInputType
  }

  export type Book_requestsGroupByOutputType = {
    request_id: number
    book_id: number | null
    author_id: number
    action: string
    details: string | null
    status: string
    created_at: Date
    _count: Book_requestsCountAggregateOutputType | null
    _avg: Book_requestsAvgAggregateOutputType | null
    _sum: Book_requestsSumAggregateOutputType | null
    _min: Book_requestsMinAggregateOutputType | null
    _max: Book_requestsMaxAggregateOutputType | null
  }

  type GetBook_requestsGroupByPayload<T extends book_requestsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Book_requestsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Book_requestsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Book_requestsGroupByOutputType[P]>
            : GetScalarType<T[P], Book_requestsGroupByOutputType[P]>
        }
      >
    >


  export type book_requestsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    book_id?: boolean
    author_id?: boolean
    action?: boolean
    details?: boolean
    status?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    books?: boolean | book_requests$booksArgs<ExtArgs>
  }, ExtArgs["result"]["book_requests"]>



  export type book_requestsSelectScalar = {
    request_id?: boolean
    book_id?: boolean
    author_id?: boolean
    action?: boolean
    details?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type book_requestsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "book_id" | "author_id" | "action" | "details" | "status" | "created_at", ExtArgs["result"]["book_requests"]>
  export type book_requestsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    books?: boolean | book_requests$booksArgs<ExtArgs>
  }

  export type $book_requestsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "book_requests"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      books: Prisma.$booksPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      book_id: number | null
      author_id: number
      action: string
      details: string | null
      status: string
      created_at: Date
    }, ExtArgs["result"]["book_requests"]>
    composites: {}
  }

  type book_requestsGetPayload<S extends boolean | null | undefined | book_requestsDefaultArgs> = $Result.GetResult<Prisma.$book_requestsPayload, S>

  type book_requestsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<book_requestsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Book_requestsCountAggregateInputType | true
    }

  export interface book_requestsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['book_requests'], meta: { name: 'book_requests' } }
    /**
     * Find zero or one Book_requests that matches the filter.
     * @param {book_requestsFindUniqueArgs} args - Arguments to find a Book_requests
     * @example
     * // Get one Book_requests
     * const book_requests = await prisma.book_requests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends book_requestsFindUniqueArgs>(args: SelectSubset<T, book_requestsFindUniqueArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book_requests that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {book_requestsFindUniqueOrThrowArgs} args - Arguments to find a Book_requests
     * @example
     * // Get one Book_requests
     * const book_requests = await prisma.book_requests.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends book_requestsFindUniqueOrThrowArgs>(args: SelectSubset<T, book_requestsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_requestsFindFirstArgs} args - Arguments to find a Book_requests
     * @example
     * // Get one Book_requests
     * const book_requests = await prisma.book_requests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends book_requestsFindFirstArgs>(args?: SelectSubset<T, book_requestsFindFirstArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book_requests that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_requestsFindFirstOrThrowArgs} args - Arguments to find a Book_requests
     * @example
     * // Get one Book_requests
     * const book_requests = await prisma.book_requests.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends book_requestsFindFirstOrThrowArgs>(args?: SelectSubset<T, book_requestsFindFirstOrThrowArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Book_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_requestsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Book_requests
     * const book_requests = await prisma.book_requests.findMany()
     * 
     * // Get first 10 Book_requests
     * const book_requests = await prisma.book_requests.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const book_requestsWithRequest_idOnly = await prisma.book_requests.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends book_requestsFindManyArgs>(args?: SelectSubset<T, book_requestsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book_requests.
     * @param {book_requestsCreateArgs} args - Arguments to create a Book_requests.
     * @example
     * // Create one Book_requests
     * const Book_requests = await prisma.book_requests.create({
     *   data: {
     *     // ... data to create a Book_requests
     *   }
     * })
     * 
     */
    create<T extends book_requestsCreateArgs>(args: SelectSubset<T, book_requestsCreateArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Book_requests.
     * @param {book_requestsCreateManyArgs} args - Arguments to create many Book_requests.
     * @example
     * // Create many Book_requests
     * const book_requests = await prisma.book_requests.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends book_requestsCreateManyArgs>(args?: SelectSubset<T, book_requestsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Book_requests.
     * @param {book_requestsDeleteArgs} args - Arguments to delete one Book_requests.
     * @example
     * // Delete one Book_requests
     * const Book_requests = await prisma.book_requests.delete({
     *   where: {
     *     // ... filter to delete one Book_requests
     *   }
     * })
     * 
     */
    delete<T extends book_requestsDeleteArgs>(args: SelectSubset<T, book_requestsDeleteArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book_requests.
     * @param {book_requestsUpdateArgs} args - Arguments to update one Book_requests.
     * @example
     * // Update one Book_requests
     * const book_requests = await prisma.book_requests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends book_requestsUpdateArgs>(args: SelectSubset<T, book_requestsUpdateArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Book_requests.
     * @param {book_requestsDeleteManyArgs} args - Arguments to filter Book_requests to delete.
     * @example
     * // Delete a few Book_requests
     * const { count } = await prisma.book_requests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends book_requestsDeleteManyArgs>(args?: SelectSubset<T, book_requestsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Book_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_requestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Book_requests
     * const book_requests = await prisma.book_requests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends book_requestsUpdateManyArgs>(args: SelectSubset<T, book_requestsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Book_requests.
     * @param {book_requestsUpsertArgs} args - Arguments to update or create a Book_requests.
     * @example
     * // Update or create a Book_requests
     * const book_requests = await prisma.book_requests.upsert({
     *   create: {
     *     // ... data to create a Book_requests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book_requests we want to update
     *   }
     * })
     */
    upsert<T extends book_requestsUpsertArgs>(args: SelectSubset<T, book_requestsUpsertArgs<ExtArgs>>): Prisma__book_requestsClient<$Result.GetResult<Prisma.$book_requestsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Book_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_requestsCountArgs} args - Arguments to filter Book_requests to count.
     * @example
     * // Count the number of Book_requests
     * const count = await prisma.book_requests.count({
     *   where: {
     *     // ... the filter for the Book_requests we want to count
     *   }
     * })
    **/
    count<T extends book_requestsCountArgs>(
      args?: Subset<T, book_requestsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Book_requestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Book_requestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Book_requestsAggregateArgs>(args: Subset<T, Book_requestsAggregateArgs>): Prisma.PrismaPromise<GetBook_requestsAggregateType<T>>

    /**
     * Group by Book_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {book_requestsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends book_requestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: book_requestsGroupByArgs['orderBy'] }
        : { orderBy?: book_requestsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, book_requestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBook_requestsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the book_requests model
   */
  readonly fields: book_requestsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for book_requests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__book_requestsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    books<T extends book_requests$booksArgs<ExtArgs> = {}>(args?: Subset<T, book_requests$booksArgs<ExtArgs>>): Prisma__booksClient<$Result.GetResult<Prisma.$booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the book_requests model
   */
  interface book_requestsFieldRefs {
    readonly request_id: FieldRef<"book_requests", 'Int'>
    readonly book_id: FieldRef<"book_requests", 'Int'>
    readonly author_id: FieldRef<"book_requests", 'Int'>
    readonly action: FieldRef<"book_requests", 'String'>
    readonly details: FieldRef<"book_requests", 'String'>
    readonly status: FieldRef<"book_requests", 'String'>
    readonly created_at: FieldRef<"book_requests", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * book_requests findUnique
   */
  export type book_requestsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * Filter, which book_requests to fetch.
     */
    where: book_requestsWhereUniqueInput
  }

  /**
   * book_requests findUniqueOrThrow
   */
  export type book_requestsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * Filter, which book_requests to fetch.
     */
    where: book_requestsWhereUniqueInput
  }

  /**
   * book_requests findFirst
   */
  export type book_requestsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * Filter, which book_requests to fetch.
     */
    where?: book_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_requests to fetch.
     */
    orderBy?: book_requestsOrderByWithRelationInput | book_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for book_requests.
     */
    cursor?: book_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of book_requests.
     */
    distinct?: Book_requestsScalarFieldEnum | Book_requestsScalarFieldEnum[]
  }

  /**
   * book_requests findFirstOrThrow
   */
  export type book_requestsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * Filter, which book_requests to fetch.
     */
    where?: book_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_requests to fetch.
     */
    orderBy?: book_requestsOrderByWithRelationInput | book_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for book_requests.
     */
    cursor?: book_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of book_requests.
     */
    distinct?: Book_requestsScalarFieldEnum | Book_requestsScalarFieldEnum[]
  }

  /**
   * book_requests findMany
   */
  export type book_requestsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * Filter, which book_requests to fetch.
     */
    where?: book_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of book_requests to fetch.
     */
    orderBy?: book_requestsOrderByWithRelationInput | book_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing book_requests.
     */
    cursor?: book_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` book_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` book_requests.
     */
    skip?: number
    distinct?: Book_requestsScalarFieldEnum | Book_requestsScalarFieldEnum[]
  }

  /**
   * book_requests create
   */
  export type book_requestsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * The data needed to create a book_requests.
     */
    data: XOR<book_requestsCreateInput, book_requestsUncheckedCreateInput>
  }

  /**
   * book_requests createMany
   */
  export type book_requestsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many book_requests.
     */
    data: book_requestsCreateManyInput | book_requestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * book_requests update
   */
  export type book_requestsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * The data needed to update a book_requests.
     */
    data: XOR<book_requestsUpdateInput, book_requestsUncheckedUpdateInput>
    /**
     * Choose, which book_requests to update.
     */
    where: book_requestsWhereUniqueInput
  }

  /**
   * book_requests updateMany
   */
  export type book_requestsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update book_requests.
     */
    data: XOR<book_requestsUpdateManyMutationInput, book_requestsUncheckedUpdateManyInput>
    /**
     * Filter which book_requests to update
     */
    where?: book_requestsWhereInput
    /**
     * Limit how many book_requests to update.
     */
    limit?: number
  }

  /**
   * book_requests upsert
   */
  export type book_requestsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * The filter to search for the book_requests to update in case it exists.
     */
    where: book_requestsWhereUniqueInput
    /**
     * In case the book_requests found by the `where` argument doesn't exist, create a new book_requests with this data.
     */
    create: XOR<book_requestsCreateInput, book_requestsUncheckedCreateInput>
    /**
     * In case the book_requests was found with the provided `where` argument, update it with this data.
     */
    update: XOR<book_requestsUpdateInput, book_requestsUncheckedUpdateInput>
  }

  /**
   * book_requests delete
   */
  export type book_requestsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
    /**
     * Filter which book_requests to delete.
     */
    where: book_requestsWhereUniqueInput
  }

  /**
   * book_requests deleteMany
   */
  export type book_requestsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which book_requests to delete
     */
    where?: book_requestsWhereInput
    /**
     * Limit how many book_requests to delete.
     */
    limit?: number
  }

  /**
   * book_requests.books
   */
  export type book_requests$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the books
     */
    select?: booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the books
     */
    omit?: booksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booksInclude<ExtArgs> | null
    where?: booksWhereInput
  }

  /**
   * book_requests without action
   */
  export type book_requestsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the book_requests
     */
    select?: book_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the book_requests
     */
    omit?: book_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: book_requestsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Book_categoriesScalarFieldEnum: {
    category_id: 'category_id',
    category_name: 'category_name'
  };

  export type Book_categoriesScalarFieldEnum = (typeof Book_categoriesScalarFieldEnum)[keyof typeof Book_categoriesScalarFieldEnum]


  export const Book_category_linksScalarFieldEnum: {
    book_id: 'book_id',
    category_id: 'category_id'
  };

  export type Book_category_linksScalarFieldEnum = (typeof Book_category_linksScalarFieldEnum)[keyof typeof Book_category_linksScalarFieldEnum]


  export const BooksScalarFieldEnum: {
    book_id: 'book_id',
    isbn: 'isbn',
    name: 'name',
    author_id: 'author_id',
    description: 'description',
    cover_image: 'cover_image',
    file_path: 'file_path',
    price: 'price',
    published_date: 'published_date',
    created_at: 'created_at'
  };

  export type BooksScalarFieldEnum = (typeof BooksScalarFieldEnum)[keyof typeof BooksScalarFieldEnum]


  export const CommentsScalarFieldEnum: {
    comments_id: 'comments_id',
    book_id: 'book_id',
    user_id: 'user_id',
    content: 'content',
    created_at: 'created_at'
  };

  export type CommentsScalarFieldEnum = (typeof CommentsScalarFieldEnum)[keyof typeof CommentsScalarFieldEnum]


  export const PaymentsScalarFieldEnum: {
    pay_id: 'pay_id',
    user_id: 'user_id',
    book_id: 'book_id',
    amount: 'amount',
    status: 'status',
    paid_at: 'paid_at'
  };

  export type PaymentsScalarFieldEnum = (typeof PaymentsScalarFieldEnum)[keyof typeof PaymentsScalarFieldEnum]


  export const RatingsScalarFieldEnum: {
    rating_id: 'rating_id',
    book_id: 'book_id',
    user_id: 'user_id',
    rating: 'rating',
    review: 'review',
    created_at: 'created_at'
  };

  export type RatingsScalarFieldEnum = (typeof RatingsScalarFieldEnum)[keyof typeof RatingsScalarFieldEnum]


  export const User_booksScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    book_id: 'book_id',
    purchased_at: 'purchased_at'
  };

  export type User_booksScalarFieldEnum = (typeof User_booksScalarFieldEnum)[keyof typeof User_booksScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    username: 'username',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Book_requestsScalarFieldEnum: {
    request_id: 'request_id',
    book_id: 'book_id',
    author_id: 'author_id',
    action: 'action',
    details: 'details',
    status: 'status',
    created_at: 'created_at'
  };

  export type Book_requestsScalarFieldEnum = (typeof Book_requestsScalarFieldEnum)[keyof typeof Book_requestsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const book_categoriesOrderByRelevanceFieldEnum: {
    category_name: 'category_name'
  };

  export type book_categoriesOrderByRelevanceFieldEnum = (typeof book_categoriesOrderByRelevanceFieldEnum)[keyof typeof book_categoriesOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const booksOrderByRelevanceFieldEnum: {
    isbn: 'isbn',
    name: 'name',
    description: 'description',
    cover_image: 'cover_image',
    file_path: 'file_path'
  };

  export type booksOrderByRelevanceFieldEnum = (typeof booksOrderByRelevanceFieldEnum)[keyof typeof booksOrderByRelevanceFieldEnum]


  export const commentsOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type commentsOrderByRelevanceFieldEnum = (typeof commentsOrderByRelevanceFieldEnum)[keyof typeof commentsOrderByRelevanceFieldEnum]


  export const paymentsOrderByRelevanceFieldEnum: {
    status: 'status'
  };

  export type paymentsOrderByRelevanceFieldEnum = (typeof paymentsOrderByRelevanceFieldEnum)[keyof typeof paymentsOrderByRelevanceFieldEnum]


  export const ratingsOrderByRelevanceFieldEnum: {
    review: 'review'
  };

  export type ratingsOrderByRelevanceFieldEnum = (typeof ratingsOrderByRelevanceFieldEnum)[keyof typeof ratingsOrderByRelevanceFieldEnum]


  export const usersOrderByRelevanceFieldEnum: {
    username: 'username',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  export const book_requestsOrderByRelevanceFieldEnum: {
    action: 'action',
    details: 'details',
    status: 'status'
  };

  export type book_requestsOrderByRelevanceFieldEnum = (typeof book_requestsOrderByRelevanceFieldEnum)[keyof typeof book_requestsOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type book_categoriesWhereInput = {
    AND?: book_categoriesWhereInput | book_categoriesWhereInput[]
    OR?: book_categoriesWhereInput[]
    NOT?: book_categoriesWhereInput | book_categoriesWhereInput[]
    category_id?: IntFilter<"book_categories"> | number
    category_name?: StringFilter<"book_categories"> | string
    book_category_links?: Book_category_linksListRelationFilter
  }

  export type book_categoriesOrderByWithRelationInput = {
    category_id?: SortOrder
    category_name?: SortOrder
    book_category_links?: book_category_linksOrderByRelationAggregateInput
    _relevance?: book_categoriesOrderByRelevanceInput
  }

  export type book_categoriesWhereUniqueInput = Prisma.AtLeast<{
    category_id?: number
    AND?: book_categoriesWhereInput | book_categoriesWhereInput[]
    OR?: book_categoriesWhereInput[]
    NOT?: book_categoriesWhereInput | book_categoriesWhereInput[]
    category_name?: StringFilter<"book_categories"> | string
    book_category_links?: Book_category_linksListRelationFilter
  }, "category_id">

  export type book_categoriesOrderByWithAggregationInput = {
    category_id?: SortOrder
    category_name?: SortOrder
    _count?: book_categoriesCountOrderByAggregateInput
    _avg?: book_categoriesAvgOrderByAggregateInput
    _max?: book_categoriesMaxOrderByAggregateInput
    _min?: book_categoriesMinOrderByAggregateInput
    _sum?: book_categoriesSumOrderByAggregateInput
  }

  export type book_categoriesScalarWhereWithAggregatesInput = {
    AND?: book_categoriesScalarWhereWithAggregatesInput | book_categoriesScalarWhereWithAggregatesInput[]
    OR?: book_categoriesScalarWhereWithAggregatesInput[]
    NOT?: book_categoriesScalarWhereWithAggregatesInput | book_categoriesScalarWhereWithAggregatesInput[]
    category_id?: IntWithAggregatesFilter<"book_categories"> | number
    category_name?: StringWithAggregatesFilter<"book_categories"> | string
  }

  export type book_category_linksWhereInput = {
    AND?: book_category_linksWhereInput | book_category_linksWhereInput[]
    OR?: book_category_linksWhereInput[]
    NOT?: book_category_linksWhereInput | book_category_linksWhereInput[]
    book_id?: IntFilter<"book_category_links"> | number
    category_id?: IntFilter<"book_category_links"> | number
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    book_categories?: XOR<Book_categoriesScalarRelationFilter, book_categoriesWhereInput>
  }

  export type book_category_linksOrderByWithRelationInput = {
    book_id?: SortOrder
    category_id?: SortOrder
    books?: booksOrderByWithRelationInput
    book_categories?: book_categoriesOrderByWithRelationInput
  }

  export type book_category_linksWhereUniqueInput = Prisma.AtLeast<{
    book_id_category_id?: book_category_linksBook_idCategory_idCompoundUniqueInput
    AND?: book_category_linksWhereInput | book_category_linksWhereInput[]
    OR?: book_category_linksWhereInput[]
    NOT?: book_category_linksWhereInput | book_category_linksWhereInput[]
    book_id?: IntFilter<"book_category_links"> | number
    category_id?: IntFilter<"book_category_links"> | number
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    book_categories?: XOR<Book_categoriesScalarRelationFilter, book_categoriesWhereInput>
  }, "book_id_category_id">

  export type book_category_linksOrderByWithAggregationInput = {
    book_id?: SortOrder
    category_id?: SortOrder
    _count?: book_category_linksCountOrderByAggregateInput
    _avg?: book_category_linksAvgOrderByAggregateInput
    _max?: book_category_linksMaxOrderByAggregateInput
    _min?: book_category_linksMinOrderByAggregateInput
    _sum?: book_category_linksSumOrderByAggregateInput
  }

  export type book_category_linksScalarWhereWithAggregatesInput = {
    AND?: book_category_linksScalarWhereWithAggregatesInput | book_category_linksScalarWhereWithAggregatesInput[]
    OR?: book_category_linksScalarWhereWithAggregatesInput[]
    NOT?: book_category_linksScalarWhereWithAggregatesInput | book_category_linksScalarWhereWithAggregatesInput[]
    book_id?: IntWithAggregatesFilter<"book_category_links"> | number
    category_id?: IntWithAggregatesFilter<"book_category_links"> | number
  }

  export type booksWhereInput = {
    AND?: booksWhereInput | booksWhereInput[]
    OR?: booksWhereInput[]
    NOT?: booksWhereInput | booksWhereInput[]
    book_id?: IntFilter<"books"> | number
    isbn?: StringFilter<"books"> | string
    name?: StringFilter<"books"> | string
    author_id?: IntFilter<"books"> | number
    description?: StringNullableFilter<"books"> | string | null
    cover_image?: StringNullableFilter<"books"> | string | null
    file_path?: StringNullableFilter<"books"> | string | null
    price?: DecimalFilter<"books"> | Decimal | DecimalJsLike | number | string
    published_date?: DateTimeNullableFilter<"books"> | Date | string | null
    created_at?: DateTimeFilter<"books"> | Date | string
    book_category_links?: Book_category_linksListRelationFilter
    book_requests?: Book_requestsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    comments?: CommentsListRelationFilter
    payments?: PaymentsListRelationFilter
    ratings?: RatingsListRelationFilter
    user_books?: User_booksListRelationFilter
  }

  export type booksOrderByWithRelationInput = {
    book_id?: SortOrder
    isbn?: SortOrder
    name?: SortOrder
    author_id?: SortOrder
    description?: SortOrderInput | SortOrder
    cover_image?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    price?: SortOrder
    published_date?: SortOrderInput | SortOrder
    created_at?: SortOrder
    book_category_links?: book_category_linksOrderByRelationAggregateInput
    book_requests?: book_requestsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    comments?: commentsOrderByRelationAggregateInput
    payments?: paymentsOrderByRelationAggregateInput
    ratings?: ratingsOrderByRelationAggregateInput
    user_books?: user_booksOrderByRelationAggregateInput
    _relevance?: booksOrderByRelevanceInput
  }

  export type booksWhereUniqueInput = Prisma.AtLeast<{
    book_id?: number
    AND?: booksWhereInput | booksWhereInput[]
    OR?: booksWhereInput[]
    NOT?: booksWhereInput | booksWhereInput[]
    isbn?: StringFilter<"books"> | string
    name?: StringFilter<"books"> | string
    author_id?: IntFilter<"books"> | number
    description?: StringNullableFilter<"books"> | string | null
    cover_image?: StringNullableFilter<"books"> | string | null
    file_path?: StringNullableFilter<"books"> | string | null
    price?: DecimalFilter<"books"> | Decimal | DecimalJsLike | number | string
    published_date?: DateTimeNullableFilter<"books"> | Date | string | null
    created_at?: DateTimeFilter<"books"> | Date | string
    book_category_links?: Book_category_linksListRelationFilter
    book_requests?: Book_requestsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    comments?: CommentsListRelationFilter
    payments?: PaymentsListRelationFilter
    ratings?: RatingsListRelationFilter
    user_books?: User_booksListRelationFilter
  }, "book_id">

  export type booksOrderByWithAggregationInput = {
    book_id?: SortOrder
    isbn?: SortOrder
    name?: SortOrder
    author_id?: SortOrder
    description?: SortOrderInput | SortOrder
    cover_image?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    price?: SortOrder
    published_date?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: booksCountOrderByAggregateInput
    _avg?: booksAvgOrderByAggregateInput
    _max?: booksMaxOrderByAggregateInput
    _min?: booksMinOrderByAggregateInput
    _sum?: booksSumOrderByAggregateInput
  }

  export type booksScalarWhereWithAggregatesInput = {
    AND?: booksScalarWhereWithAggregatesInput | booksScalarWhereWithAggregatesInput[]
    OR?: booksScalarWhereWithAggregatesInput[]
    NOT?: booksScalarWhereWithAggregatesInput | booksScalarWhereWithAggregatesInput[]
    book_id?: IntWithAggregatesFilter<"books"> | number
    isbn?: StringWithAggregatesFilter<"books"> | string
    name?: StringWithAggregatesFilter<"books"> | string
    author_id?: IntWithAggregatesFilter<"books"> | number
    description?: StringNullableWithAggregatesFilter<"books"> | string | null
    cover_image?: StringNullableWithAggregatesFilter<"books"> | string | null
    file_path?: StringNullableWithAggregatesFilter<"books"> | string | null
    price?: DecimalWithAggregatesFilter<"books"> | Decimal | DecimalJsLike | number | string
    published_date?: DateTimeNullableWithAggregatesFilter<"books"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"books"> | Date | string
  }

  export type commentsWhereInput = {
    AND?: commentsWhereInput | commentsWhereInput[]
    OR?: commentsWhereInput[]
    NOT?: commentsWhereInput | commentsWhereInput[]
    comments_id?: IntFilter<"comments"> | number
    book_id?: IntFilter<"comments"> | number
    user_id?: IntFilter<"comments"> | number
    content?: StringFilter<"comments"> | string
    created_at?: DateTimeFilter<"comments"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type commentsOrderByWithRelationInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    books?: booksOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: commentsOrderByRelevanceInput
  }

  export type commentsWhereUniqueInput = Prisma.AtLeast<{
    comments_id?: number
    AND?: commentsWhereInput | commentsWhereInput[]
    OR?: commentsWhereInput[]
    NOT?: commentsWhereInput | commentsWhereInput[]
    book_id?: IntFilter<"comments"> | number
    user_id?: IntFilter<"comments"> | number
    content?: StringFilter<"comments"> | string
    created_at?: DateTimeFilter<"comments"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "comments_id">

  export type commentsOrderByWithAggregationInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    _count?: commentsCountOrderByAggregateInput
    _avg?: commentsAvgOrderByAggregateInput
    _max?: commentsMaxOrderByAggregateInput
    _min?: commentsMinOrderByAggregateInput
    _sum?: commentsSumOrderByAggregateInput
  }

  export type commentsScalarWhereWithAggregatesInput = {
    AND?: commentsScalarWhereWithAggregatesInput | commentsScalarWhereWithAggregatesInput[]
    OR?: commentsScalarWhereWithAggregatesInput[]
    NOT?: commentsScalarWhereWithAggregatesInput | commentsScalarWhereWithAggregatesInput[]
    comments_id?: IntWithAggregatesFilter<"comments"> | number
    book_id?: IntWithAggregatesFilter<"comments"> | number
    user_id?: IntWithAggregatesFilter<"comments"> | number
    content?: StringWithAggregatesFilter<"comments"> | string
    created_at?: DateTimeWithAggregatesFilter<"comments"> | Date | string
  }

  export type paymentsWhereInput = {
    AND?: paymentsWhereInput | paymentsWhereInput[]
    OR?: paymentsWhereInput[]
    NOT?: paymentsWhereInput | paymentsWhereInput[]
    pay_id?: IntFilter<"payments"> | number
    user_id?: IntFilter<"payments"> | number
    book_id?: IntFilter<"payments"> | number
    amount?: DecimalFilter<"payments"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"payments"> | string
    paid_at?: DateTimeFilter<"payments"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type paymentsOrderByWithRelationInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paid_at?: SortOrder
    books?: booksOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: paymentsOrderByRelevanceInput
  }

  export type paymentsWhereUniqueInput = Prisma.AtLeast<{
    pay_id?: number
    AND?: paymentsWhereInput | paymentsWhereInput[]
    OR?: paymentsWhereInput[]
    NOT?: paymentsWhereInput | paymentsWhereInput[]
    user_id?: IntFilter<"payments"> | number
    book_id?: IntFilter<"payments"> | number
    amount?: DecimalFilter<"payments"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"payments"> | string
    paid_at?: DateTimeFilter<"payments"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "pay_id">

  export type paymentsOrderByWithAggregationInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paid_at?: SortOrder
    _count?: paymentsCountOrderByAggregateInput
    _avg?: paymentsAvgOrderByAggregateInput
    _max?: paymentsMaxOrderByAggregateInput
    _min?: paymentsMinOrderByAggregateInput
    _sum?: paymentsSumOrderByAggregateInput
  }

  export type paymentsScalarWhereWithAggregatesInput = {
    AND?: paymentsScalarWhereWithAggregatesInput | paymentsScalarWhereWithAggregatesInput[]
    OR?: paymentsScalarWhereWithAggregatesInput[]
    NOT?: paymentsScalarWhereWithAggregatesInput | paymentsScalarWhereWithAggregatesInput[]
    pay_id?: IntWithAggregatesFilter<"payments"> | number
    user_id?: IntWithAggregatesFilter<"payments"> | number
    book_id?: IntWithAggregatesFilter<"payments"> | number
    amount?: DecimalWithAggregatesFilter<"payments"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"payments"> | string
    paid_at?: DateTimeWithAggregatesFilter<"payments"> | Date | string
  }

  export type ratingsWhereInput = {
    AND?: ratingsWhereInput | ratingsWhereInput[]
    OR?: ratingsWhereInput[]
    NOT?: ratingsWhereInput | ratingsWhereInput[]
    rating_id?: IntFilter<"ratings"> | number
    book_id?: IntFilter<"ratings"> | number
    user_id?: IntFilter<"ratings"> | number
    rating?: IntFilter<"ratings"> | number
    review?: StringNullableFilter<"ratings"> | string | null
    created_at?: DateTimeFilter<"ratings"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type ratingsOrderByWithRelationInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    created_at?: SortOrder
    books?: booksOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: ratingsOrderByRelevanceInput
  }

  export type ratingsWhereUniqueInput = Prisma.AtLeast<{
    rating_id?: number
    AND?: ratingsWhereInput | ratingsWhereInput[]
    OR?: ratingsWhereInput[]
    NOT?: ratingsWhereInput | ratingsWhereInput[]
    book_id?: IntFilter<"ratings"> | number
    user_id?: IntFilter<"ratings"> | number
    rating?: IntFilter<"ratings"> | number
    review?: StringNullableFilter<"ratings"> | string | null
    created_at?: DateTimeFilter<"ratings"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "rating_id">

  export type ratingsOrderByWithAggregationInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: ratingsCountOrderByAggregateInput
    _avg?: ratingsAvgOrderByAggregateInput
    _max?: ratingsMaxOrderByAggregateInput
    _min?: ratingsMinOrderByAggregateInput
    _sum?: ratingsSumOrderByAggregateInput
  }

  export type ratingsScalarWhereWithAggregatesInput = {
    AND?: ratingsScalarWhereWithAggregatesInput | ratingsScalarWhereWithAggregatesInput[]
    OR?: ratingsScalarWhereWithAggregatesInput[]
    NOT?: ratingsScalarWhereWithAggregatesInput | ratingsScalarWhereWithAggregatesInput[]
    rating_id?: IntWithAggregatesFilter<"ratings"> | number
    book_id?: IntWithAggregatesFilter<"ratings"> | number
    user_id?: IntWithAggregatesFilter<"ratings"> | number
    rating?: IntWithAggregatesFilter<"ratings"> | number
    review?: StringNullableWithAggregatesFilter<"ratings"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ratings"> | Date | string
  }

  export type user_booksWhereInput = {
    AND?: user_booksWhereInput | user_booksWhereInput[]
    OR?: user_booksWhereInput[]
    NOT?: user_booksWhereInput | user_booksWhereInput[]
    id?: IntFilter<"user_books"> | number
    user_id?: IntFilter<"user_books"> | number
    book_id?: IntFilter<"user_books"> | number
    purchased_at?: DateTimeFilter<"user_books"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type user_booksOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    purchased_at?: SortOrder
    books?: booksOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type user_booksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_book_id?: user_booksUser_idBook_idCompoundUniqueInput
    AND?: user_booksWhereInput | user_booksWhereInput[]
    OR?: user_booksWhereInput[]
    NOT?: user_booksWhereInput | user_booksWhereInput[]
    user_id?: IntFilter<"user_books"> | number
    book_id?: IntFilter<"user_books"> | number
    purchased_at?: DateTimeFilter<"user_books"> | Date | string
    books?: XOR<BooksScalarRelationFilter, booksWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "user_id_book_id">

  export type user_booksOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    purchased_at?: SortOrder
    _count?: user_booksCountOrderByAggregateInput
    _avg?: user_booksAvgOrderByAggregateInput
    _max?: user_booksMaxOrderByAggregateInput
    _min?: user_booksMinOrderByAggregateInput
    _sum?: user_booksSumOrderByAggregateInput
  }

  export type user_booksScalarWhereWithAggregatesInput = {
    AND?: user_booksScalarWhereWithAggregatesInput | user_booksScalarWhereWithAggregatesInput[]
    OR?: user_booksScalarWhereWithAggregatesInput[]
    NOT?: user_booksScalarWhereWithAggregatesInput | user_booksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user_books"> | number
    user_id?: IntWithAggregatesFilter<"user_books"> | number
    book_id?: IntWithAggregatesFilter<"user_books"> | number
    purchased_at?: DateTimeWithAggregatesFilter<"user_books"> | Date | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    user_id?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    name?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    book_requests?: Book_requestsListRelationFilter
    books?: BooksListRelationFilter
    comments?: CommentsListRelationFilter
    payments?: PaymentsListRelationFilter
    ratings?: RatingsListRelationFilter
    user_books?: User_booksListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrder
    book_requests?: book_requestsOrderByRelationAggregateInput
    books?: booksOrderByRelationAggregateInput
    comments?: commentsOrderByRelationAggregateInput
    payments?: paymentsOrderByRelationAggregateInput
    ratings?: ratingsOrderByRelationAggregateInput
    user_books?: user_booksOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    name?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    book_requests?: Book_requestsListRelationFilter
    books?: BooksListRelationFilter
    comments?: CommentsListRelationFilter
    payments?: PaymentsListRelationFilter
    ratings?: RatingsListRelationFilter
    user_books?: User_booksListRelationFilter
  }, "user_id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type book_requestsWhereInput = {
    AND?: book_requestsWhereInput | book_requestsWhereInput[]
    OR?: book_requestsWhereInput[]
    NOT?: book_requestsWhereInput | book_requestsWhereInput[]
    request_id?: IntFilter<"book_requests"> | number
    book_id?: IntNullableFilter<"book_requests"> | number | null
    author_id?: IntFilter<"book_requests"> | number
    action?: StringFilter<"book_requests"> | string
    details?: StringNullableFilter<"book_requests"> | string | null
    status?: StringFilter<"book_requests"> | string
    created_at?: DateTimeFilter<"book_requests"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    books?: XOR<BooksNullableScalarRelationFilter, booksWhereInput> | null
  }

  export type book_requestsOrderByWithRelationInput = {
    request_id?: SortOrder
    book_id?: SortOrderInput | SortOrder
    author_id?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    users?: usersOrderByWithRelationInput
    books?: booksOrderByWithRelationInput
    _relevance?: book_requestsOrderByRelevanceInput
  }

  export type book_requestsWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    AND?: book_requestsWhereInput | book_requestsWhereInput[]
    OR?: book_requestsWhereInput[]
    NOT?: book_requestsWhereInput | book_requestsWhereInput[]
    book_id?: IntNullableFilter<"book_requests"> | number | null
    author_id?: IntFilter<"book_requests"> | number
    action?: StringFilter<"book_requests"> | string
    details?: StringNullableFilter<"book_requests"> | string | null
    status?: StringFilter<"book_requests"> | string
    created_at?: DateTimeFilter<"book_requests"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    books?: XOR<BooksNullableScalarRelationFilter, booksWhereInput> | null
  }, "request_id">

  export type book_requestsOrderByWithAggregationInput = {
    request_id?: SortOrder
    book_id?: SortOrderInput | SortOrder
    author_id?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    _count?: book_requestsCountOrderByAggregateInput
    _avg?: book_requestsAvgOrderByAggregateInput
    _max?: book_requestsMaxOrderByAggregateInput
    _min?: book_requestsMinOrderByAggregateInput
    _sum?: book_requestsSumOrderByAggregateInput
  }

  export type book_requestsScalarWhereWithAggregatesInput = {
    AND?: book_requestsScalarWhereWithAggregatesInput | book_requestsScalarWhereWithAggregatesInput[]
    OR?: book_requestsScalarWhereWithAggregatesInput[]
    NOT?: book_requestsScalarWhereWithAggregatesInput | book_requestsScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"book_requests"> | number
    book_id?: IntNullableWithAggregatesFilter<"book_requests"> | number | null
    author_id?: IntWithAggregatesFilter<"book_requests"> | number
    action?: StringWithAggregatesFilter<"book_requests"> | string
    details?: StringNullableWithAggregatesFilter<"book_requests"> | string | null
    status?: StringWithAggregatesFilter<"book_requests"> | string
    created_at?: DateTimeWithAggregatesFilter<"book_requests"> | Date | string
  }

  export type book_categoriesCreateInput = {
    category_name: string
    book_category_links?: book_category_linksCreateNestedManyWithoutBook_categoriesInput
  }

  export type book_categoriesUncheckedCreateInput = {
    category_id?: number
    category_name: string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBook_categoriesInput
  }

  export type book_categoriesUpdateInput = {
    category_name?: StringFieldUpdateOperationsInput | string
    book_category_links?: book_category_linksUpdateManyWithoutBook_categoriesNestedInput
  }

  export type book_categoriesUncheckedUpdateInput = {
    category_id?: IntFieldUpdateOperationsInput | number
    category_name?: StringFieldUpdateOperationsInput | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBook_categoriesNestedInput
  }

  export type book_categoriesCreateManyInput = {
    category_id?: number
    category_name: string
  }

  export type book_categoriesUpdateManyMutationInput = {
    category_name?: StringFieldUpdateOperationsInput | string
  }

  export type book_categoriesUncheckedUpdateManyInput = {
    category_id?: IntFieldUpdateOperationsInput | number
    category_name?: StringFieldUpdateOperationsInput | string
  }

  export type book_category_linksCreateInput = {
    books: booksCreateNestedOneWithoutBook_category_linksInput
    book_categories: book_categoriesCreateNestedOneWithoutBook_category_linksInput
  }

  export type book_category_linksUncheckedCreateInput = {
    book_id: number
    category_id: number
  }

  export type book_category_linksUpdateInput = {
    books?: booksUpdateOneRequiredWithoutBook_category_linksNestedInput
    book_categories?: book_categoriesUpdateOneRequiredWithoutBook_category_linksNestedInput
  }

  export type book_category_linksUncheckedUpdateInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type book_category_linksCreateManyInput = {
    book_id: number
    category_id: number
  }

  export type book_category_linksUpdateManyMutationInput = {

  }

  export type book_category_linksUncheckedUpdateManyInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type booksCreateInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksUpdateInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type booksCreateManyInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
  }

  export type booksUpdateManyMutationInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booksUncheckedUpdateManyInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsCreateInput = {
    content: string
    created_at?: Date | string
    books: booksCreateNestedOneWithoutCommentsInput
    users: usersCreateNestedOneWithoutCommentsInput
  }

  export type commentsUncheckedCreateInput = {
    comments_id?: number
    book_id: number
    user_id: number
    content: string
    created_at?: Date | string
  }

  export type commentsUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutCommentsNestedInput
    users?: usersUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type commentsUncheckedUpdateInput = {
    comments_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsCreateManyInput = {
    comments_id?: number
    book_id: number
    user_id: number
    content: string
    created_at?: Date | string
  }

  export type commentsUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsUncheckedUpdateManyInput = {
    comments_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsCreateInput = {
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
    books: booksCreateNestedOneWithoutPaymentsInput
    users: usersCreateNestedOneWithoutPaymentsInput
  }

  export type paymentsUncheckedCreateInput = {
    pay_id?: number
    user_id: number
    book_id: number
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
  }

  export type paymentsUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutPaymentsNestedInput
    users?: usersUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type paymentsUncheckedUpdateInput = {
    pay_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsCreateManyInput = {
    pay_id?: number
    user_id: number
    book_id: number
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
  }

  export type paymentsUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsUncheckedUpdateManyInput = {
    pay_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsCreateInput = {
    rating: number
    review?: string | null
    created_at?: Date | string
    books: booksCreateNestedOneWithoutRatingsInput
    users: usersCreateNestedOneWithoutRatingsInput
  }

  export type ratingsUncheckedCreateInput = {
    rating_id?: number
    book_id: number
    user_id: number
    rating: number
    review?: string | null
    created_at?: Date | string
  }

  export type ratingsUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutRatingsNestedInput
    users?: usersUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type ratingsUncheckedUpdateInput = {
    rating_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsCreateManyInput = {
    rating_id?: number
    book_id: number
    user_id: number
    rating: number
    review?: string | null
    created_at?: Date | string
  }

  export type ratingsUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsUncheckedUpdateManyInput = {
    rating_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksCreateInput = {
    purchased_at?: Date | string
    books: booksCreateNestedOneWithoutUser_booksInput
    users: usersCreateNestedOneWithoutUser_booksInput
  }

  export type user_booksUncheckedCreateInput = {
    id?: number
    user_id: number
    book_id: number
    purchased_at?: Date | string
  }

  export type user_booksUpdateInput = {
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutUser_booksNestedInput
    users?: usersUpdateOneRequiredWithoutUser_booksNestedInput
  }

  export type user_booksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksCreateManyInput = {
    id?: number
    user_id: number
    book_id: number
    purchased_at?: Date | string
  }

  export type user_booksUpdateManyMutationInput = {
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutUsersInput
    books?: booksCreateNestedManyWithoutUsersInput
    comments?: commentsCreateNestedManyWithoutUsersInput
    payments?: paymentsCreateNestedManyWithoutUsersInput
    ratings?: ratingsCreateNestedManyWithoutUsersInput
    user_books?: user_booksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutUsersInput
    books?: booksUncheckedCreateNestedManyWithoutUsersInput
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    payments?: paymentsUncheckedCreateNestedManyWithoutUsersInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutUsersInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutUsersNestedInput
    books?: booksUpdateManyWithoutUsersNestedInput
    comments?: commentsUpdateManyWithoutUsersNestedInput
    payments?: paymentsUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutUsersNestedInput
    books?: booksUncheckedUpdateManyWithoutUsersNestedInput
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type book_requestsCreateInput = {
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
    users: usersCreateNestedOneWithoutBook_requestsInput
    books?: booksCreateNestedOneWithoutBook_requestsInput
  }

  export type book_requestsUncheckedCreateInput = {
    request_id?: number
    book_id?: number | null
    author_id: number
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
  }

  export type book_requestsUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutBook_requestsNestedInput
    books?: booksUpdateOneWithoutBook_requestsNestedInput
  }

  export type book_requestsUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    author_id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type book_requestsCreateManyInput = {
    request_id?: number
    book_id?: number | null
    author_id: number
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
  }

  export type book_requestsUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type book_requestsUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    author_id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Book_category_linksListRelationFilter = {
    every?: book_category_linksWhereInput
    some?: book_category_linksWhereInput
    none?: book_category_linksWhereInput
  }

  export type book_category_linksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type book_categoriesOrderByRelevanceInput = {
    fields: book_categoriesOrderByRelevanceFieldEnum | book_categoriesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type book_categoriesCountOrderByAggregateInput = {
    category_id?: SortOrder
    category_name?: SortOrder
  }

  export type book_categoriesAvgOrderByAggregateInput = {
    category_id?: SortOrder
  }

  export type book_categoriesMaxOrderByAggregateInput = {
    category_id?: SortOrder
    category_name?: SortOrder
  }

  export type book_categoriesMinOrderByAggregateInput = {
    category_id?: SortOrder
    category_name?: SortOrder
  }

  export type book_categoriesSumOrderByAggregateInput = {
    category_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BooksScalarRelationFilter = {
    is?: booksWhereInput
    isNot?: booksWhereInput
  }

  export type Book_categoriesScalarRelationFilter = {
    is?: book_categoriesWhereInput
    isNot?: book_categoriesWhereInput
  }

  export type book_category_linksBook_idCategory_idCompoundUniqueInput = {
    book_id: number
    category_id: number
  }

  export type book_category_linksCountOrderByAggregateInput = {
    book_id?: SortOrder
    category_id?: SortOrder
  }

  export type book_category_linksAvgOrderByAggregateInput = {
    book_id?: SortOrder
    category_id?: SortOrder
  }

  export type book_category_linksMaxOrderByAggregateInput = {
    book_id?: SortOrder
    category_id?: SortOrder
  }

  export type book_category_linksMinOrderByAggregateInput = {
    book_id?: SortOrder
    category_id?: SortOrder
  }

  export type book_category_linksSumOrderByAggregateInput = {
    book_id?: SortOrder
    category_id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Book_requestsListRelationFilter = {
    every?: book_requestsWhereInput
    some?: book_requestsWhereInput
    none?: book_requestsWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type CommentsListRelationFilter = {
    every?: commentsWhereInput
    some?: commentsWhereInput
    none?: commentsWhereInput
  }

  export type PaymentsListRelationFilter = {
    every?: paymentsWhereInput
    some?: paymentsWhereInput
    none?: paymentsWhereInput
  }

  export type RatingsListRelationFilter = {
    every?: ratingsWhereInput
    some?: ratingsWhereInput
    none?: ratingsWhereInput
  }

  export type User_booksListRelationFilter = {
    every?: user_booksWhereInput
    some?: user_booksWhereInput
    none?: user_booksWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type book_requestsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type commentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type paymentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ratingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_booksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type booksOrderByRelevanceInput = {
    fields: booksOrderByRelevanceFieldEnum | booksOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type booksCountOrderByAggregateInput = {
    book_id?: SortOrder
    isbn?: SortOrder
    name?: SortOrder
    author_id?: SortOrder
    description?: SortOrder
    cover_image?: SortOrder
    file_path?: SortOrder
    price?: SortOrder
    published_date?: SortOrder
    created_at?: SortOrder
  }

  export type booksAvgOrderByAggregateInput = {
    book_id?: SortOrder
    author_id?: SortOrder
    price?: SortOrder
  }

  export type booksMaxOrderByAggregateInput = {
    book_id?: SortOrder
    isbn?: SortOrder
    name?: SortOrder
    author_id?: SortOrder
    description?: SortOrder
    cover_image?: SortOrder
    file_path?: SortOrder
    price?: SortOrder
    published_date?: SortOrder
    created_at?: SortOrder
  }

  export type booksMinOrderByAggregateInput = {
    book_id?: SortOrder
    isbn?: SortOrder
    name?: SortOrder
    author_id?: SortOrder
    description?: SortOrder
    cover_image?: SortOrder
    file_path?: SortOrder
    price?: SortOrder
    published_date?: SortOrder
    created_at?: SortOrder
  }

  export type booksSumOrderByAggregateInput = {
    book_id?: SortOrder
    author_id?: SortOrder
    price?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type commentsOrderByRelevanceInput = {
    fields: commentsOrderByRelevanceFieldEnum | commentsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type commentsCountOrderByAggregateInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type commentsAvgOrderByAggregateInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
  }

  export type commentsMaxOrderByAggregateInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type commentsMinOrderByAggregateInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type commentsSumOrderByAggregateInput = {
    comments_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
  }

  export type paymentsOrderByRelevanceInput = {
    fields: paymentsOrderByRelevanceFieldEnum | paymentsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type paymentsCountOrderByAggregateInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paid_at?: SortOrder
  }

  export type paymentsAvgOrderByAggregateInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
  }

  export type paymentsMaxOrderByAggregateInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paid_at?: SortOrder
  }

  export type paymentsMinOrderByAggregateInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paid_at?: SortOrder
  }

  export type paymentsSumOrderByAggregateInput = {
    pay_id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    amount?: SortOrder
  }

  export type ratingsOrderByRelevanceInput = {
    fields: ratingsOrderByRelevanceFieldEnum | ratingsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ratingsCountOrderByAggregateInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    created_at?: SortOrder
  }

  export type ratingsAvgOrderByAggregateInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
  }

  export type ratingsMaxOrderByAggregateInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    created_at?: SortOrder
  }

  export type ratingsMinOrderByAggregateInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    created_at?: SortOrder
  }

  export type ratingsSumOrderByAggregateInput = {
    rating_id?: SortOrder
    book_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
  }

  export type user_booksUser_idBook_idCompoundUniqueInput = {
    user_id: number
    book_id: number
  }

  export type user_booksCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    purchased_at?: SortOrder
  }

  export type user_booksAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
  }

  export type user_booksMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    purchased_at?: SortOrder
  }

  export type user_booksMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    purchased_at?: SortOrder
  }

  export type user_booksSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
  }

  export type BooksListRelationFilter = {
    every?: booksWhereInput
    some?: booksWhereInput
    none?: booksWhereInput
  }

  export type booksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    user_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    user_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BooksNullableScalarRelationFilter = {
    is?: booksWhereInput | null
    isNot?: booksWhereInput | null
  }

  export type book_requestsOrderByRelevanceInput = {
    fields: book_requestsOrderByRelevanceFieldEnum | book_requestsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type book_requestsCountOrderByAggregateInput = {
    request_id?: SortOrder
    book_id?: SortOrder
    author_id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type book_requestsAvgOrderByAggregateInput = {
    request_id?: SortOrder
    book_id?: SortOrder
    author_id?: SortOrder
  }

  export type book_requestsMaxOrderByAggregateInput = {
    request_id?: SortOrder
    book_id?: SortOrder
    author_id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type book_requestsMinOrderByAggregateInput = {
    request_id?: SortOrder
    book_id?: SortOrder
    author_id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type book_requestsSumOrderByAggregateInput = {
    request_id?: SortOrder
    book_id?: SortOrder
    author_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type book_category_linksCreateNestedManyWithoutBook_categoriesInput = {
    create?: XOR<book_category_linksCreateWithoutBook_categoriesInput, book_category_linksUncheckedCreateWithoutBook_categoriesInput> | book_category_linksCreateWithoutBook_categoriesInput[] | book_category_linksUncheckedCreateWithoutBook_categoriesInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBook_categoriesInput | book_category_linksCreateOrConnectWithoutBook_categoriesInput[]
    createMany?: book_category_linksCreateManyBook_categoriesInputEnvelope
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
  }

  export type book_category_linksUncheckedCreateNestedManyWithoutBook_categoriesInput = {
    create?: XOR<book_category_linksCreateWithoutBook_categoriesInput, book_category_linksUncheckedCreateWithoutBook_categoriesInput> | book_category_linksCreateWithoutBook_categoriesInput[] | book_category_linksUncheckedCreateWithoutBook_categoriesInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBook_categoriesInput | book_category_linksCreateOrConnectWithoutBook_categoriesInput[]
    createMany?: book_category_linksCreateManyBook_categoriesInputEnvelope
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type book_category_linksUpdateManyWithoutBook_categoriesNestedInput = {
    create?: XOR<book_category_linksCreateWithoutBook_categoriesInput, book_category_linksUncheckedCreateWithoutBook_categoriesInput> | book_category_linksCreateWithoutBook_categoriesInput[] | book_category_linksUncheckedCreateWithoutBook_categoriesInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBook_categoriesInput | book_category_linksCreateOrConnectWithoutBook_categoriesInput[]
    upsert?: book_category_linksUpsertWithWhereUniqueWithoutBook_categoriesInput | book_category_linksUpsertWithWhereUniqueWithoutBook_categoriesInput[]
    createMany?: book_category_linksCreateManyBook_categoriesInputEnvelope
    set?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    disconnect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    delete?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    update?: book_category_linksUpdateWithWhereUniqueWithoutBook_categoriesInput | book_category_linksUpdateWithWhereUniqueWithoutBook_categoriesInput[]
    updateMany?: book_category_linksUpdateManyWithWhereWithoutBook_categoriesInput | book_category_linksUpdateManyWithWhereWithoutBook_categoriesInput[]
    deleteMany?: book_category_linksScalarWhereInput | book_category_linksScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type book_category_linksUncheckedUpdateManyWithoutBook_categoriesNestedInput = {
    create?: XOR<book_category_linksCreateWithoutBook_categoriesInput, book_category_linksUncheckedCreateWithoutBook_categoriesInput> | book_category_linksCreateWithoutBook_categoriesInput[] | book_category_linksUncheckedCreateWithoutBook_categoriesInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBook_categoriesInput | book_category_linksCreateOrConnectWithoutBook_categoriesInput[]
    upsert?: book_category_linksUpsertWithWhereUniqueWithoutBook_categoriesInput | book_category_linksUpsertWithWhereUniqueWithoutBook_categoriesInput[]
    createMany?: book_category_linksCreateManyBook_categoriesInputEnvelope
    set?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    disconnect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    delete?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    update?: book_category_linksUpdateWithWhereUniqueWithoutBook_categoriesInput | book_category_linksUpdateWithWhereUniqueWithoutBook_categoriesInput[]
    updateMany?: book_category_linksUpdateManyWithWhereWithoutBook_categoriesInput | book_category_linksUpdateManyWithWhereWithoutBook_categoriesInput[]
    deleteMany?: book_category_linksScalarWhereInput | book_category_linksScalarWhereInput[]
  }

  export type booksCreateNestedOneWithoutBook_category_linksInput = {
    create?: XOR<booksCreateWithoutBook_category_linksInput, booksUncheckedCreateWithoutBook_category_linksInput>
    connectOrCreate?: booksCreateOrConnectWithoutBook_category_linksInput
    connect?: booksWhereUniqueInput
  }

  export type book_categoriesCreateNestedOneWithoutBook_category_linksInput = {
    create?: XOR<book_categoriesCreateWithoutBook_category_linksInput, book_categoriesUncheckedCreateWithoutBook_category_linksInput>
    connectOrCreate?: book_categoriesCreateOrConnectWithoutBook_category_linksInput
    connect?: book_categoriesWhereUniqueInput
  }

  export type booksUpdateOneRequiredWithoutBook_category_linksNestedInput = {
    create?: XOR<booksCreateWithoutBook_category_linksInput, booksUncheckedCreateWithoutBook_category_linksInput>
    connectOrCreate?: booksCreateOrConnectWithoutBook_category_linksInput
    upsert?: booksUpsertWithoutBook_category_linksInput
    connect?: booksWhereUniqueInput
    update?: XOR<XOR<booksUpdateToOneWithWhereWithoutBook_category_linksInput, booksUpdateWithoutBook_category_linksInput>, booksUncheckedUpdateWithoutBook_category_linksInput>
  }

  export type book_categoriesUpdateOneRequiredWithoutBook_category_linksNestedInput = {
    create?: XOR<book_categoriesCreateWithoutBook_category_linksInput, book_categoriesUncheckedCreateWithoutBook_category_linksInput>
    connectOrCreate?: book_categoriesCreateOrConnectWithoutBook_category_linksInput
    upsert?: book_categoriesUpsertWithoutBook_category_linksInput
    connect?: book_categoriesWhereUniqueInput
    update?: XOR<XOR<book_categoriesUpdateToOneWithWhereWithoutBook_category_linksInput, book_categoriesUpdateWithoutBook_category_linksInput>, book_categoriesUncheckedUpdateWithoutBook_category_linksInput>
  }

  export type book_category_linksCreateNestedManyWithoutBooksInput = {
    create?: XOR<book_category_linksCreateWithoutBooksInput, book_category_linksUncheckedCreateWithoutBooksInput> | book_category_linksCreateWithoutBooksInput[] | book_category_linksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBooksInput | book_category_linksCreateOrConnectWithoutBooksInput[]
    createMany?: book_category_linksCreateManyBooksInputEnvelope
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
  }

  export type book_requestsCreateNestedManyWithoutBooksInput = {
    create?: XOR<book_requestsCreateWithoutBooksInput, book_requestsUncheckedCreateWithoutBooksInput> | book_requestsCreateWithoutBooksInput[] | book_requestsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutBooksInput | book_requestsCreateOrConnectWithoutBooksInput[]
    createMany?: book_requestsCreateManyBooksInputEnvelope
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutBooksInput = {
    create?: XOR<usersCreateWithoutBooksInput, usersUncheckedCreateWithoutBooksInput>
    connectOrCreate?: usersCreateOrConnectWithoutBooksInput
    connect?: usersWhereUniqueInput
  }

  export type commentsCreateNestedManyWithoutBooksInput = {
    create?: XOR<commentsCreateWithoutBooksInput, commentsUncheckedCreateWithoutBooksInput> | commentsCreateWithoutBooksInput[] | commentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutBooksInput | commentsCreateOrConnectWithoutBooksInput[]
    createMany?: commentsCreateManyBooksInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type paymentsCreateNestedManyWithoutBooksInput = {
    create?: XOR<paymentsCreateWithoutBooksInput, paymentsUncheckedCreateWithoutBooksInput> | paymentsCreateWithoutBooksInput[] | paymentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutBooksInput | paymentsCreateOrConnectWithoutBooksInput[]
    createMany?: paymentsCreateManyBooksInputEnvelope
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
  }

  export type ratingsCreateNestedManyWithoutBooksInput = {
    create?: XOR<ratingsCreateWithoutBooksInput, ratingsUncheckedCreateWithoutBooksInput> | ratingsCreateWithoutBooksInput[] | ratingsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutBooksInput | ratingsCreateOrConnectWithoutBooksInput[]
    createMany?: ratingsCreateManyBooksInputEnvelope
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
  }

  export type user_booksCreateNestedManyWithoutBooksInput = {
    create?: XOR<user_booksCreateWithoutBooksInput, user_booksUncheckedCreateWithoutBooksInput> | user_booksCreateWithoutBooksInput[] | user_booksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutBooksInput | user_booksCreateOrConnectWithoutBooksInput[]
    createMany?: user_booksCreateManyBooksInputEnvelope
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
  }

  export type book_category_linksUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<book_category_linksCreateWithoutBooksInput, book_category_linksUncheckedCreateWithoutBooksInput> | book_category_linksCreateWithoutBooksInput[] | book_category_linksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBooksInput | book_category_linksCreateOrConnectWithoutBooksInput[]
    createMany?: book_category_linksCreateManyBooksInputEnvelope
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
  }

  export type book_requestsUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<book_requestsCreateWithoutBooksInput, book_requestsUncheckedCreateWithoutBooksInput> | book_requestsCreateWithoutBooksInput[] | book_requestsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutBooksInput | book_requestsCreateOrConnectWithoutBooksInput[]
    createMany?: book_requestsCreateManyBooksInputEnvelope
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
  }

  export type commentsUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<commentsCreateWithoutBooksInput, commentsUncheckedCreateWithoutBooksInput> | commentsCreateWithoutBooksInput[] | commentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutBooksInput | commentsCreateOrConnectWithoutBooksInput[]
    createMany?: commentsCreateManyBooksInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type paymentsUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<paymentsCreateWithoutBooksInput, paymentsUncheckedCreateWithoutBooksInput> | paymentsCreateWithoutBooksInput[] | paymentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutBooksInput | paymentsCreateOrConnectWithoutBooksInput[]
    createMany?: paymentsCreateManyBooksInputEnvelope
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
  }

  export type ratingsUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<ratingsCreateWithoutBooksInput, ratingsUncheckedCreateWithoutBooksInput> | ratingsCreateWithoutBooksInput[] | ratingsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutBooksInput | ratingsCreateOrConnectWithoutBooksInput[]
    createMany?: ratingsCreateManyBooksInputEnvelope
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
  }

  export type user_booksUncheckedCreateNestedManyWithoutBooksInput = {
    create?: XOR<user_booksCreateWithoutBooksInput, user_booksUncheckedCreateWithoutBooksInput> | user_booksCreateWithoutBooksInput[] | user_booksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutBooksInput | user_booksCreateOrConnectWithoutBooksInput[]
    createMany?: user_booksCreateManyBooksInputEnvelope
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type book_category_linksUpdateManyWithoutBooksNestedInput = {
    create?: XOR<book_category_linksCreateWithoutBooksInput, book_category_linksUncheckedCreateWithoutBooksInput> | book_category_linksCreateWithoutBooksInput[] | book_category_linksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBooksInput | book_category_linksCreateOrConnectWithoutBooksInput[]
    upsert?: book_category_linksUpsertWithWhereUniqueWithoutBooksInput | book_category_linksUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: book_category_linksCreateManyBooksInputEnvelope
    set?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    disconnect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    delete?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    update?: book_category_linksUpdateWithWhereUniqueWithoutBooksInput | book_category_linksUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: book_category_linksUpdateManyWithWhereWithoutBooksInput | book_category_linksUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: book_category_linksScalarWhereInput | book_category_linksScalarWhereInput[]
  }

  export type book_requestsUpdateManyWithoutBooksNestedInput = {
    create?: XOR<book_requestsCreateWithoutBooksInput, book_requestsUncheckedCreateWithoutBooksInput> | book_requestsCreateWithoutBooksInput[] | book_requestsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutBooksInput | book_requestsCreateOrConnectWithoutBooksInput[]
    upsert?: book_requestsUpsertWithWhereUniqueWithoutBooksInput | book_requestsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: book_requestsCreateManyBooksInputEnvelope
    set?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    disconnect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    delete?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    update?: book_requestsUpdateWithWhereUniqueWithoutBooksInput | book_requestsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: book_requestsUpdateManyWithWhereWithoutBooksInput | book_requestsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: book_requestsScalarWhereInput | book_requestsScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutBooksNestedInput = {
    create?: XOR<usersCreateWithoutBooksInput, usersUncheckedCreateWithoutBooksInput>
    connectOrCreate?: usersCreateOrConnectWithoutBooksInput
    upsert?: usersUpsertWithoutBooksInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBooksInput, usersUpdateWithoutBooksInput>, usersUncheckedUpdateWithoutBooksInput>
  }

  export type commentsUpdateManyWithoutBooksNestedInput = {
    create?: XOR<commentsCreateWithoutBooksInput, commentsUncheckedCreateWithoutBooksInput> | commentsCreateWithoutBooksInput[] | commentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutBooksInput | commentsCreateOrConnectWithoutBooksInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutBooksInput | commentsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: commentsCreateManyBooksInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutBooksInput | commentsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutBooksInput | commentsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type paymentsUpdateManyWithoutBooksNestedInput = {
    create?: XOR<paymentsCreateWithoutBooksInput, paymentsUncheckedCreateWithoutBooksInput> | paymentsCreateWithoutBooksInput[] | paymentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutBooksInput | paymentsCreateOrConnectWithoutBooksInput[]
    upsert?: paymentsUpsertWithWhereUniqueWithoutBooksInput | paymentsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: paymentsCreateManyBooksInputEnvelope
    set?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    disconnect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    delete?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    update?: paymentsUpdateWithWhereUniqueWithoutBooksInput | paymentsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: paymentsUpdateManyWithWhereWithoutBooksInput | paymentsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: paymentsScalarWhereInput | paymentsScalarWhereInput[]
  }

  export type ratingsUpdateManyWithoutBooksNestedInput = {
    create?: XOR<ratingsCreateWithoutBooksInput, ratingsUncheckedCreateWithoutBooksInput> | ratingsCreateWithoutBooksInput[] | ratingsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutBooksInput | ratingsCreateOrConnectWithoutBooksInput[]
    upsert?: ratingsUpsertWithWhereUniqueWithoutBooksInput | ratingsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: ratingsCreateManyBooksInputEnvelope
    set?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    disconnect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    delete?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    update?: ratingsUpdateWithWhereUniqueWithoutBooksInput | ratingsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: ratingsUpdateManyWithWhereWithoutBooksInput | ratingsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: ratingsScalarWhereInput | ratingsScalarWhereInput[]
  }

  export type user_booksUpdateManyWithoutBooksNestedInput = {
    create?: XOR<user_booksCreateWithoutBooksInput, user_booksUncheckedCreateWithoutBooksInput> | user_booksCreateWithoutBooksInput[] | user_booksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutBooksInput | user_booksCreateOrConnectWithoutBooksInput[]
    upsert?: user_booksUpsertWithWhereUniqueWithoutBooksInput | user_booksUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: user_booksCreateManyBooksInputEnvelope
    set?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    disconnect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    delete?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    update?: user_booksUpdateWithWhereUniqueWithoutBooksInput | user_booksUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: user_booksUpdateManyWithWhereWithoutBooksInput | user_booksUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: user_booksScalarWhereInput | user_booksScalarWhereInput[]
  }

  export type book_category_linksUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<book_category_linksCreateWithoutBooksInput, book_category_linksUncheckedCreateWithoutBooksInput> | book_category_linksCreateWithoutBooksInput[] | book_category_linksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_category_linksCreateOrConnectWithoutBooksInput | book_category_linksCreateOrConnectWithoutBooksInput[]
    upsert?: book_category_linksUpsertWithWhereUniqueWithoutBooksInput | book_category_linksUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: book_category_linksCreateManyBooksInputEnvelope
    set?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    disconnect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    delete?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    connect?: book_category_linksWhereUniqueInput | book_category_linksWhereUniqueInput[]
    update?: book_category_linksUpdateWithWhereUniqueWithoutBooksInput | book_category_linksUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: book_category_linksUpdateManyWithWhereWithoutBooksInput | book_category_linksUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: book_category_linksScalarWhereInput | book_category_linksScalarWhereInput[]
  }

  export type book_requestsUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<book_requestsCreateWithoutBooksInput, book_requestsUncheckedCreateWithoutBooksInput> | book_requestsCreateWithoutBooksInput[] | book_requestsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutBooksInput | book_requestsCreateOrConnectWithoutBooksInput[]
    upsert?: book_requestsUpsertWithWhereUniqueWithoutBooksInput | book_requestsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: book_requestsCreateManyBooksInputEnvelope
    set?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    disconnect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    delete?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    update?: book_requestsUpdateWithWhereUniqueWithoutBooksInput | book_requestsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: book_requestsUpdateManyWithWhereWithoutBooksInput | book_requestsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: book_requestsScalarWhereInput | book_requestsScalarWhereInput[]
  }

  export type commentsUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<commentsCreateWithoutBooksInput, commentsUncheckedCreateWithoutBooksInput> | commentsCreateWithoutBooksInput[] | commentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutBooksInput | commentsCreateOrConnectWithoutBooksInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutBooksInput | commentsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: commentsCreateManyBooksInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutBooksInput | commentsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutBooksInput | commentsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type paymentsUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<paymentsCreateWithoutBooksInput, paymentsUncheckedCreateWithoutBooksInput> | paymentsCreateWithoutBooksInput[] | paymentsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutBooksInput | paymentsCreateOrConnectWithoutBooksInput[]
    upsert?: paymentsUpsertWithWhereUniqueWithoutBooksInput | paymentsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: paymentsCreateManyBooksInputEnvelope
    set?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    disconnect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    delete?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    update?: paymentsUpdateWithWhereUniqueWithoutBooksInput | paymentsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: paymentsUpdateManyWithWhereWithoutBooksInput | paymentsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: paymentsScalarWhereInput | paymentsScalarWhereInput[]
  }

  export type ratingsUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<ratingsCreateWithoutBooksInput, ratingsUncheckedCreateWithoutBooksInput> | ratingsCreateWithoutBooksInput[] | ratingsUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutBooksInput | ratingsCreateOrConnectWithoutBooksInput[]
    upsert?: ratingsUpsertWithWhereUniqueWithoutBooksInput | ratingsUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: ratingsCreateManyBooksInputEnvelope
    set?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    disconnect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    delete?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    update?: ratingsUpdateWithWhereUniqueWithoutBooksInput | ratingsUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: ratingsUpdateManyWithWhereWithoutBooksInput | ratingsUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: ratingsScalarWhereInput | ratingsScalarWhereInput[]
  }

  export type user_booksUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: XOR<user_booksCreateWithoutBooksInput, user_booksUncheckedCreateWithoutBooksInput> | user_booksCreateWithoutBooksInput[] | user_booksUncheckedCreateWithoutBooksInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutBooksInput | user_booksCreateOrConnectWithoutBooksInput[]
    upsert?: user_booksUpsertWithWhereUniqueWithoutBooksInput | user_booksUpsertWithWhereUniqueWithoutBooksInput[]
    createMany?: user_booksCreateManyBooksInputEnvelope
    set?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    disconnect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    delete?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    update?: user_booksUpdateWithWhereUniqueWithoutBooksInput | user_booksUpdateWithWhereUniqueWithoutBooksInput[]
    updateMany?: user_booksUpdateManyWithWhereWithoutBooksInput | user_booksUpdateManyWithWhereWithoutBooksInput[]
    deleteMany?: user_booksScalarWhereInput | user_booksScalarWhereInput[]
  }

  export type booksCreateNestedOneWithoutCommentsInput = {
    create?: XOR<booksCreateWithoutCommentsInput, booksUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: booksCreateOrConnectWithoutCommentsInput
    connect?: booksWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutCommentsInput = {
    create?: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCommentsInput
    connect?: usersWhereUniqueInput
  }

  export type booksUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<booksCreateWithoutCommentsInput, booksUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: booksCreateOrConnectWithoutCommentsInput
    upsert?: booksUpsertWithoutCommentsInput
    connect?: booksWhereUniqueInput
    update?: XOR<XOR<booksUpdateToOneWithWhereWithoutCommentsInput, booksUpdateWithoutCommentsInput>, booksUncheckedUpdateWithoutCommentsInput>
  }

  export type usersUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCommentsInput
    upsert?: usersUpsertWithoutCommentsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCommentsInput, usersUpdateWithoutCommentsInput>, usersUncheckedUpdateWithoutCommentsInput>
  }

  export type booksCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<booksCreateWithoutPaymentsInput, booksUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: booksCreateOrConnectWithoutPaymentsInput
    connect?: booksWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<usersCreateWithoutPaymentsInput, usersUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutPaymentsInput
    connect?: usersWhereUniqueInput
  }

  export type booksUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<booksCreateWithoutPaymentsInput, booksUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: booksCreateOrConnectWithoutPaymentsInput
    upsert?: booksUpsertWithoutPaymentsInput
    connect?: booksWhereUniqueInput
    update?: XOR<XOR<booksUpdateToOneWithWhereWithoutPaymentsInput, booksUpdateWithoutPaymentsInput>, booksUncheckedUpdateWithoutPaymentsInput>
  }

  export type usersUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<usersCreateWithoutPaymentsInput, usersUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutPaymentsInput
    upsert?: usersUpsertWithoutPaymentsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutPaymentsInput, usersUpdateWithoutPaymentsInput>, usersUncheckedUpdateWithoutPaymentsInput>
  }

  export type booksCreateNestedOneWithoutRatingsInput = {
    create?: XOR<booksCreateWithoutRatingsInput, booksUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: booksCreateOrConnectWithoutRatingsInput
    connect?: booksWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutRatingsInput = {
    create?: XOR<usersCreateWithoutRatingsInput, usersUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutRatingsInput
    connect?: usersWhereUniqueInput
  }

  export type booksUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<booksCreateWithoutRatingsInput, booksUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: booksCreateOrConnectWithoutRatingsInput
    upsert?: booksUpsertWithoutRatingsInput
    connect?: booksWhereUniqueInput
    update?: XOR<XOR<booksUpdateToOneWithWhereWithoutRatingsInput, booksUpdateWithoutRatingsInput>, booksUncheckedUpdateWithoutRatingsInput>
  }

  export type usersUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<usersCreateWithoutRatingsInput, usersUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutRatingsInput
    upsert?: usersUpsertWithoutRatingsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutRatingsInput, usersUpdateWithoutRatingsInput>, usersUncheckedUpdateWithoutRatingsInput>
  }

  export type booksCreateNestedOneWithoutUser_booksInput = {
    create?: XOR<booksCreateWithoutUser_booksInput, booksUncheckedCreateWithoutUser_booksInput>
    connectOrCreate?: booksCreateOrConnectWithoutUser_booksInput
    connect?: booksWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutUser_booksInput = {
    create?: XOR<usersCreateWithoutUser_booksInput, usersUncheckedCreateWithoutUser_booksInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_booksInput
    connect?: usersWhereUniqueInput
  }

  export type booksUpdateOneRequiredWithoutUser_booksNestedInput = {
    create?: XOR<booksCreateWithoutUser_booksInput, booksUncheckedCreateWithoutUser_booksInput>
    connectOrCreate?: booksCreateOrConnectWithoutUser_booksInput
    upsert?: booksUpsertWithoutUser_booksInput
    connect?: booksWhereUniqueInput
    update?: XOR<XOR<booksUpdateToOneWithWhereWithoutUser_booksInput, booksUpdateWithoutUser_booksInput>, booksUncheckedUpdateWithoutUser_booksInput>
  }

  export type usersUpdateOneRequiredWithoutUser_booksNestedInput = {
    create?: XOR<usersCreateWithoutUser_booksInput, usersUncheckedCreateWithoutUser_booksInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_booksInput
    upsert?: usersUpsertWithoutUser_booksInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_booksInput, usersUpdateWithoutUser_booksInput>, usersUncheckedUpdateWithoutUser_booksInput>
  }

  export type book_requestsCreateNestedManyWithoutUsersInput = {
    create?: XOR<book_requestsCreateWithoutUsersInput, book_requestsUncheckedCreateWithoutUsersInput> | book_requestsCreateWithoutUsersInput[] | book_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutUsersInput | book_requestsCreateOrConnectWithoutUsersInput[]
    createMany?: book_requestsCreateManyUsersInputEnvelope
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
  }

  export type booksCreateNestedManyWithoutUsersInput = {
    create?: XOR<booksCreateWithoutUsersInput, booksUncheckedCreateWithoutUsersInput> | booksCreateWithoutUsersInput[] | booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: booksCreateOrConnectWithoutUsersInput | booksCreateOrConnectWithoutUsersInput[]
    createMany?: booksCreateManyUsersInputEnvelope
    connect?: booksWhereUniqueInput | booksWhereUniqueInput[]
  }

  export type commentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type paymentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<paymentsCreateWithoutUsersInput, paymentsUncheckedCreateWithoutUsersInput> | paymentsCreateWithoutUsersInput[] | paymentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutUsersInput | paymentsCreateOrConnectWithoutUsersInput[]
    createMany?: paymentsCreateManyUsersInputEnvelope
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
  }

  export type ratingsCreateNestedManyWithoutUsersInput = {
    create?: XOR<ratingsCreateWithoutUsersInput, ratingsUncheckedCreateWithoutUsersInput> | ratingsCreateWithoutUsersInput[] | ratingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutUsersInput | ratingsCreateOrConnectWithoutUsersInput[]
    createMany?: ratingsCreateManyUsersInputEnvelope
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
  }

  export type user_booksCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_booksCreateWithoutUsersInput, user_booksUncheckedCreateWithoutUsersInput> | user_booksCreateWithoutUsersInput[] | user_booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutUsersInput | user_booksCreateOrConnectWithoutUsersInput[]
    createMany?: user_booksCreateManyUsersInputEnvelope
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
  }

  export type book_requestsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<book_requestsCreateWithoutUsersInput, book_requestsUncheckedCreateWithoutUsersInput> | book_requestsCreateWithoutUsersInput[] | book_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutUsersInput | book_requestsCreateOrConnectWithoutUsersInput[]
    createMany?: book_requestsCreateManyUsersInputEnvelope
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
  }

  export type booksUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<booksCreateWithoutUsersInput, booksUncheckedCreateWithoutUsersInput> | booksCreateWithoutUsersInput[] | booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: booksCreateOrConnectWithoutUsersInput | booksCreateOrConnectWithoutUsersInput[]
    createMany?: booksCreateManyUsersInputEnvelope
    connect?: booksWhereUniqueInput | booksWhereUniqueInput[]
  }

  export type commentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type paymentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<paymentsCreateWithoutUsersInput, paymentsUncheckedCreateWithoutUsersInput> | paymentsCreateWithoutUsersInput[] | paymentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutUsersInput | paymentsCreateOrConnectWithoutUsersInput[]
    createMany?: paymentsCreateManyUsersInputEnvelope
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
  }

  export type ratingsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<ratingsCreateWithoutUsersInput, ratingsUncheckedCreateWithoutUsersInput> | ratingsCreateWithoutUsersInput[] | ratingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutUsersInput | ratingsCreateOrConnectWithoutUsersInput[]
    createMany?: ratingsCreateManyUsersInputEnvelope
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
  }

  export type user_booksUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_booksCreateWithoutUsersInput, user_booksUncheckedCreateWithoutUsersInput> | user_booksCreateWithoutUsersInput[] | user_booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutUsersInput | user_booksCreateOrConnectWithoutUsersInput[]
    createMany?: user_booksCreateManyUsersInputEnvelope
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
  }

  export type book_requestsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<book_requestsCreateWithoutUsersInput, book_requestsUncheckedCreateWithoutUsersInput> | book_requestsCreateWithoutUsersInput[] | book_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutUsersInput | book_requestsCreateOrConnectWithoutUsersInput[]
    upsert?: book_requestsUpsertWithWhereUniqueWithoutUsersInput | book_requestsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: book_requestsCreateManyUsersInputEnvelope
    set?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    disconnect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    delete?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    update?: book_requestsUpdateWithWhereUniqueWithoutUsersInput | book_requestsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: book_requestsUpdateManyWithWhereWithoutUsersInput | book_requestsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: book_requestsScalarWhereInput | book_requestsScalarWhereInput[]
  }

  export type booksUpdateManyWithoutUsersNestedInput = {
    create?: XOR<booksCreateWithoutUsersInput, booksUncheckedCreateWithoutUsersInput> | booksCreateWithoutUsersInput[] | booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: booksCreateOrConnectWithoutUsersInput | booksCreateOrConnectWithoutUsersInput[]
    upsert?: booksUpsertWithWhereUniqueWithoutUsersInput | booksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: booksCreateManyUsersInputEnvelope
    set?: booksWhereUniqueInput | booksWhereUniqueInput[]
    disconnect?: booksWhereUniqueInput | booksWhereUniqueInput[]
    delete?: booksWhereUniqueInput | booksWhereUniqueInput[]
    connect?: booksWhereUniqueInput | booksWhereUniqueInput[]
    update?: booksUpdateWithWhereUniqueWithoutUsersInput | booksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: booksUpdateManyWithWhereWithoutUsersInput | booksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: booksScalarWhereInput | booksScalarWhereInput[]
  }

  export type commentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutUsersInput | commentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutUsersInput | commentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutUsersInput | commentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type paymentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<paymentsCreateWithoutUsersInput, paymentsUncheckedCreateWithoutUsersInput> | paymentsCreateWithoutUsersInput[] | paymentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutUsersInput | paymentsCreateOrConnectWithoutUsersInput[]
    upsert?: paymentsUpsertWithWhereUniqueWithoutUsersInput | paymentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: paymentsCreateManyUsersInputEnvelope
    set?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    disconnect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    delete?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    update?: paymentsUpdateWithWhereUniqueWithoutUsersInput | paymentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: paymentsUpdateManyWithWhereWithoutUsersInput | paymentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: paymentsScalarWhereInput | paymentsScalarWhereInput[]
  }

  export type ratingsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<ratingsCreateWithoutUsersInput, ratingsUncheckedCreateWithoutUsersInput> | ratingsCreateWithoutUsersInput[] | ratingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutUsersInput | ratingsCreateOrConnectWithoutUsersInput[]
    upsert?: ratingsUpsertWithWhereUniqueWithoutUsersInput | ratingsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: ratingsCreateManyUsersInputEnvelope
    set?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    disconnect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    delete?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    update?: ratingsUpdateWithWhereUniqueWithoutUsersInput | ratingsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: ratingsUpdateManyWithWhereWithoutUsersInput | ratingsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: ratingsScalarWhereInput | ratingsScalarWhereInput[]
  }

  export type user_booksUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_booksCreateWithoutUsersInput, user_booksUncheckedCreateWithoutUsersInput> | user_booksCreateWithoutUsersInput[] | user_booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutUsersInput | user_booksCreateOrConnectWithoutUsersInput[]
    upsert?: user_booksUpsertWithWhereUniqueWithoutUsersInput | user_booksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_booksCreateManyUsersInputEnvelope
    set?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    disconnect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    delete?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    update?: user_booksUpdateWithWhereUniqueWithoutUsersInput | user_booksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_booksUpdateManyWithWhereWithoutUsersInput | user_booksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_booksScalarWhereInput | user_booksScalarWhereInput[]
  }

  export type book_requestsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<book_requestsCreateWithoutUsersInput, book_requestsUncheckedCreateWithoutUsersInput> | book_requestsCreateWithoutUsersInput[] | book_requestsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: book_requestsCreateOrConnectWithoutUsersInput | book_requestsCreateOrConnectWithoutUsersInput[]
    upsert?: book_requestsUpsertWithWhereUniqueWithoutUsersInput | book_requestsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: book_requestsCreateManyUsersInputEnvelope
    set?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    disconnect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    delete?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    connect?: book_requestsWhereUniqueInput | book_requestsWhereUniqueInput[]
    update?: book_requestsUpdateWithWhereUniqueWithoutUsersInput | book_requestsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: book_requestsUpdateManyWithWhereWithoutUsersInput | book_requestsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: book_requestsScalarWhereInput | book_requestsScalarWhereInput[]
  }

  export type booksUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<booksCreateWithoutUsersInput, booksUncheckedCreateWithoutUsersInput> | booksCreateWithoutUsersInput[] | booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: booksCreateOrConnectWithoutUsersInput | booksCreateOrConnectWithoutUsersInput[]
    upsert?: booksUpsertWithWhereUniqueWithoutUsersInput | booksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: booksCreateManyUsersInputEnvelope
    set?: booksWhereUniqueInput | booksWhereUniqueInput[]
    disconnect?: booksWhereUniqueInput | booksWhereUniqueInput[]
    delete?: booksWhereUniqueInput | booksWhereUniqueInput[]
    connect?: booksWhereUniqueInput | booksWhereUniqueInput[]
    update?: booksUpdateWithWhereUniqueWithoutUsersInput | booksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: booksUpdateManyWithWhereWithoutUsersInput | booksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: booksScalarWhereInput | booksScalarWhereInput[]
  }

  export type commentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutUsersInput | commentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutUsersInput | commentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutUsersInput | commentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type paymentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<paymentsCreateWithoutUsersInput, paymentsUncheckedCreateWithoutUsersInput> | paymentsCreateWithoutUsersInput[] | paymentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: paymentsCreateOrConnectWithoutUsersInput | paymentsCreateOrConnectWithoutUsersInput[]
    upsert?: paymentsUpsertWithWhereUniqueWithoutUsersInput | paymentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: paymentsCreateManyUsersInputEnvelope
    set?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    disconnect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    delete?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    connect?: paymentsWhereUniqueInput | paymentsWhereUniqueInput[]
    update?: paymentsUpdateWithWhereUniqueWithoutUsersInput | paymentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: paymentsUpdateManyWithWhereWithoutUsersInput | paymentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: paymentsScalarWhereInput | paymentsScalarWhereInput[]
  }

  export type ratingsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<ratingsCreateWithoutUsersInput, ratingsUncheckedCreateWithoutUsersInput> | ratingsCreateWithoutUsersInput[] | ratingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: ratingsCreateOrConnectWithoutUsersInput | ratingsCreateOrConnectWithoutUsersInput[]
    upsert?: ratingsUpsertWithWhereUniqueWithoutUsersInput | ratingsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: ratingsCreateManyUsersInputEnvelope
    set?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    disconnect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    delete?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    connect?: ratingsWhereUniqueInput | ratingsWhereUniqueInput[]
    update?: ratingsUpdateWithWhereUniqueWithoutUsersInput | ratingsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: ratingsUpdateManyWithWhereWithoutUsersInput | ratingsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: ratingsScalarWhereInput | ratingsScalarWhereInput[]
  }

  export type user_booksUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_booksCreateWithoutUsersInput, user_booksUncheckedCreateWithoutUsersInput> | user_booksCreateWithoutUsersInput[] | user_booksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_booksCreateOrConnectWithoutUsersInput | user_booksCreateOrConnectWithoutUsersInput[]
    upsert?: user_booksUpsertWithWhereUniqueWithoutUsersInput | user_booksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_booksCreateManyUsersInputEnvelope
    set?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    disconnect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    delete?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    connect?: user_booksWhereUniqueInput | user_booksWhereUniqueInput[]
    update?: user_booksUpdateWithWhereUniqueWithoutUsersInput | user_booksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_booksUpdateManyWithWhereWithoutUsersInput | user_booksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_booksScalarWhereInput | user_booksScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutBook_requestsInput = {
    create?: XOR<usersCreateWithoutBook_requestsInput, usersUncheckedCreateWithoutBook_requestsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBook_requestsInput
    connect?: usersWhereUniqueInput
  }

  export type booksCreateNestedOneWithoutBook_requestsInput = {
    create?: XOR<booksCreateWithoutBook_requestsInput, booksUncheckedCreateWithoutBook_requestsInput>
    connectOrCreate?: booksCreateOrConnectWithoutBook_requestsInput
    connect?: booksWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutBook_requestsNestedInput = {
    create?: XOR<usersCreateWithoutBook_requestsInput, usersUncheckedCreateWithoutBook_requestsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBook_requestsInput
    upsert?: usersUpsertWithoutBook_requestsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBook_requestsInput, usersUpdateWithoutBook_requestsInput>, usersUncheckedUpdateWithoutBook_requestsInput>
  }

  export type booksUpdateOneWithoutBook_requestsNestedInput = {
    create?: XOR<booksCreateWithoutBook_requestsInput, booksUncheckedCreateWithoutBook_requestsInput>
    connectOrCreate?: booksCreateOrConnectWithoutBook_requestsInput
    upsert?: booksUpsertWithoutBook_requestsInput
    disconnect?: booksWhereInput | boolean
    delete?: booksWhereInput | boolean
    connect?: booksWhereUniqueInput
    update?: XOR<XOR<booksUpdateToOneWithWhereWithoutBook_requestsInput, booksUpdateWithoutBook_requestsInput>, booksUncheckedUpdateWithoutBook_requestsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type book_category_linksCreateWithoutBook_categoriesInput = {
    books: booksCreateNestedOneWithoutBook_category_linksInput
  }

  export type book_category_linksUncheckedCreateWithoutBook_categoriesInput = {
    book_id: number
  }

  export type book_category_linksCreateOrConnectWithoutBook_categoriesInput = {
    where: book_category_linksWhereUniqueInput
    create: XOR<book_category_linksCreateWithoutBook_categoriesInput, book_category_linksUncheckedCreateWithoutBook_categoriesInput>
  }

  export type book_category_linksCreateManyBook_categoriesInputEnvelope = {
    data: book_category_linksCreateManyBook_categoriesInput | book_category_linksCreateManyBook_categoriesInput[]
    skipDuplicates?: boolean
  }

  export type book_category_linksUpsertWithWhereUniqueWithoutBook_categoriesInput = {
    where: book_category_linksWhereUniqueInput
    update: XOR<book_category_linksUpdateWithoutBook_categoriesInput, book_category_linksUncheckedUpdateWithoutBook_categoriesInput>
    create: XOR<book_category_linksCreateWithoutBook_categoriesInput, book_category_linksUncheckedCreateWithoutBook_categoriesInput>
  }

  export type book_category_linksUpdateWithWhereUniqueWithoutBook_categoriesInput = {
    where: book_category_linksWhereUniqueInput
    data: XOR<book_category_linksUpdateWithoutBook_categoriesInput, book_category_linksUncheckedUpdateWithoutBook_categoriesInput>
  }

  export type book_category_linksUpdateManyWithWhereWithoutBook_categoriesInput = {
    where: book_category_linksScalarWhereInput
    data: XOR<book_category_linksUpdateManyMutationInput, book_category_linksUncheckedUpdateManyWithoutBook_categoriesInput>
  }

  export type book_category_linksScalarWhereInput = {
    AND?: book_category_linksScalarWhereInput | book_category_linksScalarWhereInput[]
    OR?: book_category_linksScalarWhereInput[]
    NOT?: book_category_linksScalarWhereInput | book_category_linksScalarWhereInput[]
    book_id?: IntFilter<"book_category_links"> | number
    category_id?: IntFilter<"book_category_links"> | number
  }

  export type booksCreateWithoutBook_category_linksInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutBook_category_linksInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutBook_category_linksInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutBook_category_linksInput, booksUncheckedCreateWithoutBook_category_linksInput>
  }

  export type book_categoriesCreateWithoutBook_category_linksInput = {
    category_name: string
  }

  export type book_categoriesUncheckedCreateWithoutBook_category_linksInput = {
    category_id?: number
    category_name: string
  }

  export type book_categoriesCreateOrConnectWithoutBook_category_linksInput = {
    where: book_categoriesWhereUniqueInput
    create: XOR<book_categoriesCreateWithoutBook_category_linksInput, book_categoriesUncheckedCreateWithoutBook_category_linksInput>
  }

  export type booksUpsertWithoutBook_category_linksInput = {
    update: XOR<booksUpdateWithoutBook_category_linksInput, booksUncheckedUpdateWithoutBook_category_linksInput>
    create: XOR<booksCreateWithoutBook_category_linksInput, booksUncheckedCreateWithoutBook_category_linksInput>
    where?: booksWhereInput
  }

  export type booksUpdateToOneWithWhereWithoutBook_category_linksInput = {
    where?: booksWhereInput
    data: XOR<booksUpdateWithoutBook_category_linksInput, booksUncheckedUpdateWithoutBook_category_linksInput>
  }

  export type booksUpdateWithoutBook_category_linksInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutBook_category_linksInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type book_categoriesUpsertWithoutBook_category_linksInput = {
    update: XOR<book_categoriesUpdateWithoutBook_category_linksInput, book_categoriesUncheckedUpdateWithoutBook_category_linksInput>
    create: XOR<book_categoriesCreateWithoutBook_category_linksInput, book_categoriesUncheckedCreateWithoutBook_category_linksInput>
    where?: book_categoriesWhereInput
  }

  export type book_categoriesUpdateToOneWithWhereWithoutBook_category_linksInput = {
    where?: book_categoriesWhereInput
    data: XOR<book_categoriesUpdateWithoutBook_category_linksInput, book_categoriesUncheckedUpdateWithoutBook_category_linksInput>
  }

  export type book_categoriesUpdateWithoutBook_category_linksInput = {
    category_name?: StringFieldUpdateOperationsInput | string
  }

  export type book_categoriesUncheckedUpdateWithoutBook_category_linksInput = {
    category_id?: IntFieldUpdateOperationsInput | number
    category_name?: StringFieldUpdateOperationsInput | string
  }

  export type book_category_linksCreateWithoutBooksInput = {
    book_categories: book_categoriesCreateNestedOneWithoutBook_category_linksInput
  }

  export type book_category_linksUncheckedCreateWithoutBooksInput = {
    category_id: number
  }

  export type book_category_linksCreateOrConnectWithoutBooksInput = {
    where: book_category_linksWhereUniqueInput
    create: XOR<book_category_linksCreateWithoutBooksInput, book_category_linksUncheckedCreateWithoutBooksInput>
  }

  export type book_category_linksCreateManyBooksInputEnvelope = {
    data: book_category_linksCreateManyBooksInput | book_category_linksCreateManyBooksInput[]
    skipDuplicates?: boolean
  }

  export type book_requestsCreateWithoutBooksInput = {
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
    users: usersCreateNestedOneWithoutBook_requestsInput
  }

  export type book_requestsUncheckedCreateWithoutBooksInput = {
    request_id?: number
    author_id: number
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
  }

  export type book_requestsCreateOrConnectWithoutBooksInput = {
    where: book_requestsWhereUniqueInput
    create: XOR<book_requestsCreateWithoutBooksInput, book_requestsUncheckedCreateWithoutBooksInput>
  }

  export type book_requestsCreateManyBooksInputEnvelope = {
    data: book_requestsCreateManyBooksInput | book_requestsCreateManyBooksInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutBooksInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutUsersInput
    comments?: commentsCreateNestedManyWithoutUsersInput
    payments?: paymentsCreateNestedManyWithoutUsersInput
    ratings?: ratingsCreateNestedManyWithoutUsersInput
    user_books?: user_booksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutBooksInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutUsersInput
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    payments?: paymentsUncheckedCreateNestedManyWithoutUsersInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutUsersInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutBooksInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBooksInput, usersUncheckedCreateWithoutBooksInput>
  }

  export type commentsCreateWithoutBooksInput = {
    content: string
    created_at?: Date | string
    users: usersCreateNestedOneWithoutCommentsInput
  }

  export type commentsUncheckedCreateWithoutBooksInput = {
    comments_id?: number
    user_id: number
    content: string
    created_at?: Date | string
  }

  export type commentsCreateOrConnectWithoutBooksInput = {
    where: commentsWhereUniqueInput
    create: XOR<commentsCreateWithoutBooksInput, commentsUncheckedCreateWithoutBooksInput>
  }

  export type commentsCreateManyBooksInputEnvelope = {
    data: commentsCreateManyBooksInput | commentsCreateManyBooksInput[]
    skipDuplicates?: boolean
  }

  export type paymentsCreateWithoutBooksInput = {
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
    users: usersCreateNestedOneWithoutPaymentsInput
  }

  export type paymentsUncheckedCreateWithoutBooksInput = {
    pay_id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
  }

  export type paymentsCreateOrConnectWithoutBooksInput = {
    where: paymentsWhereUniqueInput
    create: XOR<paymentsCreateWithoutBooksInput, paymentsUncheckedCreateWithoutBooksInput>
  }

  export type paymentsCreateManyBooksInputEnvelope = {
    data: paymentsCreateManyBooksInput | paymentsCreateManyBooksInput[]
    skipDuplicates?: boolean
  }

  export type ratingsCreateWithoutBooksInput = {
    rating: number
    review?: string | null
    created_at?: Date | string
    users: usersCreateNestedOneWithoutRatingsInput
  }

  export type ratingsUncheckedCreateWithoutBooksInput = {
    rating_id?: number
    user_id: number
    rating: number
    review?: string | null
    created_at?: Date | string
  }

  export type ratingsCreateOrConnectWithoutBooksInput = {
    where: ratingsWhereUniqueInput
    create: XOR<ratingsCreateWithoutBooksInput, ratingsUncheckedCreateWithoutBooksInput>
  }

  export type ratingsCreateManyBooksInputEnvelope = {
    data: ratingsCreateManyBooksInput | ratingsCreateManyBooksInput[]
    skipDuplicates?: boolean
  }

  export type user_booksCreateWithoutBooksInput = {
    purchased_at?: Date | string
    users: usersCreateNestedOneWithoutUser_booksInput
  }

  export type user_booksUncheckedCreateWithoutBooksInput = {
    id?: number
    user_id: number
    purchased_at?: Date | string
  }

  export type user_booksCreateOrConnectWithoutBooksInput = {
    where: user_booksWhereUniqueInput
    create: XOR<user_booksCreateWithoutBooksInput, user_booksUncheckedCreateWithoutBooksInput>
  }

  export type user_booksCreateManyBooksInputEnvelope = {
    data: user_booksCreateManyBooksInput | user_booksCreateManyBooksInput[]
    skipDuplicates?: boolean
  }

  export type book_category_linksUpsertWithWhereUniqueWithoutBooksInput = {
    where: book_category_linksWhereUniqueInput
    update: XOR<book_category_linksUpdateWithoutBooksInput, book_category_linksUncheckedUpdateWithoutBooksInput>
    create: XOR<book_category_linksCreateWithoutBooksInput, book_category_linksUncheckedCreateWithoutBooksInput>
  }

  export type book_category_linksUpdateWithWhereUniqueWithoutBooksInput = {
    where: book_category_linksWhereUniqueInput
    data: XOR<book_category_linksUpdateWithoutBooksInput, book_category_linksUncheckedUpdateWithoutBooksInput>
  }

  export type book_category_linksUpdateManyWithWhereWithoutBooksInput = {
    where: book_category_linksScalarWhereInput
    data: XOR<book_category_linksUpdateManyMutationInput, book_category_linksUncheckedUpdateManyWithoutBooksInput>
  }

  export type book_requestsUpsertWithWhereUniqueWithoutBooksInput = {
    where: book_requestsWhereUniqueInput
    update: XOR<book_requestsUpdateWithoutBooksInput, book_requestsUncheckedUpdateWithoutBooksInput>
    create: XOR<book_requestsCreateWithoutBooksInput, book_requestsUncheckedCreateWithoutBooksInput>
  }

  export type book_requestsUpdateWithWhereUniqueWithoutBooksInput = {
    where: book_requestsWhereUniqueInput
    data: XOR<book_requestsUpdateWithoutBooksInput, book_requestsUncheckedUpdateWithoutBooksInput>
  }

  export type book_requestsUpdateManyWithWhereWithoutBooksInput = {
    where: book_requestsScalarWhereInput
    data: XOR<book_requestsUpdateManyMutationInput, book_requestsUncheckedUpdateManyWithoutBooksInput>
  }

  export type book_requestsScalarWhereInput = {
    AND?: book_requestsScalarWhereInput | book_requestsScalarWhereInput[]
    OR?: book_requestsScalarWhereInput[]
    NOT?: book_requestsScalarWhereInput | book_requestsScalarWhereInput[]
    request_id?: IntFilter<"book_requests"> | number
    book_id?: IntNullableFilter<"book_requests"> | number | null
    author_id?: IntFilter<"book_requests"> | number
    action?: StringFilter<"book_requests"> | string
    details?: StringNullableFilter<"book_requests"> | string | null
    status?: StringFilter<"book_requests"> | string
    created_at?: DateTimeFilter<"book_requests"> | Date | string
  }

  export type usersUpsertWithoutBooksInput = {
    update: XOR<usersUpdateWithoutBooksInput, usersUncheckedUpdateWithoutBooksInput>
    create: XOR<usersCreateWithoutBooksInput, usersUncheckedCreateWithoutBooksInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBooksInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBooksInput, usersUncheckedUpdateWithoutBooksInput>
  }

  export type usersUpdateWithoutBooksInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutUsersNestedInput
    comments?: commentsUpdateManyWithoutUsersNestedInput
    payments?: paymentsUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutBooksInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutUsersNestedInput
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type commentsUpsertWithWhereUniqueWithoutBooksInput = {
    where: commentsWhereUniqueInput
    update: XOR<commentsUpdateWithoutBooksInput, commentsUncheckedUpdateWithoutBooksInput>
    create: XOR<commentsCreateWithoutBooksInput, commentsUncheckedCreateWithoutBooksInput>
  }

  export type commentsUpdateWithWhereUniqueWithoutBooksInput = {
    where: commentsWhereUniqueInput
    data: XOR<commentsUpdateWithoutBooksInput, commentsUncheckedUpdateWithoutBooksInput>
  }

  export type commentsUpdateManyWithWhereWithoutBooksInput = {
    where: commentsScalarWhereInput
    data: XOR<commentsUpdateManyMutationInput, commentsUncheckedUpdateManyWithoutBooksInput>
  }

  export type commentsScalarWhereInput = {
    AND?: commentsScalarWhereInput | commentsScalarWhereInput[]
    OR?: commentsScalarWhereInput[]
    NOT?: commentsScalarWhereInput | commentsScalarWhereInput[]
    comments_id?: IntFilter<"comments"> | number
    book_id?: IntFilter<"comments"> | number
    user_id?: IntFilter<"comments"> | number
    content?: StringFilter<"comments"> | string
    created_at?: DateTimeFilter<"comments"> | Date | string
  }

  export type paymentsUpsertWithWhereUniqueWithoutBooksInput = {
    where: paymentsWhereUniqueInput
    update: XOR<paymentsUpdateWithoutBooksInput, paymentsUncheckedUpdateWithoutBooksInput>
    create: XOR<paymentsCreateWithoutBooksInput, paymentsUncheckedCreateWithoutBooksInput>
  }

  export type paymentsUpdateWithWhereUniqueWithoutBooksInput = {
    where: paymentsWhereUniqueInput
    data: XOR<paymentsUpdateWithoutBooksInput, paymentsUncheckedUpdateWithoutBooksInput>
  }

  export type paymentsUpdateManyWithWhereWithoutBooksInput = {
    where: paymentsScalarWhereInput
    data: XOR<paymentsUpdateManyMutationInput, paymentsUncheckedUpdateManyWithoutBooksInput>
  }

  export type paymentsScalarWhereInput = {
    AND?: paymentsScalarWhereInput | paymentsScalarWhereInput[]
    OR?: paymentsScalarWhereInput[]
    NOT?: paymentsScalarWhereInput | paymentsScalarWhereInput[]
    pay_id?: IntFilter<"payments"> | number
    user_id?: IntFilter<"payments"> | number
    book_id?: IntFilter<"payments"> | number
    amount?: DecimalFilter<"payments"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"payments"> | string
    paid_at?: DateTimeFilter<"payments"> | Date | string
  }

  export type ratingsUpsertWithWhereUniqueWithoutBooksInput = {
    where: ratingsWhereUniqueInput
    update: XOR<ratingsUpdateWithoutBooksInput, ratingsUncheckedUpdateWithoutBooksInput>
    create: XOR<ratingsCreateWithoutBooksInput, ratingsUncheckedCreateWithoutBooksInput>
  }

  export type ratingsUpdateWithWhereUniqueWithoutBooksInput = {
    where: ratingsWhereUniqueInput
    data: XOR<ratingsUpdateWithoutBooksInput, ratingsUncheckedUpdateWithoutBooksInput>
  }

  export type ratingsUpdateManyWithWhereWithoutBooksInput = {
    where: ratingsScalarWhereInput
    data: XOR<ratingsUpdateManyMutationInput, ratingsUncheckedUpdateManyWithoutBooksInput>
  }

  export type ratingsScalarWhereInput = {
    AND?: ratingsScalarWhereInput | ratingsScalarWhereInput[]
    OR?: ratingsScalarWhereInput[]
    NOT?: ratingsScalarWhereInput | ratingsScalarWhereInput[]
    rating_id?: IntFilter<"ratings"> | number
    book_id?: IntFilter<"ratings"> | number
    user_id?: IntFilter<"ratings"> | number
    rating?: IntFilter<"ratings"> | number
    review?: StringNullableFilter<"ratings"> | string | null
    created_at?: DateTimeFilter<"ratings"> | Date | string
  }

  export type user_booksUpsertWithWhereUniqueWithoutBooksInput = {
    where: user_booksWhereUniqueInput
    update: XOR<user_booksUpdateWithoutBooksInput, user_booksUncheckedUpdateWithoutBooksInput>
    create: XOR<user_booksCreateWithoutBooksInput, user_booksUncheckedCreateWithoutBooksInput>
  }

  export type user_booksUpdateWithWhereUniqueWithoutBooksInput = {
    where: user_booksWhereUniqueInput
    data: XOR<user_booksUpdateWithoutBooksInput, user_booksUncheckedUpdateWithoutBooksInput>
  }

  export type user_booksUpdateManyWithWhereWithoutBooksInput = {
    where: user_booksScalarWhereInput
    data: XOR<user_booksUpdateManyMutationInput, user_booksUncheckedUpdateManyWithoutBooksInput>
  }

  export type user_booksScalarWhereInput = {
    AND?: user_booksScalarWhereInput | user_booksScalarWhereInput[]
    OR?: user_booksScalarWhereInput[]
    NOT?: user_booksScalarWhereInput | user_booksScalarWhereInput[]
    id?: IntFilter<"user_books"> | number
    user_id?: IntFilter<"user_books"> | number
    book_id?: IntFilter<"user_books"> | number
    purchased_at?: DateTimeFilter<"user_books"> | Date | string
  }

  export type booksCreateWithoutCommentsInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutCommentsInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutCommentsInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutCommentsInput, booksUncheckedCreateWithoutCommentsInput>
  }

  export type usersCreateWithoutCommentsInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutUsersInput
    books?: booksCreateNestedManyWithoutUsersInput
    payments?: paymentsCreateNestedManyWithoutUsersInput
    ratings?: ratingsCreateNestedManyWithoutUsersInput
    user_books?: user_booksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutCommentsInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutUsersInput
    books?: booksUncheckedCreateNestedManyWithoutUsersInput
    payments?: paymentsUncheckedCreateNestedManyWithoutUsersInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutUsersInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutCommentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
  }

  export type booksUpsertWithoutCommentsInput = {
    update: XOR<booksUpdateWithoutCommentsInput, booksUncheckedUpdateWithoutCommentsInput>
    create: XOR<booksCreateWithoutCommentsInput, booksUncheckedCreateWithoutCommentsInput>
    where?: booksWhereInput
  }

  export type booksUpdateToOneWithWhereWithoutCommentsInput = {
    where?: booksWhereInput
    data: XOR<booksUpdateWithoutCommentsInput, booksUncheckedUpdateWithoutCommentsInput>
  }

  export type booksUpdateWithoutCommentsInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutCommentsInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type usersUpsertWithoutCommentsInput = {
    update: XOR<usersUpdateWithoutCommentsInput, usersUncheckedUpdateWithoutCommentsInput>
    create: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCommentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCommentsInput, usersUncheckedUpdateWithoutCommentsInput>
  }

  export type usersUpdateWithoutCommentsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutUsersNestedInput
    books?: booksUpdateManyWithoutUsersNestedInput
    payments?: paymentsUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutCommentsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutUsersNestedInput
    books?: booksUncheckedUpdateManyWithoutUsersNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type booksCreateWithoutPaymentsInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutPaymentsInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutPaymentsInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutPaymentsInput, booksUncheckedCreateWithoutPaymentsInput>
  }

  export type usersCreateWithoutPaymentsInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutUsersInput
    books?: booksCreateNestedManyWithoutUsersInput
    comments?: commentsCreateNestedManyWithoutUsersInput
    ratings?: ratingsCreateNestedManyWithoutUsersInput
    user_books?: user_booksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutPaymentsInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutUsersInput
    books?: booksUncheckedCreateNestedManyWithoutUsersInput
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutUsersInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutPaymentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPaymentsInput, usersUncheckedCreateWithoutPaymentsInput>
  }

  export type booksUpsertWithoutPaymentsInput = {
    update: XOR<booksUpdateWithoutPaymentsInput, booksUncheckedUpdateWithoutPaymentsInput>
    create: XOR<booksCreateWithoutPaymentsInput, booksUncheckedCreateWithoutPaymentsInput>
    where?: booksWhereInput
  }

  export type booksUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: booksWhereInput
    data: XOR<booksUpdateWithoutPaymentsInput, booksUncheckedUpdateWithoutPaymentsInput>
  }

  export type booksUpdateWithoutPaymentsInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutPaymentsInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type usersUpsertWithoutPaymentsInput = {
    update: XOR<usersUpdateWithoutPaymentsInput, usersUncheckedUpdateWithoutPaymentsInput>
    create: XOR<usersCreateWithoutPaymentsInput, usersUncheckedCreateWithoutPaymentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutPaymentsInput, usersUncheckedUpdateWithoutPaymentsInput>
  }

  export type usersUpdateWithoutPaymentsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutUsersNestedInput
    books?: booksUpdateManyWithoutUsersNestedInput
    comments?: commentsUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutPaymentsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutUsersNestedInput
    books?: booksUncheckedUpdateManyWithoutUsersNestedInput
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type booksCreateWithoutRatingsInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutRatingsInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutRatingsInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutRatingsInput, booksUncheckedCreateWithoutRatingsInput>
  }

  export type usersCreateWithoutRatingsInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutUsersInput
    books?: booksCreateNestedManyWithoutUsersInput
    comments?: commentsCreateNestedManyWithoutUsersInput
    payments?: paymentsCreateNestedManyWithoutUsersInput
    user_books?: user_booksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutRatingsInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutUsersInput
    books?: booksUncheckedCreateNestedManyWithoutUsersInput
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    payments?: paymentsUncheckedCreateNestedManyWithoutUsersInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutRatingsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRatingsInput, usersUncheckedCreateWithoutRatingsInput>
  }

  export type booksUpsertWithoutRatingsInput = {
    update: XOR<booksUpdateWithoutRatingsInput, booksUncheckedUpdateWithoutRatingsInput>
    create: XOR<booksCreateWithoutRatingsInput, booksUncheckedCreateWithoutRatingsInput>
    where?: booksWhereInput
  }

  export type booksUpdateToOneWithWhereWithoutRatingsInput = {
    where?: booksWhereInput
    data: XOR<booksUpdateWithoutRatingsInput, booksUncheckedUpdateWithoutRatingsInput>
  }

  export type booksUpdateWithoutRatingsInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutRatingsInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type usersUpsertWithoutRatingsInput = {
    update: XOR<usersUpdateWithoutRatingsInput, usersUncheckedUpdateWithoutRatingsInput>
    create: XOR<usersCreateWithoutRatingsInput, usersUncheckedCreateWithoutRatingsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutRatingsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutRatingsInput, usersUncheckedUpdateWithoutRatingsInput>
  }

  export type usersUpdateWithoutRatingsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutUsersNestedInput
    books?: booksUpdateManyWithoutUsersNestedInput
    comments?: commentsUpdateManyWithoutUsersNestedInput
    payments?: paymentsUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutRatingsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutUsersNestedInput
    books?: booksUncheckedUpdateManyWithoutUsersNestedInput
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type booksCreateWithoutUser_booksInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutUser_booksInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutUser_booksInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutUser_booksInput, booksUncheckedCreateWithoutUser_booksInput>
  }

  export type usersCreateWithoutUser_booksInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsCreateNestedManyWithoutUsersInput
    books?: booksCreateNestedManyWithoutUsersInput
    comments?: commentsCreateNestedManyWithoutUsersInput
    payments?: paymentsCreateNestedManyWithoutUsersInput
    ratings?: ratingsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_booksInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutUsersInput
    books?: booksUncheckedCreateNestedManyWithoutUsersInput
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    payments?: paymentsUncheckedCreateNestedManyWithoutUsersInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUser_booksInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_booksInput, usersUncheckedCreateWithoutUser_booksInput>
  }

  export type booksUpsertWithoutUser_booksInput = {
    update: XOR<booksUpdateWithoutUser_booksInput, booksUncheckedUpdateWithoutUser_booksInput>
    create: XOR<booksCreateWithoutUser_booksInput, booksUncheckedCreateWithoutUser_booksInput>
    where?: booksWhereInput
  }

  export type booksUpdateToOneWithWhereWithoutUser_booksInput = {
    where?: booksWhereInput
    data: XOR<booksUpdateWithoutUser_booksInput, booksUncheckedUpdateWithoutUser_booksInput>
  }

  export type booksUpdateWithoutUser_booksInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutUser_booksInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type usersUpsertWithoutUser_booksInput = {
    update: XOR<usersUpdateWithoutUser_booksInput, usersUncheckedUpdateWithoutUser_booksInput>
    create: XOR<usersCreateWithoutUser_booksInput, usersUncheckedCreateWithoutUser_booksInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_booksInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_booksInput, usersUncheckedUpdateWithoutUser_booksInput>
  }

  export type usersUpdateWithoutUser_booksInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUpdateManyWithoutUsersNestedInput
    books?: booksUpdateManyWithoutUsersNestedInput
    comments?: commentsUpdateManyWithoutUsersNestedInput
    payments?: paymentsUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_booksInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_requests?: book_requestsUncheckedUpdateManyWithoutUsersNestedInput
    books?: booksUncheckedUpdateManyWithoutUsersNestedInput
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type book_requestsCreateWithoutUsersInput = {
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
    books?: booksCreateNestedOneWithoutBook_requestsInput
  }

  export type book_requestsUncheckedCreateWithoutUsersInput = {
    request_id?: number
    book_id?: number | null
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
  }

  export type book_requestsCreateOrConnectWithoutUsersInput = {
    where: book_requestsWhereUniqueInput
    create: XOR<book_requestsCreateWithoutUsersInput, book_requestsUncheckedCreateWithoutUsersInput>
  }

  export type book_requestsCreateManyUsersInputEnvelope = {
    data: book_requestsCreateManyUsersInput | book_requestsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type booksCreateWithoutUsersInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsCreateNestedManyWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutUsersInput = {
    book_id?: number
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    book_requests?: book_requestsUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutUsersInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutUsersInput, booksUncheckedCreateWithoutUsersInput>
  }

  export type booksCreateManyUsersInputEnvelope = {
    data: booksCreateManyUsersInput | booksCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type commentsCreateWithoutUsersInput = {
    content: string
    created_at?: Date | string
    books: booksCreateNestedOneWithoutCommentsInput
  }

  export type commentsUncheckedCreateWithoutUsersInput = {
    comments_id?: number
    book_id: number
    content: string
    created_at?: Date | string
  }

  export type commentsCreateOrConnectWithoutUsersInput = {
    where: commentsWhereUniqueInput
    create: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput>
  }

  export type commentsCreateManyUsersInputEnvelope = {
    data: commentsCreateManyUsersInput | commentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type paymentsCreateWithoutUsersInput = {
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
    books: booksCreateNestedOneWithoutPaymentsInput
  }

  export type paymentsUncheckedCreateWithoutUsersInput = {
    pay_id?: number
    book_id: number
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
  }

  export type paymentsCreateOrConnectWithoutUsersInput = {
    where: paymentsWhereUniqueInput
    create: XOR<paymentsCreateWithoutUsersInput, paymentsUncheckedCreateWithoutUsersInput>
  }

  export type paymentsCreateManyUsersInputEnvelope = {
    data: paymentsCreateManyUsersInput | paymentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type ratingsCreateWithoutUsersInput = {
    rating: number
    review?: string | null
    created_at?: Date | string
    books: booksCreateNestedOneWithoutRatingsInput
  }

  export type ratingsUncheckedCreateWithoutUsersInput = {
    rating_id?: number
    book_id: number
    rating: number
    review?: string | null
    created_at?: Date | string
  }

  export type ratingsCreateOrConnectWithoutUsersInput = {
    where: ratingsWhereUniqueInput
    create: XOR<ratingsCreateWithoutUsersInput, ratingsUncheckedCreateWithoutUsersInput>
  }

  export type ratingsCreateManyUsersInputEnvelope = {
    data: ratingsCreateManyUsersInput | ratingsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type user_booksCreateWithoutUsersInput = {
    purchased_at?: Date | string
    books: booksCreateNestedOneWithoutUser_booksInput
  }

  export type user_booksUncheckedCreateWithoutUsersInput = {
    id?: number
    book_id: number
    purchased_at?: Date | string
  }

  export type user_booksCreateOrConnectWithoutUsersInput = {
    where: user_booksWhereUniqueInput
    create: XOR<user_booksCreateWithoutUsersInput, user_booksUncheckedCreateWithoutUsersInput>
  }

  export type user_booksCreateManyUsersInputEnvelope = {
    data: user_booksCreateManyUsersInput | user_booksCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type book_requestsUpsertWithWhereUniqueWithoutUsersInput = {
    where: book_requestsWhereUniqueInput
    update: XOR<book_requestsUpdateWithoutUsersInput, book_requestsUncheckedUpdateWithoutUsersInput>
    create: XOR<book_requestsCreateWithoutUsersInput, book_requestsUncheckedCreateWithoutUsersInput>
  }

  export type book_requestsUpdateWithWhereUniqueWithoutUsersInput = {
    where: book_requestsWhereUniqueInput
    data: XOR<book_requestsUpdateWithoutUsersInput, book_requestsUncheckedUpdateWithoutUsersInput>
  }

  export type book_requestsUpdateManyWithWhereWithoutUsersInput = {
    where: book_requestsScalarWhereInput
    data: XOR<book_requestsUpdateManyMutationInput, book_requestsUncheckedUpdateManyWithoutUsersInput>
  }

  export type booksUpsertWithWhereUniqueWithoutUsersInput = {
    where: booksWhereUniqueInput
    update: XOR<booksUpdateWithoutUsersInput, booksUncheckedUpdateWithoutUsersInput>
    create: XOR<booksCreateWithoutUsersInput, booksUncheckedCreateWithoutUsersInput>
  }

  export type booksUpdateWithWhereUniqueWithoutUsersInput = {
    where: booksWhereUniqueInput
    data: XOR<booksUpdateWithoutUsersInput, booksUncheckedUpdateWithoutUsersInput>
  }

  export type booksUpdateManyWithWhereWithoutUsersInput = {
    where: booksScalarWhereInput
    data: XOR<booksUpdateManyMutationInput, booksUncheckedUpdateManyWithoutUsersInput>
  }

  export type booksScalarWhereInput = {
    AND?: booksScalarWhereInput | booksScalarWhereInput[]
    OR?: booksScalarWhereInput[]
    NOT?: booksScalarWhereInput | booksScalarWhereInput[]
    book_id?: IntFilter<"books"> | number
    isbn?: StringFilter<"books"> | string
    name?: StringFilter<"books"> | string
    author_id?: IntFilter<"books"> | number
    description?: StringNullableFilter<"books"> | string | null
    cover_image?: StringNullableFilter<"books"> | string | null
    file_path?: StringNullableFilter<"books"> | string | null
    price?: DecimalFilter<"books"> | Decimal | DecimalJsLike | number | string
    published_date?: DateTimeNullableFilter<"books"> | Date | string | null
    created_at?: DateTimeFilter<"books"> | Date | string
  }

  export type commentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: commentsWhereUniqueInput
    update: XOR<commentsUpdateWithoutUsersInput, commentsUncheckedUpdateWithoutUsersInput>
    create: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput>
  }

  export type commentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: commentsWhereUniqueInput
    data: XOR<commentsUpdateWithoutUsersInput, commentsUncheckedUpdateWithoutUsersInput>
  }

  export type commentsUpdateManyWithWhereWithoutUsersInput = {
    where: commentsScalarWhereInput
    data: XOR<commentsUpdateManyMutationInput, commentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type paymentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: paymentsWhereUniqueInput
    update: XOR<paymentsUpdateWithoutUsersInput, paymentsUncheckedUpdateWithoutUsersInput>
    create: XOR<paymentsCreateWithoutUsersInput, paymentsUncheckedCreateWithoutUsersInput>
  }

  export type paymentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: paymentsWhereUniqueInput
    data: XOR<paymentsUpdateWithoutUsersInput, paymentsUncheckedUpdateWithoutUsersInput>
  }

  export type paymentsUpdateManyWithWhereWithoutUsersInput = {
    where: paymentsScalarWhereInput
    data: XOR<paymentsUpdateManyMutationInput, paymentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type ratingsUpsertWithWhereUniqueWithoutUsersInput = {
    where: ratingsWhereUniqueInput
    update: XOR<ratingsUpdateWithoutUsersInput, ratingsUncheckedUpdateWithoutUsersInput>
    create: XOR<ratingsCreateWithoutUsersInput, ratingsUncheckedCreateWithoutUsersInput>
  }

  export type ratingsUpdateWithWhereUniqueWithoutUsersInput = {
    where: ratingsWhereUniqueInput
    data: XOR<ratingsUpdateWithoutUsersInput, ratingsUncheckedUpdateWithoutUsersInput>
  }

  export type ratingsUpdateManyWithWhereWithoutUsersInput = {
    where: ratingsScalarWhereInput
    data: XOR<ratingsUpdateManyMutationInput, ratingsUncheckedUpdateManyWithoutUsersInput>
  }

  export type user_booksUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_booksWhereUniqueInput
    update: XOR<user_booksUpdateWithoutUsersInput, user_booksUncheckedUpdateWithoutUsersInput>
    create: XOR<user_booksCreateWithoutUsersInput, user_booksUncheckedCreateWithoutUsersInput>
  }

  export type user_booksUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_booksWhereUniqueInput
    data: XOR<user_booksUpdateWithoutUsersInput, user_booksUncheckedUpdateWithoutUsersInput>
  }

  export type user_booksUpdateManyWithWhereWithoutUsersInput = {
    where: user_booksScalarWhereInput
    data: XOR<user_booksUpdateManyMutationInput, user_booksUncheckedUpdateManyWithoutUsersInput>
  }

  export type usersCreateWithoutBook_requestsInput = {
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    books?: booksCreateNestedManyWithoutUsersInput
    comments?: commentsCreateNestedManyWithoutUsersInput
    payments?: paymentsCreateNestedManyWithoutUsersInput
    ratings?: ratingsCreateNestedManyWithoutUsersInput
    user_books?: user_booksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutBook_requestsInput = {
    user_id?: number
    username: string
    email: string
    password: string
    name?: string | null
    role: string
    created_at?: Date | string
    books?: booksUncheckedCreateNestedManyWithoutUsersInput
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    payments?: paymentsUncheckedCreateNestedManyWithoutUsersInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutUsersInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutBook_requestsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBook_requestsInput, usersUncheckedCreateWithoutBook_requestsInput>
  }

  export type booksCreateWithoutBook_requestsInput = {
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksCreateNestedManyWithoutBooksInput
    users: usersCreateNestedOneWithoutBooksInput
    comments?: commentsCreateNestedManyWithoutBooksInput
    payments?: paymentsCreateNestedManyWithoutBooksInput
    ratings?: ratingsCreateNestedManyWithoutBooksInput
    user_books?: user_booksCreateNestedManyWithoutBooksInput
  }

  export type booksUncheckedCreateWithoutBook_requestsInput = {
    book_id?: number
    isbn: string
    name: string
    author_id: number
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
    book_category_links?: book_category_linksUncheckedCreateNestedManyWithoutBooksInput
    comments?: commentsUncheckedCreateNestedManyWithoutBooksInput
    payments?: paymentsUncheckedCreateNestedManyWithoutBooksInput
    ratings?: ratingsUncheckedCreateNestedManyWithoutBooksInput
    user_books?: user_booksUncheckedCreateNestedManyWithoutBooksInput
  }

  export type booksCreateOrConnectWithoutBook_requestsInput = {
    where: booksWhereUniqueInput
    create: XOR<booksCreateWithoutBook_requestsInput, booksUncheckedCreateWithoutBook_requestsInput>
  }

  export type usersUpsertWithoutBook_requestsInput = {
    update: XOR<usersUpdateWithoutBook_requestsInput, usersUncheckedUpdateWithoutBook_requestsInput>
    create: XOR<usersCreateWithoutBook_requestsInput, usersUncheckedCreateWithoutBook_requestsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBook_requestsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBook_requestsInput, usersUncheckedUpdateWithoutBook_requestsInput>
  }

  export type usersUpdateWithoutBook_requestsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateManyWithoutUsersNestedInput
    comments?: commentsUpdateManyWithoutUsersNestedInput
    payments?: paymentsUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutBook_requestsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUncheckedUpdateManyWithoutUsersNestedInput
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutUsersNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutUsersNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type booksUpsertWithoutBook_requestsInput = {
    update: XOR<booksUpdateWithoutBook_requestsInput, booksUncheckedUpdateWithoutBook_requestsInput>
    create: XOR<booksCreateWithoutBook_requestsInput, booksUncheckedCreateWithoutBook_requestsInput>
    where?: booksWhereInput
  }

  export type booksUpdateToOneWithWhereWithoutBook_requestsInput = {
    where?: booksWhereInput
    data: XOR<booksUpdateWithoutBook_requestsInput, booksUncheckedUpdateWithoutBook_requestsInput>
  }

  export type booksUpdateWithoutBook_requestsInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    users?: usersUpdateOneRequiredWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutBook_requestsInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    author_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type book_category_linksCreateManyBook_categoriesInput = {
    book_id: number
  }

  export type book_category_linksUpdateWithoutBook_categoriesInput = {
    books?: booksUpdateOneRequiredWithoutBook_category_linksNestedInput
  }

  export type book_category_linksUncheckedUpdateWithoutBook_categoriesInput = {
    book_id?: IntFieldUpdateOperationsInput | number
  }

  export type book_category_linksUncheckedUpdateManyWithoutBook_categoriesInput = {
    book_id?: IntFieldUpdateOperationsInput | number
  }

  export type book_category_linksCreateManyBooksInput = {
    category_id: number
  }

  export type book_requestsCreateManyBooksInput = {
    request_id?: number
    author_id: number
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
  }

  export type commentsCreateManyBooksInput = {
    comments_id?: number
    user_id: number
    content: string
    created_at?: Date | string
  }

  export type paymentsCreateManyBooksInput = {
    pay_id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
  }

  export type ratingsCreateManyBooksInput = {
    rating_id?: number
    user_id: number
    rating: number
    review?: string | null
    created_at?: Date | string
  }

  export type user_booksCreateManyBooksInput = {
    id?: number
    user_id: number
    purchased_at?: Date | string
  }

  export type book_category_linksUpdateWithoutBooksInput = {
    book_categories?: book_categoriesUpdateOneRequiredWithoutBook_category_linksNestedInput
  }

  export type book_category_linksUncheckedUpdateWithoutBooksInput = {
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type book_category_linksUncheckedUpdateManyWithoutBooksInput = {
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type book_requestsUpdateWithoutBooksInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutBook_requestsNestedInput
  }

  export type book_requestsUncheckedUpdateWithoutBooksInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type book_requestsUncheckedUpdateManyWithoutBooksInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsUpdateWithoutBooksInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type commentsUncheckedUpdateWithoutBooksInput = {
    comments_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsUncheckedUpdateManyWithoutBooksInput = {
    comments_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsUpdateWithoutBooksInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type paymentsUncheckedUpdateWithoutBooksInput = {
    pay_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsUncheckedUpdateManyWithoutBooksInput = {
    pay_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsUpdateWithoutBooksInput = {
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type ratingsUncheckedUpdateWithoutBooksInput = {
    rating_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsUncheckedUpdateManyWithoutBooksInput = {
    rating_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksUpdateWithoutBooksInput = {
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutUser_booksNestedInput
  }

  export type user_booksUncheckedUpdateWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksUncheckedUpdateManyWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type book_requestsCreateManyUsersInput = {
    request_id?: number
    book_id?: number | null
    action: string
    details?: string | null
    status?: string
    created_at?: Date | string
  }

  export type booksCreateManyUsersInput = {
    book_id?: number
    isbn: string
    name: string
    description?: string | null
    cover_image?: string | null
    file_path?: string | null
    price?: Decimal | DecimalJsLike | number | string
    published_date?: Date | string | null
    created_at?: Date | string
  }

  export type commentsCreateManyUsersInput = {
    comments_id?: number
    book_id: number
    content: string
    created_at?: Date | string
  }

  export type paymentsCreateManyUsersInput = {
    pay_id?: number
    book_id: number
    amount: Decimal | DecimalJsLike | number | string
    status: string
    paid_at?: Date | string
  }

  export type ratingsCreateManyUsersInput = {
    rating_id?: number
    book_id: number
    rating: number
    review?: string | null
    created_at?: Date | string
  }

  export type user_booksCreateManyUsersInput = {
    id?: number
    book_id: number
    purchased_at?: Date | string
  }

  export type book_requestsUpdateWithoutUsersInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneWithoutBook_requestsNestedInput
  }

  export type book_requestsUncheckedUpdateWithoutUsersInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type book_requestsUncheckedUpdateManyWithoutUsersInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booksUpdateWithoutUsersInput = {
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUpdateManyWithoutBooksNestedInput
    comments?: commentsUpdateManyWithoutBooksNestedInput
    payments?: paymentsUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateWithoutUsersInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book_category_links?: book_category_linksUncheckedUpdateManyWithoutBooksNestedInput
    book_requests?: book_requestsUncheckedUpdateManyWithoutBooksNestedInput
    comments?: commentsUncheckedUpdateManyWithoutBooksNestedInput
    payments?: paymentsUncheckedUpdateManyWithoutBooksNestedInput
    ratings?: ratingsUncheckedUpdateManyWithoutBooksNestedInput
    user_books?: user_booksUncheckedUpdateManyWithoutBooksNestedInput
  }

  export type booksUncheckedUpdateManyWithoutUsersInput = {
    book_id?: IntFieldUpdateOperationsInput | number
    isbn?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    published_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsUpdateWithoutUsersInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type commentsUncheckedUpdateWithoutUsersInput = {
    comments_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentsUncheckedUpdateManyWithoutUsersInput = {
    comments_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsUpdateWithoutUsersInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type paymentsUncheckedUpdateWithoutUsersInput = {
    pay_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paymentsUncheckedUpdateManyWithoutUsersInput = {
    pay_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paid_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsUpdateWithoutUsersInput = {
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type ratingsUncheckedUpdateWithoutUsersInput = {
    rating_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ratingsUncheckedUpdateManyWithoutUsersInput = {
    rating_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksUpdateWithoutUsersInput = {
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: booksUpdateOneRequiredWithoutUser_booksNestedInput
  }

  export type user_booksUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_booksUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}