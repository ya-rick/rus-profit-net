export function clamp(min, current, max) {
    return Math.max(min, Math.min(current, max));
}

export function mapAge(age) {
    if (age == 0) return 'без опыта';
    if (age == 1) return age + ' год'
    if (['2', '3', '4', 2, 3, 4].includes(age)) return age + ' года';
    return age + ' лет';
}
