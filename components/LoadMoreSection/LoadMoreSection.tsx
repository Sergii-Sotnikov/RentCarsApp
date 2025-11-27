"use client";

type LoadMoreSectionProps = {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  hasCars: boolean;
  onFetchNextPage: () => void;
};

export default function LoadMoreSection({
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  hasCars,
  onFetchNextPage,
}: LoadMoreSectionProps) {
  return (
    <div style={{ marginTop: 24, textAlign: "center" }}>
      {hasNextPage && (
        <button
          type="button"
          onClick={onFetchNextPage}
          disabled={isFetchingNextPage}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #1976d2",
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            opacity: isFetchingNextPage ? 0.7 : 1,
          }}
        >
          {isFetchingNextPage ? "Завантаження..." : "Load more"}
        </button>
      )}

      {!hasNextPage && hasCars && (
        <p style={{ marginTop: 8, color: "#777" }}>
          Це всі авто за цими фільтрами.
        </p>
      )}

      {isFetching && !isFetchingNextPage && (
        <p style={{ marginTop: 8, color: "#777" }}>Оновлення даних…</p>
      )}
    </div>
  );
}
