function setAlermTime(value: string) {
  const [hours, minutes, weekday] = value.split(',').map(v => parseInt(v));

  // TODO: set alerm time
}

function setRTCDate(value: string) {
  const date = new Date(value);

  DS1307.DateTime(date.getUTCFullYear(), date.getMonth(), date.getUTCDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getUTCSeconds());
}
