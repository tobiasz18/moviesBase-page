import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'created', headerName: 'Created ', width: 140 },
  { field: 'title', headerName: 'Title', width: 360 },
  {
    field: 'score',
    headerName: 'Score',
    type: 'number',
    width: 120,
  },
];

export default function DataTable({ arts }) {
  const getUserProps = () => {
    const arrOfDocs = []
    if (arts && arts.docs) {
      arts.docs.map((article) => {
        console.log(dateFormat(article.date))
        let singleArticle = {
          id: article._id,
          created: dateFormat(article.date),
          title: article.title,
          score: article.score,
        }
        arrOfDocs.push(singleArticle)
      })
      return arrOfDocs
    }
    return []
  }

  const dateFormat = (artData) => {
    let today = new Date().toISOString().slice(0, 10)

    const startDate = new Date(artData).toLocaleDateString('en-ZA');
    // const startDate  = '2021-09-16';
    const endDate = today;
    const diffInMs = new Date(endDate) - new Date(startDate)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const roundTheDate = Math.round(diffInDays)

    if (roundTheDate === 0 || roundTheDate === -1) {
      return `today`
    } else if (roundTheDate === 1) {
      return `yesterday`
    }
    return `${roundTheDate} days ago`
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {arts && arts.docs ?
        <DataGrid
          rows={getUserProps()}
          columns={columns}
          pageSize={arts.limit}
          rowsPerPageOptions={[15]}
          checkboxSelection
        /> :
        null
      }

    </div>
  );
}

