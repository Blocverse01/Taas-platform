function removeArrayIndex<T>(array: T[], index: number): T[] {
    if (index < 0 || index >= array.length) {
      throw new Error('Invalid index');
    }
  
    return array.filter((_, i) => i !== index);
  }
  
  export { removeArrayIndex }