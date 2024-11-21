function composeEventHandlers<E>(originalHandler?: (event: E) => void, ...handlers: ((event: E) => void)[]) {
  return function handleEvent(event: E) {
    originalHandler?.(event);
    handlers?.forEach((handler) => {
      if (!(event as unknown as Event).defaultPrevented) {
        return handler?.(event);
      }
    });
  };
}

export { composeEventHandlers };
