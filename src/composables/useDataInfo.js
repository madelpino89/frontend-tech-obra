import { ref } from 'vue';
import useUtils from '@/composables/useUtils';

const useDataInfo = () => {

    const { eurFormat, dateFormatDefault, STATUS_ORDER } = useUtils();
    const orders = ref([]);
    const products = ref([]);
    const error = ref(null);
    const loading = ref(false);

    const productsToAdd = ref([]);
    const selectedOrders = ref([]);
    const productsAddedToOrder = ref([]);
    const selectedProductsToAdd = ref([]);
    const showAddLayer = ref(false);
    const showRemoveModal = ref(false);
    const totalPriceOrder = ref(0);

    const getProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch('http://localhost:3000/products?_sort=name');
            if (!response.ok) {
                console.error('HTTP error', response.status);
                throw new Error('HTTP error', response.status);
            } else {
                products.value = await response.json();
            }
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const getOrders = async () => {
        loading.value = true;
        error.value = null;
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await fetch('http://localhost:3000/orders');
            if (!response.ok) {
                console.error('HTTP error', response.status);
                throw new Error('HTTP error', response.status);
            } else {
                orders.value = await response.json();
            }
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const removeOrders = () => {
        selectedOrders.value.forEach((order) => {
            removeOrder(order.id)
        })
        showRemoveModal.value = false;
    };
    
    const removeOrder = async (orderId) => {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
            method: 'DELETE'
        })

        try {
            if (!response.ok) {
                console.error('HTTP error', response.status)
                throw new Error('HTTP error', response.status);
            } else {
                orders.value = orders.value.filter((order) => order.id !== orderId)
                selectedOrders.value = selectedOrders.value.filter((order) => order.id !== orderId)
            }
        } catch (err) {
            error.value = err.message
        }
    };

    const postOrder = async (order) => {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })

        try {
            if (!response.ok) {
                console.error('HTTP error', response.status)
            } else {
                orders.value = [...orders.value, order]
                resetValuesForAddOrder()
                showAddLayer.value = false
            }
        } catch (err) {
            error.value = err.message
        }
    };

    const resetValuesForAddOrder = () => {
        selectedProductsToAdd.value = []
        productsAddedToOrder.value = []
        totalPriceOrder.value = 0
    };

    const formatProductsForAutocomplete = () => {
        productsToAdd.value = products.value.map((product) => {
            return {
            label: `${product.name} --- ${product.price}`,
            value: product.id
            }
        })
    };

    const calculateTotalPrice = () => {
        totalPriceOrder.value = 0
        productsAddedToOrder.value.forEach((product) => {
            if (product.quantity > 0) {
            totalPriceOrder.value += parseFloat(product.price) * product.quantity
            } else {
            totalPriceOrder.value += parseFloat(product.price)
            }
        })
    };

    const increaseQuantity = (product) => {
        product.quantity += 1
        calculateTotalPrice()
    };
    
    const decreaseQuantity = (product) => {
        if (product.quantity > 0) {
            product.quantity -= 1
        }
        calculateTotalPrice()
    };

    const getTypeStaus = (order) => {
        if (order.status === STATUS_ORDER.PENDING) {
            return 'warning'
        } else if (order.status === STATUS_ORDER.CHARGED) {
            return 'success'
        } else if (order.status === STATUS_ORDER.ANULLED) {
            return 'danger'
        }
    };

    const addNewOrder = () => {
        const newOrder = {
            id: (orders.value.length + 1).toString(),
            creationDate: dateFormatDefault(),
            totalProducts: 0,
            priceWithoutIVA: 0,
            priceIVA: 0,
            status: STATUS_ORDER.PENDING,
            products: []
        }

        productsAddedToOrder.value.forEach((product) => {
            newOrder.totalProducts += product.quantity
            newOrder.priceWithoutIVA += (parseFloat(product.price) * product.quantity) / 1.21
            newOrder.priceIVA += parseFloat(product.price) * product.quantity
            newOrder.products.push(product)
        })

        newOrder.priceIVA = eurFormat(newOrder.priceIVA)
        newOrder.priceWithoutIVA = eurFormat(newOrder.priceWithoutIVA)
        postOrder(newOrder)
    };

    const updateSelection = (newSelection) => {
        selectedOrders.value = newSelection
    };

    return {
        orders,
        products,
        error,
        loading,
        productsToAdd,
        productsAddedToOrder,
        selectedProductsToAdd,
        showAddLayer,
        totalPriceOrder,
        getProducts,
        getOrders,
        removeOrders,
        formatProductsForAutocomplete,
        calculateTotalPrice,
        increaseQuantity,
        decreaseQuantity,
        getTypeStaus,
        addNewOrder,
        updateSelection,
        selectedOrders,
        showRemoveModal
    }
}

export default useDataInfo