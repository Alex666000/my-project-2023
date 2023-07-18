
type Mods = Record<string, boolean | string>

// Для удобного комбинирования классов особенно если они навешиваются по условию:
export function classNames(cls: string, mods: Mods, additional: string[]): string {
    return [
        // наполняем массив

        // главный класс
        cls,
        ...additional,
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className)
    ]
        // склеиванием массив
        .join(' ');
}

/*
- принимает ПЕРВЫЙ АРГУМЕНТ: cls: главный класс,

 ВТОРОЙ АРГУМЕНТ: объект с mods (модами) - как "ключ" - название класса - как
 "значение" - какой-то boolean флаг -- если true то класс добавляем иначе удаляем

 ТРЕТИЙ АРГУМЕНТ: additional - массив с дополнительными классами

- Record (обычный привычный для нас объект только с ограниченным количеством значений)
 - тип ТС: в качестве ключа строка а значения булеан или...
 */
