import dayjs from 'dayjs';

export const TODAY_DATE_QUERY = `&range[begin_at]=${dayjs().format('YYYY-MM-DD')}T00:00:00Z,${dayjs().format('YYYY-MM-DD')}T20:59:00Z`;
export const TOMORROW_DATE_QUERY = `&range[begin_at]=${dayjs().add(1, 'day').format('YYYY-MM-DD')}T00:00:00Z,${dayjs().add(1, 'day').format('YYYY-MM-DD')}T20:59:00Z`;
export const WEEK_DATE_QUERY = `&range[begin_at]=${dayjs().format('YYYY-MM-DD')}T00:00:00Z,${dayjs().add(7, 'day').format('YYYY-MM-DD')}T20:59:00Z`;
