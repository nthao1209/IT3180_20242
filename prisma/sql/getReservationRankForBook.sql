-- @param {Int} $1:book_id The book that is on hold
-- @param {Int} $2:user_id The user id for which we want to get the rank

SELECT user_rank.queue_number FROM
(
    SELECT r.user_id,
            ROW_NUMBER() OVER (ORDER BY r.reservation_date) AS queue_number
    FROM reservations r
    WHERE book_id = ?
) as user_rank
WHERE user_rank.user_id = ?
