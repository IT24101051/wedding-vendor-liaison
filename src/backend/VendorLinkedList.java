
package com.weddingvendor.backend;

import java.util.ArrayList;
import java.util.List;

/**
 * Custom LinkedList implementation for storing wedding vendor details
 */
public class VendorLinkedList {
    private VendorNode head;
    private int size;
    
    public VendorLinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    /**
     * Add a vendor to the end of the list
     */
    public void add(Vendor vendor) {
        VendorNode newNode = new VendorNode(vendor);
        
        if (head == null) {
            head = newNode;
        } else {
            VendorNode current = head;
            while (current.getNext() != null) {
                current = current.getNext();
            }
            current.setNext(newNode);
        }
        
        size++;
    }
    
    /**
     * Get vendor at specific index
     */
    public Vendor get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        
        VendorNode current = head;
        for (int i = 0; i < index; i++) {
            current = current.getNext();
        }
        
        return current.getData();
    }
    
    /**
     * Remove vendor at specific index
     */
    public void remove(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        
        if (index == 0) {
            head = head.getNext();
        } else {
            VendorNode current = head;
            for (int i = 0; i < index - 1; i++) {
                current = current.getNext();
            }
            current.setNext(current.getNext().getNext());
        }
        
        size--;
    }
    
    /**
     * Remove vendor by id
     */
    public boolean removeById(String id) {
        if (head == null) {
            return false;
        }
        
        if (head.getData().getId().equals(id)) {
            head = head.getNext();
            size--;
            return true;
        }
        
        VendorNode current = head;
        while (current.getNext() != null) {
            if (current.getNext().getData().getId().equals(id)) {
                current.setNext(current.getNext().getNext());
                size--;
                return true;
            }
            current = current.getNext();
        }
        
        return false;
    }
    
    /**
     * Convert LinkedList to ArrayList
     */
    public List<Vendor> toList() {
        List<Vendor> list = new ArrayList<>();
        VendorNode current = head;
        
        while (current != null) {
            list.add(current.getData());
            current = current.getNext();
        }
        
        return list;
    }
    
    /**
     * Get vendor by id
     */
    public Vendor getById(String id) {
        VendorNode current = head;
        
        while (current != null) {
            if (current.getData().getId().equals(id)) {
                return current.getData();
            }
            current = current.getNext();
        }
        
        return null;
    }
    
    /**
     * Update vendor by id
     */
    public boolean updateById(String id, Vendor updatedVendor) {
        VendorNode current = head;
        
        while (current != null) {
            if (current.getData().getId().equals(id)) {
                current.setData(updatedVendor);
                return true;
            }
            current = current.getNext();
        }
        
        return false;
    }
    
    /**
     * Get size of the list
     */
    public int size() {
        return size;
    }
    
    /**
     * Check if list is empty
     */
    public boolean isEmpty() {
        return size == 0;
    }
    
    /**
     * Apply bubble sort to sort vendors by price (minPrice)
     */
    public void bubbleSortByPrice() {
        if (size <= 1) {
            return;
        }
        
        boolean swapped;
        VendorNode ptr1;
        VendorNode lptr = null;
        
        do {
            swapped = false;
            ptr1 = head;
            
            while (ptr1.getNext() != lptr) {
                if (ptr1.getData().getMinPrice() > ptr1.getNext().getData().getMinPrice()) {
                    // Swap data
                    Vendor temp = ptr1.getData();
                    ptr1.setData(ptr1.getNext().getData());
                    ptr1.getNext().setData(temp);
                    swapped = true;
                }
                ptr1 = ptr1.getNext();
            }
            lptr = ptr1;
        } while (swapped);
    }
    
    /**
     * Apply bubble sort to sort vendors by price in descending order
     */
    public void bubbleSortByPriceDesc() {
        if (size <= 1) {
            return;
        }
        
        boolean swapped;
        VendorNode ptr1;
        VendorNode lptr = null;
        
        do {
            swapped = false;
            ptr1 = head;
            
            while (ptr1.getNext() != lptr) {
                if (ptr1.getData().getMinPrice() < ptr1.getNext().getData().getMinPrice()) {
                    // Swap data
                    Vendor temp = ptr1.getData();
                    ptr1.setData(ptr1.getNext().getData());
                    ptr1.getNext().setData(temp);
                    swapped = true;
                }
                ptr1 = ptr1.getNext();
            }
            lptr = ptr1;
        } while (swapped);
    }
    
    /**
     * Apply bubble sort to sort vendors by rating
     */
    public void bubbleSortByRating() {
        if (size <= 1) {
            return;
        }
        
        boolean swapped;
        VendorNode ptr1;
        VendorNode lptr = null;
        
        do {
            swapped = false;
            ptr1 = head;
            
            while (ptr1.getNext() != lptr) {
                if (ptr1.getData().getRating() < ptr1.getNext().getData().getRating()) {
                    // Swap data
                    Vendor temp = ptr1.getData();
                    ptr1.setData(ptr1.getNext().getData());
                    ptr1.getNext().setData(temp);
                    swapped = true;
                }
                ptr1 = ptr1.getNext();
            }
            lptr = ptr1;
        } while (swapped);
    }
}
