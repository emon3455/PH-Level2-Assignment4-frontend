import { useGetBorrowSummaryQuery } from "../redux/features/borrow/borrowApiSlice";


const BorrowSummaryPage = () => {
    const { data, isLoading } = useGetBorrowSummaryQuery();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Borrow Summary</h2>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Title</th>
                        <th>ISBN</th>
                        <th>Total Borrowed</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} className="text-center border-t">
                            <td className="p-2">{item?.book?.title}</td>
                            <td>{item?.book?.isbn}</td>
                            <td>{item?.totalQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowSummaryPage;
