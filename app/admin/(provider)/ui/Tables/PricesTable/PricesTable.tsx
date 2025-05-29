import React from 'react'
import styles from './PricesTable.module.scss'
import { PriceSectionFormData, PriceTableData, PriceTableColumnsData, PriceVariantOptionsEnum } from '@/app/types/data/prices.type'
import PriceTableTitleLine from '@/app/admin/(provider)/ui/Tables/PricesTable/TableLine/TitleLine/PriceTableTitleLine'
import PriceTableLine from '@/app/admin/(provider)/ui/Tables/PricesTable/TableLine/PriceTableLine'

export default function PricesTable({
    data,
    includePrices,
    includesPricesDescription,
    priceVariantOptions,
    titleFieldsId,
    className
}: {
    data: PriceSectionFormData
    includePrices: boolean
    includesPricesDescription: boolean[]
    priceVariantOptions: boolean[]
    titleFieldsId: string[]
    className?: string
}) {
    const { columnsData, columnsNumber } = adjustColumnsToData(data)

    function adjustColumnsToData(data: PriceSectionFormData): PriceTableColumnsData {
        const columnsData: PriceTableData = {
            [PriceVariantOptionsEnum.COUNT]: [],
            [PriceVariantOptionsEnum.DURATION]: [],
            [PriceVariantOptionsEnum.PRICE]: [],
            [PriceVariantOptionsEnum.TOTALPRICE]: [],
        }

        if (data.prices) {
            data.prices.forEach((price) => {
                columnsData[PriceVariantOptionsEnum.COUNT].push(price.meetingsCount)
                columnsData[PriceVariantOptionsEnum.DURATION].push(price.meetingsDuration)
                columnsData[PriceVariantOptionsEnum.PRICE].push(price.meetingPrice)
                columnsData[PriceVariantOptionsEnum.TOTALPRICE].push(price.coursePrice)
            })
            columnsData[PriceVariantOptionsEnum.COUNT] = columnsData[PriceVariantOptionsEnum.COUNT].filter(data => {
                return data !== undefined && data !== ''
            })
            columnsData[PriceVariantOptionsEnum.DURATION] = columnsData[PriceVariantOptionsEnum.DURATION].filter(data => {
                return data !== undefined && data !== ''
            })
            columnsData[PriceVariantOptionsEnum.PRICE] = columnsData[PriceVariantOptionsEnum.PRICE].filter(data => {
                return data !== undefined && data !== ''
            })
            columnsData[PriceVariantOptionsEnum.TOTALPRICE] = columnsData[PriceVariantOptionsEnum.TOTALPRICE].filter(data => {
                return data !== undefined && data !== ''
            })
            let columnsNumber = Object.values(columnsData).reduce((columnsNumber, currentColumn) => {
                if (currentColumn.length) return columnsNumber + 1
                return columnsNumber
            }, 0)

            return { columnsData, columnsNumber }
        }

        return {
            columnsData,
            columnsNumber: 0
        }
    }

    return (
        <div className={`${styles.pricesTable} ${className}`}>
            <div className={styles.titles}>
                {data.titles.map((title, i) => {
                    return (<div
                        className={styles.priceTableTitle}
                        key={titleFieldsId[i]}
                    >
                        <h3 className={styles.title}>
                            {title.text}
                        </h3>
                        <span className={styles.priceNearTitle}>
                            {title.priceNearTitle}
                        </span>
                    </div>)
                })}
                <p className={styles.optionalService}>
                    {data.optionalService}
                </p>
            </div>

            {data.prices
                && includePrices
                && <div className={styles.table}>
                    <PriceTableTitleLine
                        columnsData={columnsData}
                        columnsNumber={columnsNumber}
                        priceVariantOptions={priceVariantOptions}
                    />
                    {data.prices.map((price, i) => {
                        return <PriceTableLine
                            pricing={price}
                            includesDescription={includesPricesDescription[i]}
                            columnsData={columnsData}
                            columnsNumber={columnsNumber}
                            priceVariantOptions={priceVariantOptions}
                            key={i}
                        />
                    })}
                </div>}
        </div>
    )
}