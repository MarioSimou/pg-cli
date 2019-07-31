export const STATEMENTS = {
    ALL: 'all',
    DELETE_FROM: 'deleteFrom',
    FROM : 'from',
    INSERT_INTO: 'insertInto',
    RETURNING: 'returning',
    SET : 'set',
    SELECT: 'select',
    UPDATE: 'update',
    VALUES: 'values',
    WHERE: 'where',
    AND: 'and',
    AS: 'as',
    EQUAL: 'equal',
    UNEQUAL: 'unequal',
    OR: 'or',
    IN: 'in',
    ANY: 'any',
    GT: 'gt',
    GTE: 'gte',
    LT: 'lt',
    LTE: 'lte',
    LIMIT: 'limit',
    OFFSET: 'offset',
    MATCH: 'match',
    MATCHI: 'matchi',
    IS: 'is',
    NOT: 'not',
    NULL: 'null',
    ORDER_BY: 'orderBy',
    ASC: 'asc',
    DESC: 'desc',
    GROUP_BY: 'groupBy',
    MAX: 'max',
    MIN: 'min',
    COUNT: 'count',
    AVG: 'avg',
    SUM: 'sum',
    CAST: 'cast',
}

export const STATEMENT_MAPPING = {
    select: null,
    from : null,
    where : null,
    update: null ,
    SET: null,
    insertInto: null ,
    values: null,
    deleteFrom: null
}

export const DATA_TYPES = {
  BOOLEAN: 'boolean',
  CHARACTER: {
    TEXT:'text',
    VARCHAR: n => `varchar(${n})`,
    CHAR: n => `char(${n})`
  },
  NUMERIC: {
    SMALL_INT: 'smallint',
    INT: 'int',
    BIG_INT: 'bigint',
    FLOAT: n => `float(${n})`,
    REAL: 'real',
    NUMERIC: (p,s) => `numeric(${p},${s})`
  },
  TEMPORAL: {
    DATE: 'date',
    TIME: 'time',
    TIMESTAMP: 'timestamp',
    TIMESTAMPTZ: 'timestamptz',
    INTERVAL: 'interval'
  }

}