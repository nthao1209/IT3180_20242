import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const pageSize = 10

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatISBN(isbn: string) {
  const cleanisbn = isbn.replace(/\D/g, '')

  if (cleanisbn.length !== 10 && cleanisbn.length !== 13) {
    return null
  }

  if (cleanisbn.length === 10) {
    return cleanisbn.replace(/(\d{1})(\d{3})(\d{1})(\d{3})(\d{1})(\d{1})/, '$1-$2-$3-$4-$5-$6');
  }

  // Format ISBN-13 with hyphens
  if (cleanisbn.length === 13) {
    return cleanisbn.replace(/(\d{3})(\d{1})(\d{1})(\d{1})(\d{5})(\d{1})(\d{1})/, '$1-$2-$3-$4-$5-$6-$7');
  }

  return 'INVALID'; // Invalid ISBN
}

export type ReturnType = {
  time: string,
  display: string
}

export function getAvatarLetter(name: string) {
  return name.split(' ')[0].charAt(0).toUpperCase()
}

export function getTimeSlots(startTime = "08:00", endTime="18:00"): ReturnType[] {
  const timeArray : ReturnType[] = []
  const parsedStartTime: Date = new Date(`2000-01-01T${startTime}:00`)
  const parsedEndTime: Date = new Date(`2000-01-01T${endTime}:00`)

  const currentTime: Date = parsedStartTime
  while (currentTime <= parsedEndTime) {
    const hours = currentTime.getHours().toString().padStart(2, "0")
    const minutes = currentTime.getMinutes().toString().padStart(2, "0")
    const ampm = currentTime.getHours() < 12 ? "AM" : "PM"
    const timeString = `${hours}:${minutes} ${ampm}`
    timeArray.push({
      time: `${hours}:${minutes}`,
      display: timeString
    })

    currentTime.setMinutes(currentTime.getMinutes() + 30)
  }

  return timeArray
}

/*
  credit: https://medium.com/@sungbinkim98
*/
export const getDateWithOffset = (date: Date) => {

  if (typeof date === 'string') {
    const datePart = (date as string).split('T')[0]
    const fd = new Date(new Date(datePart).getTime() + new Date().getTimezoneOffset() * 60000)
    return fd
  }

  const dt = new Date()
  return new Date(date.getTime() + dt.getTimezoneOffset() * 60000)
}

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {

  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })

  const formatedAmount = numberFormat.format(amount)

  return formatedAmount === '$NaN' ? '' : formatedAmount
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {

  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style:'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })

  const parts = numberFormat.formatToParts(amount)
  const hadDecimals = parts.some(part => part.type === 'decimal')

  return hadDecimals ? Math.round(amount * 100) : amount
}