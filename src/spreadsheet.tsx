import 'handsontable/dist/handsontable.full.min.css'
import {registerAllModules} from 'handsontable/registry'
import * as ReactDOM from 'react-dom'
import {HotColumn, HotTable} from '@handsontable/react'
import getUidsFromId from 'roamjs-components/dom/getUidsFromId'
import {Block} from 'roam-api-wrappers/dist/data'
import {HyperFormula} from 'hyperformula'
import {useState} from 'react'
import Handsontable from 'handsontable'

registerAllModules()


export const render = (b: HTMLButtonElement): void => {
    const block = b.closest('.roam-block')
    console.log('got button, rendering', block)
    if (!block) {
        return
    }
    b.parentElement!.onmousedown = (e: MouseEvent) => e.stopPropagation()
    const {blockUid} = getUidsFromId(block.id)
    ReactDOM.render(<RoamSpreadsheet blockId={blockUid}/>, b.parentElement)
}

interface RoamSpreadsheetProps {
    blockId: string
}

function getBlockData(blockId: string) {
    const block = Block.fromUid(blockId)
    if (!block) return []

    const toTableValue = (c: Block) => {
        const fields = c.children.map(c => [c.text, c.children[0].text])
        return Object.fromEntries([['object_name', c.text], ...fields])
    }

    return block.children.map(toTableValue)
}

export type RendererProps = {
    TD: HTMLTableCellElement;
    value: any;
    cellProperties: Handsontable.CellProperties;
};
function BlockCellRenderer(props: RendererProps) {
    // console.log('rendering', props)
    return <>
      {props.value}
        {/*prop: {props.prop}*/}
    </>
}

// this only works with raw html
// Handsontable.renderers.registerRenderer('text', BlockCellRenderer);

const RoamSpreadsheet = ({blockId}: RoamSpreadsheetProps) => {
    const [data, setData] = useState(getBlockData(blockId))
    /**
     * todo
     * - watch for changes and update data
     *
     */
    console.log({data})
    return <HotTable
        data={data}
        rowHeaders={true}
        colHeaders={true}
        filters={true}
        dropdownMenu={true}
        contextMenu={true}
        multiColumnSorting={true}
        allowInsertColumn={true}
        formulas={{
            engine: HyperFormula,
        }}
        height="auto"
        width="auto"
        afterChange={(change, source) => {
            console.log(change, source)
            if (source === 'loadData') {
                return //don't save this change
            }

            change?.forEach(([row, prop, oldValue, newValue]) => {
            })
        }}
        licenseKey="non-commercial-and-evaluation">
        {/*<HotColumn data={"object_name"}>*/}
        {/*    <BlockCellRenderer hot-renderer/>*/}
        {/*</HotColumn>*/}
        {/*<HotColumn data={1}>*/}
        {/*    <BlockCellRenderer hot-renderer/>*/}
        {/*</HotColumn>*/}
        {/*<HotColumn data={2}>*/}
        {/*    <BlockCellRenderer hot-renderer/>*/}
        {/*</HotColumn>*/}
        {/*<HotColumn data={3}>*/}
        {/*    <BlockCellRenderer hot-renderer/>*/}
        {/*</HotColumn>*/}
    </HotTable>
}
