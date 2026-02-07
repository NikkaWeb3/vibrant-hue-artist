
# Plan: Интеграция криптокошельков (ETH, BNB)

## Обзор
Добавляем полноценное подключение криптокошельков с поддержкой MetaMask, WalletConnect, Rainbow и Phantom через библиотеки RainbowKit + wagmi.

## Что будет реализовано

### 1. Поддерживаемые сети
- **Ethereum Mainnet** (ETH)
- **BNB Smart Chain** (BNB)

### 2. Поддерживаемые кошельки
- MetaMask
- WalletConnect
- Rainbow Wallet
- Phantom (через injected connector)

## Архитектура решения

```text
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    WagmiProvider                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              QueryClientProvider                     │ │ │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │ │
│  │  │  │              RainbowKitProvider                  │ │ │ │
│  │  │  │                                                  │ │ │ │
│  │  │  │    ┌──────────────────────────────────────────┐  │ │ │ │
│  │  │  │    │           Все страницы                    │  │ │ │ │
│  │  │  │    │  - Index (PresaleCard)                   │  │ │ │ │
│  │  │  │    │  - Dashboard                              │  │ │ │ │
│  │  │  │    │  - Header                                 │  │ │ │ │
│  │  │  │    └──────────────────────────────────────────┘  │ │ │ │
│  │  │  └─────────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Шаги реализации

### Шаг 1: Установка зависимостей
- `@rainbow-me/rainbowkit` - UI для подключения кошельков
- `wagmi` - React hooks для Ethereum
- `viem` - TypeScript библиотека для работы с блокчейном

### Шаг 2: Создание конфигурации wagmi
Новый файл `src/lib/wagmi.ts`:
- Настройка сетей (Ethereum, BNB Chain)
- Конфигурация коннекторов (MetaMask, WalletConnect, Rainbow, Phantom)
- WalletConnect Project ID (потребуется получить на cloud.walletconnect.com)

### Шаг 3: Обновление App.tsx
- Импорт стилей RainbowKit
- Обертка приложения в WagmiProvider и RainbowKitProvider
- Настройка темы под дизайн сайта (темная тема с зелеными акцентами)

### Шаг 4: Создание компонента ConnectWalletButton
Новый файл `src/components/ConnectWalletButton.tsx`:
- Использование `useAccount` для получения статуса подключения
- Использование `useConnectModal` для открытия модального окна RainbowKit
- Отображение адреса кошелька в сокращенном виде (0x1234...5678)
- Кнопка отключения кошелька

### Шаг 5: Обновление PresaleCard
- Замена кнопки "Connect Wallet" на ConnectWalletButton
- При подключенном кошельке показывать кнопку "Buy Now"
- Интеграция с выбором сети (ETH/BNB)

### Шаг 6: Обновление Dashboard
- Использование `useAccount` вместо локального состояния `isConnected`
- Автоматическое определение подключения кошелька
- Отображение реального адреса в сайдбаре

### Шаг 7: Обновление Header
- Добавление кнопки подключения кошелька рядом с "Launch App"

---

## Технические детали

### Конфигурация сетей (wagmi.ts)
```typescript
// Поддерживаемые сети
chains: [mainnet, bsc]

// Коннекторы кошельков
connectors: [
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
  phantomWallet
]
```

### Кастомная тема RainbowKit
```typescript
// Темная тема с зелеными акцентами под дизайн Sequoia
const customTheme = darkTheme({
  accentColor: '#4ADE80', // primary color
  borderRadius: 'large',
  fontStack: 'system',
})
```

### Хуки wagmi для использования в компонентах
- `useAccount()` - статус подключения и адрес
- `useConnect()` - подключение кошелька
- `useDisconnect()` - отключение кошелька
- `useChainId()` - текущая сеть
- `useSwitchChain()` - переключение сети

## Требования
Для работы WalletConnect потребуется получить Project ID:
1. Зарегистрироваться на https://cloud.walletconnect.com
2. Создать проект
3. Скопировать Project ID

## Изменяемые файлы
1. `src/lib/wagmi.ts` (новый)
2. `src/components/ConnectWalletButton.tsx` (новый)
3. `src/App.tsx`
4. `src/components/PresaleCard.tsx`
5. `src/pages/Dashboard.tsx`
6. `src/components/dashboard/DashboardSidebar.tsx`
7. `src/index.css` (стили для RainbowKit модального окна)
