
# План: Сделать таймер компактным как на референсе

## Текущее состояние

Таймер отображается как 4 отдельных блока с крупным текстом:

```text
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  14  │ │  23  │ │  59  │ │  59  │
│ days │ │hours │ │ min  │ │ sec  │
└──────┘ └──────┘ └──────┘ └──────┘
```

## Новый дизайн (как на референсе)

Компактный таймер в одну строку с разделителями:

```text
┌────────────────────────────────┐
│    14d : 23h : 59m : 59s       │
└────────────────────────────────┘
```

## Технические изменения

### Файл: `src/components/PresaleCard.tsx`

Заменить секцию таймера (строки 205-215):

**Было:**
- Grid из 4 колонок с отдельными блоками
- Крупный текст (text-2xl lg:text-3xl)
- Подписи под каждым числом

**Станет:**
- Один контейнер с flexbox
- Компактный текст (text-lg или text-xl)
- Формат: `14d : 23h : 59m : 59s`
- Стилизация с градиентным/золотистым акцентом как на референсе

### Примерный код нового таймера

```tsx
{/* Countdown - Compact style */}
<div className="flex items-center justify-center gap-1 mb-6 py-3 px-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
  <span className="text-lg font-bold text-foreground">
    {timeLeft.days.toString().padStart(2, "0")}d
  </span>
  <span className="text-primary/60">:</span>
  <span className="text-lg font-bold text-foreground">
    {timeLeft.hours.toString().padStart(2, "0")}h
  </span>
  <span className="text-primary/60">:</span>
  <span className="text-lg font-bold text-foreground">
    {timeLeft.minutes.toString().padStart(2, "0")}m
  </span>
  <span className="text-primary/60">:</span>
  <span className="text-lg font-bold text-foreground">
    {timeLeft.seconds.toString().padStart(2, "0")}s
  </span>
</div>
```

## Результат

- Таймер занимает меньше места
- Выглядит более современно и premium
- Соответствует референсу с Dribbble
- Освобождает пространство для остального контента
