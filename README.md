# NestJS Wallet System

Wallet and coin transaction backend built with **NestJS**, **TypeORM** and **PostgreSQL**.

Users hold wallets and coins. The system records credits and debits, converts coins against discounts, and keeps a reason for every transaction.

## Features
- Wallets, coins and users with country and city data
- Credit and debit transactions for both wallets and coins
- Transaction reasons for a full audit trail
- Base repository pattern with shared read/write interfaces
- Search and relational queries
- Validation, logger interceptor and global exception handling
- CSV template handling and TypeORM migrations

## Modules
`user` · `wallet` · `walletTransaction` · `walletTransactionCredit` · `walletTransactionDebit` · `coins` · `coinTransaction` · `coinTransactionCredit` · `coinTransactionDebit` · `WalletTransactionReason` · `country` · `city`

## Tech
NestJS · TypeScript · TypeORM · PostgreSQL

## Run

```bash
npm install
# set database settings in .env
npm run typeorm -- migration:run
npm run start:dev
```
