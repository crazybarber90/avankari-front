import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import SearchItem from './SearchItem'
import { useState, useEffect } from 'react';
import { SearchListWrapper } from '../../components/SearchItemStyle'

// const userArrays = [
//     {
//         "id": "1",
//         "name": "Nikola",
//         "photo": "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/309041819_10225669109587115_1960609155906517421_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=wbtD6_yWF2cAX_65vii&_nc_ht=scontent.fbeg2-1.fna&oh=00_AfBcKyqUFWjEZMd5o_wTJNTEo9-3puvpeQYWX7Em5R8EJQ&oe=650E2FF9",
//         "facebookUrl": "facebook.com",
//         "instagramurl": "instagram.com",
//         "phoneNumber": "0562233445"
//     },
//     {
//         "id": "2",
//         "name": "Nikola",
//         "photo": "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/309041819_10225669109587115_1960609155906517421_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=wbtD6_yWF2cAX_65vii&_nc_ht=scontent.fbeg2-1.fna&oh=00_AfBcKyqUFWjEZMd5o_wTJNTEo9-3puvpeQYWX7Em5R8EJQ&oe=650E2FF9",
//         "facebookUrl": "facebook.com",
//         "instagramurl": "instagram.com",
//         "phoneNumber": "0562233445"
//     },
//     {
//         "id": "3",
//         "name": "Nikola",
//         "photo": "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/309041819_10225669109587115_1960609155906517421_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=wbtD6_yWF2cAX_65vii&_nc_ht=scontent.fbeg2-1.fna&oh=00_AfBcKyqUFWjEZMd5o_wTJNTEo9-3puvpeQYWX7Em5R8EJQ&oe=650E2FF9",
//         "facebookUrl": "facebook.com",
//         "instagramurl": "instagram.com",
//         "phoneNumber": "0562233445"
//     },
//     {
//         "id": "4",
//         "name": "Nikola",
//         "photo": "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/309041819_10225669109587115_1960609155906517421_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=wbtD6_yWF2cAX_65vii&_nc_ht=scontent.fbeg2-1.fna&oh=00_AfBcKyqUFWjEZMd5o_wTJNTEo9-3puvpeQYWX7Em5R8EJQ&oe=650E2FF9",
//         "facebookUrl": "facebook.com",
//         "instagramurl": "instagram.com",
//         "phoneNumber": "0562233445"
//     },
//     {
//         "id": "5",
//         "name": "Nikola",
//         "photo": "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/309041819_10225669109587115_1960609155906517421_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=wbtD6_yWF2cAX_65vii&_nc_ht=scontent.fbeg2-1.fna&oh=00_AfBcKyqUFWjEZMd5o_wTJNTEo9-3puvpeQYWX7Em5R8EJQ&oe=650E2FF9",
//         "facebookUrl": "facebook.com",
//         "instagramurl": "instagram.com",
//         "phoneNumber": "0562233445"
//     },
//     {
//         "id": "6",
//         "name": "Nikola",
//         "photo": "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/309041819_10225669109587115_1960609155906517421_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=wbtD6_yWF2cAX_65vii&_nc_ht=scontent.fbeg2-1.fna&oh=00_AfBcKyqUFWjEZMd5o_wTJNTEo9-3puvpeQYWX7Em5R8EJQ&oe=650E2FF9",
//         "facebookUrl": "facebook.com",
//         "instagramurl": "instagram.com",
//         "phoneNumber": "0562233445"
//     }
// ]

// OVDE userArray treba da bude pored navigation,u route da dodje kroz rutu iz Search.js iz response


// const SearchList = ({ navigation, route }) => {
//     const [userArrays, setUserArrays] = useState(route.params.responseData)
//     console.log("ARRAY", userArrays)

//     const handleItemClick = (singleUser) => {
//         navigation.navigate('SingleAvankari', { singleUser });
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             {
//                 userArrays?.map((singleUser) => {
//                     return (
//                         <TouchableOpacity
//                             key={singleUser._id}
//                             onPress={() => handleItemClick(singleUser)}
//                         >
//                             <SearchItem key={singleUser.id} singleUser={singleUser} />
//                         </TouchableOpacity>
//                     )
//                 })
//             }
//         </ScrollView>
//     )
// }

// export default SearchList

const SearchList = ({ navigation, route }) => {
    const [userArrays, setUserArrays] = useState(route.params.responseData);
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1); // Broj stranice koji želite da učitate
    const itemsPerPage = 5; // Broj stavki po stranici
    const totalPages = Math.ceil(userArrays.length / itemsPerPage);

    const handleLoadMore = () => {
        if (page < totalPages) {
            // Provera da li ima još stranica za učitavanje
            setLoadingMore(true);
            setPage(page + 1);
        }
    };

    useEffect(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const newVisibleUsers = userArrays.slice(start, end);
        setVisibleUsers((prevVisibleUsers) => [...prevVisibleUsers, ...newVisibleUsers]);
        setLoadingMore(false);
    }, [page, userArrays]);

    const handleItemClick = (singleUser) => {
        navigation.navigate('SingleAvankari', { singleUser });
    };

    return (
        <SearchListWrapper >
            <FlatList
                contentContainerStyle={styles.listContent}
                data={visibleUsers}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemClick(item)}>
                        <SearchItem key={item._id} singleUser={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1} // Postavite vrednost koja vam odgovara
            />
            {loadingMore && <ActivityIndicator size="large" color="blue" />}
        </SearchListWrapper>
    );


}

export default SearchList;


const styles = StyleSheet.create({

    listContent: {
        paddingHorizontal: 50,
    },
});