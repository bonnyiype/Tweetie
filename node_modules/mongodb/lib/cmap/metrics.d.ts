/** @internal */
export declare class ConnectionPoolMetrics {
    static readonly TXN: "txn";
    static readonly CURSOR: "cursor";
    static readonly OTHER: "other";
    txnConnections: number;
    cursorConnections: number;
    otherConnections: number;
    /**
     * Mark a connection as pinned for a specific operation.
     */
    markPinned(pinType: string): void;
    /**
     * Unmark a connection as pinned for an operation.
     */
    markUnpinned(pinType: string): void;
    /**
     * Return information about the cmap metrics as a string.
     */
    info(maxPoolSize: number): string;
    /**
     * Reset the metrics to the initial values.
     */
    reset(): void;
}
//# sourceMappingURL=metrics.d.ts.map