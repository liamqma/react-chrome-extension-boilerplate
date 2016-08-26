export function update(key, value) {
    return {
        type: 'UPDATE',
        key,
        value
    }
}