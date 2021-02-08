(define-constant err-sender-has-insufficient-funds (err u01))
(define-constant err-amount-greater-than-1000000 (err u02))
(define-constant err-recipent-already-has-a-balance (err u03))
(define-constant err-past-recipent (err u04))

(define-map address-map { recipient: principal} { amount: uint})

(define-public (transfer (amount uint) (recipient principal))
  (begin
    (if (not (> (stx-get-balance recipient) amount))
      (if (<= amount u1000000)
        (if (is-eq (stx-get-balance recipient) u0)
          (if (map-insert address-map { recipient: recipient } { amount: amount })
            (stx-transfer? amount tx-sender recipient)
            err-past-recipent
          )
          err-recipent-already-has-a-balance
        )
        err-amount-greater-than-1000000
      )
      err-sender-has-insufficient-funds
    )
  )
)