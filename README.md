# Вёрстка Bitrix — «Упакуем хоть слона»

Классическая HTML/CSS/jQuery/Bootstrap-вёрстка главной страницы для передачи в Bitrix.

## Структура

```
верстка битрикс/
├── index.html
├── css/
│   ├── fonts.css
│   ├── main.css?ver=1
│   └── media.css?ver=1
├── js/
│   └── common.js?ver=1
├── img/
├── libs/          — bootstrap-grid, jquery, mask, slick, fancybox, fontawesome
└── fonts/
```

## Секции (14)

1. Top banner
2. Header (fixed + mobile menu)
3. Hero slider (2 слайда)
4. Segments (5)
5. Price compare
6. Catalog (6 товаров)
7. Bag selection form
8. Partners slider
9. Benefits (6)
10. Registration form
11. Delivery
12. Order steps (5)
13. FAQ + sidebar form
14. Footer

## Изображения

Все ключевые ассеты лежат в `img/`:

| Файл | Статус |
|------|--------|
| `hero-bags.png` | ✓ |
| `hero-elephant.png` | ✓ |
| `product-bag.png` | ✓ |
| `segment-mill.png` | ✓ |
| `step-card-bg.png` | ✓ (фон карточек benefits/steps) |
| `delivery-map.png` | ✓ |
| `logo.png`, `hero-meshki.svg`, `hero-wave.png` | ✓ |

Если какой-то файл отсутствует — в CSS для блока используется fallback `#EBF4FD` (см. `.benefit-card`, `.step-card`, `.item-product__image`).

## Превью локально

```bash
cd "/Users/stacievechkanova/Desktop/CURSOR/Бизнес/КЛИЕНТЫ/Упакуем хоть слона/верстка битрикс"
python3 -m http.server 8080
```

Открыть: http://localhost:8080

## Источник контента

- Astro-референс: `06_Верстка/upakuem-landing/dist/index.html`
- Данные: `06_Верстка/upakuem-landing/src/data/site.ts`

## Цвета бренда

`#061713` · `#C01700` · `#6A98C2` · `#A1C2E0` · `#FFED00` · `#EBF4FD` · `#F5F7FA` · `#529c9c`
